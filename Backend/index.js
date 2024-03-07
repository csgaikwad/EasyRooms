import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import compression from "compression";
import multer from "multer";
import cookieParser from "cookie-parser";
import User from "./models/User.js";

dotenv.config();

const app = express();
const port = 8000;

app.use(compression());
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const saltRounds = parseInt(process.env.SALTING_ROUNDS);
const secretKey = process.env.SECRET_KEY;





async function hashPassword(password) {
  try {
    if (!password) {
      throw new Error("Password is empty or undefined");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    // console.error('Error hashing password:', error);
    throw new Error("Error hashing password");
  }
}

async function verifyPassword(password, hashedPassword) {
  try {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  } catch (error) {
    throw new Error("Error verifying password");
  }
}

















app.get("/", (req, res) => {
  res.send("Hello");
});



app.get("/me", async (req, res) => {
 try {
   const token = req.cookies.jwt;
   const mail = jwt.verify(token, secretKey);
   const foundUser = await User.findOne({ userEmail: mail.userEmail });
   const ResUserDoc = {
     userEmail: foundUser.userEmail,
     username: foundUser.username,
     isOwner: foundUser.isOwner,
   };
   res.json(ResUserDoc);
 } catch (error) {
  res.json({message:"Cookie Not found"});
}
});




app.get("/logout", async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    }).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error.message);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});





app.post("/register", async (req, res) => {
  const { username, userEmail, password, isOwner } = req.body;
  console.log(req.body);
  try {
    const hashedPassword = await hashPassword(password);
    const userDoc = await User.create({
      userEmail,
      password: hashedPassword,
      username,
      isOwner,
    });
    const ResUserDoc = {
      userEmail: userDoc.userEmail,
      username: userDoc.username,
      isOwner: userDoc.isOwner,
    };
    const token = jwt.sign(
      {
        userEmail: userDoc.userEmail,
      },
      secretKey
    );
    console.log(token);
    res
      .cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ ResUserDoc, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});











app.post("/login", async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const user = await User.findOne({ userEmail });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordVerified = await verifyPassword(password, user.password);
    if (!passwordVerified) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const userDoc = {
      userEmail: user.userEmail,
      username: user.username,
      isOwner: user.isOwner,
    };

    const token = jwt.sign({ userEmail }, secretKey);
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      }).json({ userDoc, message: "User logged in successfully" });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
