import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RazorpayId,
  key_secret: process.env.RazorpaySecret,
});

export default instance;
