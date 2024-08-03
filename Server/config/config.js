import dotenv from 'dotenv';

dotenv.config();

const config = {
  database: {
    url: process.env.MONGO_URL
  },
  server: {
    port: process.env.PORT || 8000
  },
  secrets: {
    jwtSecret: process.env.SECRET_KEY,
    razorpay: {
      id: process.env.RAZORPAY_ID,
      secret: process.env.RAZORPAY_SECRET
    }
  }
};

export default config;
