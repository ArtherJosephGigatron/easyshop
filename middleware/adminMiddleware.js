// 📦 server/middleware/adminMiddleware.js

// ✅ التحقق إذا كان المستخدم أدمن
export const isAdmin = (req, res, next) => {
  if (req.isAdmin) {
    next(); // 👍 يسمحلو يدخل
  } else {
    res.status(403).json({ message: '⛔ الوصول ممنوع، ليس لديك صلاحية الأدمن' });
  }
};
