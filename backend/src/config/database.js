import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'son_babycare',
  user: process.env.DB_USER || 'son_admin',
  password: process.env.DB_PASSWORD || 'son_secret_2026',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('connect', () => {
  console.log('📦 Kết nối PostgreSQL local thành công');
});

pool.on('error', (err) => {
  console.error('❌ Lỗi kết nối PostgreSQL:', err.message);
});

export default pool;
