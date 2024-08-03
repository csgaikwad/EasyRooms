import express from 'express';
import { registerUser, loginUser, getUserInfo, logoutUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/', () => console.log("Hello and welcome port 8000"));
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', getUserInfo);
router.get('/logout', logoutUser);

export default router;
