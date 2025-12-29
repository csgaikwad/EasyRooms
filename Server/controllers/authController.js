import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "../config/config.js";

const saltRounds = 12;

// REGISTER
export async function registerUser(req, res) {
  const { username, userEmail, password, isOwner = false } = req.body;

  try {
    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userDoc = await User.create({
      username,
      userEmail,
      password: hashedPassword,
      isOwner,
    });

    const token = jwt.sign(
      { userId: userDoc._id, userEmail: userDoc.userEmail },
      config.secrets.jwtSecret,
      { expiresIn: "1d" } // 24 hours
    );

    res.status(201).json({
      token,
      user: {
        id: userDoc._id,
        username: userDoc.username,
        userEmail: userDoc.userEmail,
        isOwner: userDoc.isOwner,
      },
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// LOGIN
export async function loginUser(req, res) {
  const { userEmail, password } = req.body;

  try {
    const user = await User.findOne({ userEmail });
    if (!user) return res.status(404).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { userId: user._id, userEmail: user.userEmail },
      config.secrets.jwtSecret,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        userEmail: user.userEmail,
        isOwner: user.isOwner,
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// LOGOUT (client-side only now – just remove token)
export async function logoutUser(req, res) {
  res.json({ message: "Logged out successfully" });
}

// GET CURRENT USER (protected route)
export async function getUserInfo(req, res) {
  try {
    // Token comes from Authorization header now
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.secrets.jwtSecret);

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      isAuthenticated: true,
      id: user._id,
      username: user.username,
      userEmail: user.userEmail,
      isOwner: user.isOwner,
    });
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
}