import express from 'express';
import { approveProduct, rejectProduct } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// ✅ قبول منتج
router.put('/product/approve/:id', protect, isAdmin, approveProduct);

// ❌ رفض منتج
router.delete('/product/reject/:id', protect, isAdmin, rejectProduct);

export default router;
