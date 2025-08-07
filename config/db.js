// 📦 db.js
import pkg from 'pg';
const { Pool } = pkg;

const connectionString = 'postgresql://easyshop:XklluC8mUqgqL1si7iglSqohaaleAmr2@dpg-d2adtare5dus73co9s3g-a.oregon-postgres.render.com:5432/easyshop_kbog';

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // لازم باش يخدم مع render
  },
});

// 🧪 اختبار الاتصال
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Connection error:', err.stack);
  }
  console.log('✅ Connected successfully to PostgreSQL');
  release();
});

export default pool;
