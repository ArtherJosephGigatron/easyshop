// 📦 server/middleware/authMiddleware.js

// 🛡️ السماح بالوصول بدون تحقق
export const protect = (req, res, next) => {
  next();
};
