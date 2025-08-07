import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ رابط الاتصال مع HOST صحيح
const connectionString = 'postgresql://easyshop:XklluC8mUqgqL1si7iglSqohaaleAmr2@dpg-d2adtare5dus73co9s3g-a.oregon-postgres.render.com:5432/easyshop_kbog';

// ✅ قراءة ملف SQL
const sql = fs.readFileSync(path.join(__dirname, 'soukdz.sql'), 'utf8');

// ✅ تفعيل SSL
const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

async function executeSQL() {
  try {
    await client.connect();
    console.log('✅ تم الاتصال بقاعدة البيانات');

    await client.query(sql);
    console.log('✅ تم تنفيذ ملف SQL بنجاح');
  } catch (err) {
    console.error('❌ خطأ في تنفيذ SQL:', err);
  } finally {
    await client.end();
    console.log('🔌 اتصال مغلق');
  }
}

executeSQL();
