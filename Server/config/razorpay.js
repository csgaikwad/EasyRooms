import Razorpay from 'razorpay';
import config from './config.js';

const instance = new Razorpay({
  key_id: config.secrets.razorpay.id,
  key_secret: config.secrets.razorpay.secret,
});

export default instance;
