// 📦 server/controllers/adminController.js
import db from '../config/db.js';

// ✅ قبول منتج
export const approveProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await db.query(
      'UPDATE products SET is_approved = true WHERE id = $1 AND is_approved = false RETURNING *',
      [productId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: '🚫 المنتج غير موجود أو تم الموافقة عليه مسبقًا' });
    }

    res.json({ message: '✅ المنتج تم قبوله', product: result.rows[0] });
  } catch (err) {
    console.error('Approve Product Error:', err);
    res.status(500).json({ message: '🚨 خطأ أثناء الموافقة' });
  }
};

// ❌ رفض منتج
export const rejectProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await db.query(
      'DELETE FROM products WHERE id = $1 AND is_approved = false RETURNING *',
      [productId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: '🚫 المنتج غير موجود أو تم الموافقة عليه بالفعل' });
    }

    res.json({ message: '❌ المنتج المرفوض تم حذفه', product: result.rows[0] });
  } catch (err) {
    console.error('Reject Product Error:', err);
    res.status(500).json({ message: '🚨 خطأ أثناء الرفض' });
  }
};

// ➕ إضافة منتج جديد
export const addProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    image,
    category,
    status,
    title,
    stock,
    createdby
  } = req.body;

  // تحقق من الأعمدة المطلوبة
  if (!name || !description || !price || !category || !status || !title || !stock || !createdby) {
    return res.status(400).json({ message: '🚫 كل الحقول مطلوبة ما عدا created_at و is_approved' });
  }

  try {
    const result = await db.query(
      `INSERT INTO products 
      (name, description, price, image, category, status, created_at, is_approved, title, stock, createdby)
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), false, $7, $8, $9)
      RETURNING *`,
      [name, description, price, image, category, status, title, stock, createdby]
    );

    res.status(201).json({ message: '✅ المنتج تمت إضافته بنجاح', product: result.rows[0] });
  } catch (err) {
    console.error('Add Product Error:', err);
    res.status(500).json({ message: '🚨 خطأ أثناء إضافة المنتج' });
  }
};
