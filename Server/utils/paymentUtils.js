import crypto from 'crypto';

const razorpaySecret = process.env.RazorpaySecret;

// Verify Razorpay payment signature
export function verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature) {
  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto.createHmac("sha256", razorpaySecret).update(sign).digest('hex');
  return expectedSignature === razorpay_signature;
}
