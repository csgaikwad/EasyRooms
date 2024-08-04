import dotenv from 'dotenv';
dotenv.config();


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import config from "./config/config.js";
import connectDB from "./config/db.js";
import cloudinary from "./config/cloudinary.js";
import razorpay from "./config/razorpay.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";


// Connect to MongoDB
connectDB();

const app = express();

// Middleware

app.use(
  cors({
    origin: ["https://easyrooms-ssg.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// Routes

app.use("/", authRoutes);
app.use("/booking", bookingRoutes);
app.use("/properties", propertyRoutes);
app.use("/payment", paymentRoutes);


// Start the server
app.listen(config.server.port, () => {
  console.log(`Server is listening on port ${config.server.port}`);
});
