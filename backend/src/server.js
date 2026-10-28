import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import servicesRoutes from './routes/services.js';
import treatmentsRoutes from './routes/treatments.js';
import pricingRoutes from './routes/pricing.js';
import blogsRoutes from './routes/blogs.js';
import contactRoutes from './routes/contact.js';
import uploadRoutes from './routes/upload.js';
import requireAdmin from './middleware/requireAdmin.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ===== API Routes =====
app.use('/api/services', servicesRoutes);
app.use('/api/treatments', treatmentsRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/admin/verify', requireAdmin, (req, res) => {
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'SÕN - Mom & Babycare API',
    db_mode: process.env.DB_MODE || 'local',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Không tìm thấy route: ${req.method} ${req.originalUrl}`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Đã xảy ra lỗi server'
      : err.message,
  });
});

// ===== Start Server =====
const dbMode = process.env.DB_MODE || 'local';
app.listen(PORT, () => {
  console.log(`\n🌸 SÕN - Mom & Babycare API Server`);
  console.log(`📡 Server đang chạy tại: http://localhost:${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📦 Database: ${dbMode === 'local' ? 'PostgreSQL Docker (local)' : 'Supabase (cloud)'}`);
  console.log(`📋 Môi trường: ${process.env.NODE_ENV || 'development'}\n`);
});
