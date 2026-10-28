import { Router } from 'express';
import db from '../lib/db.js';
import requireAdmin from '../middleware/requireAdmin.js';

const router = Router();

// Lấy tất cả gói giá
router.get('/', async (req, res) => {
  try {
    const { data } = await db.findAll('pricing', {
      orderBy: 'price',
      orderDir: 'ASC',
    });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Lấy gói giá theo ID
router.get('/:id', async (req, res) => {
  try {
    const { data } = await db.findById('pricing', req.params.id);
    if (!data) return res.status(404).json({ success: false, message: 'Không tìm thấy gói giá' });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Tạo gói giá mới
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { name, price, unit, description, features, not_included, highlight, color, is_active } = req.body;
    const { data } = await db.create('pricing', { name, price, unit, description, features, not_included, highlight, color, is_active });
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Cập nhật gói giá
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { name, price, unit, description, features, not_included, highlight, color, is_active } = req.body;
    const { data } = await db.update('pricing', req.params.id, { name, price, unit, description, features, not_included, highlight, color, is_active });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Xóa gói giá
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    await db.remove('pricing', req.params.id);
    res.json({ success: true, message: 'Đã xóa gói giá thành công' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
