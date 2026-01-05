import express from 'express';
import { getUserInfo, updateProfile } from '../controllers/userController.js';

const router = express.Router();

router.get('/me', getUserInfo);
router.patch('/updateProfile', updateProfile);

export default router;
