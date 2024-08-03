import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "../config/config.js";

const saltRounds = 12;

export async function registerUser(req, res) {
  const { username, userEmail, password, isOwner } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userDoc = await User.create({
      userEmail,
      password: hashedPassword,
      username,
      isOwner,
    });
    const token = jwt.sign(
      { userId: userDoc._id, userEmail: userDoc.userEmail },
      config.secrets.jwtSecret
    );
    res
      .cookie("jwt", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ ResUserDoc : userDoc, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ error: "An internal server error occurred" });
  }
}

export async function loginUser(req, res) {
  const { userEmail, password } = req.body;
  try {
    const user = await User.findOne({ userEmail });
    if (!user) return res.status(404).json({ error: "User not found" });
    const passwordVerified = await bcrypt.compare(password, user.password);
    if (!passwordVerified)
      return res.status(401).json({ error: "Incorrect password" });
    const token = jwt.sign(
      { userId: user._id, userEmail: user.userEmail },
      config.secrets.jwtSecret
    );
    res
      .cookie("jwt", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        userDoc: {
          id: user._id,
          userEmail: user.userEmail,
          username: user.username,
          isOwner: user.isOwner,
        },
        message: "User logged in successfully",
      });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(500).json({ error: "An internal server error occurred" });
  }
}

export async function logoutUser(req, res) {
  try {
    res
      .cookie("jwt", "", {
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error.message);
    res.status(500).json({ error: "An internal server error occurred" });
  }
}

export async function getUserInfo(req, res) {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, config.secrets.jwtSecret);
    const userId = decoded.userId;
    const foundUser = await User.findById(userId);
    if (!foundUser) return res.status(404).json({ message: "User not found" });
    res.json({
      isAuthenticated: true,
      id: foundUser._id,
      userEmail: foundUser.userEmail,
      username: foundUser.username,
      isOwner: foundUser.isOwner,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
}
