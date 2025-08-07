// 📦 server/routes/productRoutes.js
import express from 'express';
import { addProduct, getApprovedProducts } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// ➕ اقتراح منتج (المستخدم لازم يكون مسجل دخول)
router.post('/add', protect, addProduct);

// 🛍️ جلب المنتجات الموافق عليها
router.get('/all', getApprovedProducts);

export default router;
