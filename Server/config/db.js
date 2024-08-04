import mongoose from 'mongoose';
import config from './config.js';

const connectDB = async () => {
  try {
    await mongoose.connect(config.database.url);
    console.log('Database connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
