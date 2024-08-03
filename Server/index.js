import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config  from './config/config.js';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

// import { errorHandler } from './middleware/errorHandler.js'; // Ensure this exists

dotenv.config();

// Connect to MongoDB
mongoose.connect(config.database.url,)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

const app = express();

// Middleware
app.use(cors({
  origin: ["https://easyrooms-ssg.vercel.app", "http://localhost:5173"],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));


// Routes
app.use('/', authRoutes);
app.use('/booking', bookingRoutes);
app.use('/properties', propertyRoutes);
app.use('/payment', paymentRoutes);

// Error Handling Middleware
// app.use(errorHandler);  // Ensure you have this middleware defined

// Start the server
app.listen(config.server.port, () => {
  console.log(`Server is listening on port ${config.server.port}`);
});
