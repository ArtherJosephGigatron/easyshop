// 📦 server/routes/authRoutes.js
import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// 🔐 تسجيل مستخدم جديد
router.post('/register', register);

// 🔑 تسجيل دخول
router.post('/login', login);

export default router;
