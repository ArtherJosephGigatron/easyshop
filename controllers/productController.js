// 📦 server/controllers/productController.js
import db from '../config/db.js';

// ➕ اقتراح منتج جديد (يحتاج موافقة من الأدمن)
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, title, stock } = req.body;
    const userId = req.userId;

    const status = 'pending';
    const isApproved = true;
    const createdAt = new Date();

    // ✅ الاستعلام الآن في سطر واحد وواضح تمامًا، مما يمنع الأخطاء النحوية غير المرئية
    const query = 'INSERT INTO products (name,description,price,image,category,status,is_approved,title,stock,createdby,created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)';
    
    const values = [
      name,
      description,
      price,
      image,
      category,
      status,
      isApproved,
      title,
      stock,
      userId,
      createdAt,
    ];

    await db.query(query, values);

    res.status(201).json({
      message: '✅ تم إرسال المنتج للمراجعة من طرف الإدارة',
    });
  } catch (err) {
    console.error('⛔ خطأ في اقتراح المنتج:', err);
    res.status(500).json({
      message: '🚨 وقع مشكل في السيرفر، جرب مرة أخرى.',
    });
  }
};

// ✅ جلب المنتجات الموافق عليها فقط
export const getApprovedProducts = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM products WHERE is_approved = $1',[true]);

    const products = result.rows.map((product) => ({
      ...product,
      price_formatted: `${product.price} DZD`,
    }));

    res.json(products);
  } catch (err) {
    console.error('⛔ خطأ في جلب المنتجات:', err);
    res.status(500).json({ message: '🚨 وقع مشكل في السيرفر' });
  }
};