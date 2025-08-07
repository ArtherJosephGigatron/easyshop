import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// 🛣️ تسجيل الدخول والتسجيل
app.use('/api/auth', authRoutes);

// 🛍️ المنتجات
app.use('/api/products', productRoutes);

// 🧑‍💼 لوحة تحكم الأدمن
app.use('/api/admin', adminRoutes);

export default app;
