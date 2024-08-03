import Razorpay from 'razorpay';
import crypto from 'crypto';
import config  from '../config/config.js';

const razorpayInstance = new Razorpay({
  key_id: config.secrets.razorpay.id,
  key_secret: config.secrets.razorpay.secret
});

export async function processPayment(req, res) {
  const { amount } = req.body;
  try {
    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({ order });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
}

export async function verifyPayment(req, res) {
  const { paymentId, orderId, signature } = req.body;
  const generatedSignature = crypto.createHmac('sha256', config.secrets.razorpay.secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  if (generatedSignature === signature) {
    res.status(200).json({ message: "Payment verified successfully" });
  } else {
    res.status(400).json({ error: "Payment verification failed" });
  }
}
