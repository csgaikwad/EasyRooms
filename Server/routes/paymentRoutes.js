import express from 'express';
import { processPayment, verifyPayment } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/process', processPayment);
router.post('/verify', verifyPayment);

export default router;
