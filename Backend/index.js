import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";
import bcrypt, { hashSync } from "bcrypt";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import passport from "passport";
import multer from "multer";
import cookieParser from "cookie-parser";
import User from "./models/User.js";

dotenv.config();

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(cookieParser());

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
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
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
      username: userDoc.username,
      isOwner: userDoc.isOwner,
    };
    const token = jwt.sign(
      {
        userEmail: userDoc.userEmail,
      },
      secretKey
    );
    console.log(token)
    res.cookie("jwt", token, {
      secure:true,
      maxAge: 24 * 60 * 60 * 1000,
    }).status(201).json({ ResUserDoc, message: "User registered successfully" });



  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    const hashedPassword =
      "$2b$11$Z6PDnL8OVhyMRX/r.ixicunhcUDTP0csBez2SzCyEB9Ba1cbbgON2";
    const passwordVerified = await verifyPassword(password, hashedPassword);
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
