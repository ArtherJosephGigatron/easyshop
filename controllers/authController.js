// 📦 server/controllers/authController.js 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// 🔐 تسجيل مستخدم جديد
export const register = async (req, res) => {
  const { name, email, password, phone_number, mahal } = req.body;

  try {
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: '📛 الإيميل راه مستعمل' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users (name, email, password, phone_number, mahal)
       VALUES ($1, $2, $3, $4, $5)`,
      [name, email, hashedPassword, phone_number || null, mahal || null]
    );

    res.status(201).json({ message: '✅ تسجيل ناجح' });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ message: '🚨 خطأ في السيرفر' });
  }
};

// 🔑 تسجيل الدخول
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: '❌ المستخدم غير موجود' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: '🔐 كلمة المرور غالطة' });
    }

    const token = jwt.sign({ userId: user.id, isAdmin: user.isadmin }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isadmin,
        phone_number: user.phone_number,
        mahal: user.mahal
      }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: '🚨 خطأ في السيرفر' });
  }
};
