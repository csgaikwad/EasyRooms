import Razorpay from 'razorpay';
import crypto from 'crypto';
import instance  from '../config/razorpay.js';
import config from '../config/config.js';




export async function processPayment(req, res) {
  const { totalAmount : amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({
      error: "Invalid amount. Amount must be a positive number."
    });
  }
  try {
    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    const order = await instance.orders.create(options);
    res.status(200).json({ order });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
}

export async function verifyPayment(req, res) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.response;
  const generatedSignature = crypto.createHmac('sha256', config.secrets.razorpay.secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generatedSignature === razorpay_signature) {
    res.status(200).json({ message: "Payment verified successfully" });
  } else {
    res.status(400).json({ error: "Payment verification failed" });
  }
}
