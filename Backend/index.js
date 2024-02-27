import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
import bcrypt from 'bcrypt';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import multer from 'multer';
import cookieParser from 'cookie-parser';

dotenv.config();


const app= express();
const port=8000;

app.use(bodyParser.json());
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(cookieParser());






app.get("/",(req,res)=>{
    res.send("Hello");
}
);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });