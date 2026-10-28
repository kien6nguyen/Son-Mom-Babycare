import { Router } from 'express';
import db from '../lib/db.js';
import requireAdmin from '../middleware/requireAdmin.js';

const router = Router();

// Lấy tất cả dịch vụ
router.get('/', async (req, res) => {
  try {
    const { data } = await db.findAll('services', {
      orderBy: 'sort_order',
      orderDir: 'ASC',
    });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Lấy dịch vụ theo ID
router.get('/:id', async (req, res) => {
  try {
    const { data } = await db.findById('services', req.params.id);
    if (!data) return res.status(404).json({ success: false, message: 'Không tìm thấy dịch vụ' });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Tạo dịch vụ mới
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { title, description, icon, image, sort_order, is_active } = req.body;
    const { data } = await db.create('services', { title, description, icon, image, sort_order, is_active });
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Cập nhật dịch vụ
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { title, description, icon, image, sort_order, is_active } = req.body;
    const { data } = await db.update('services', req.params.id, { title, description, icon, image, sort_order, is_active });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Xóa dịch vụ
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    await db.remove('services', req.params.id);
    res.json({ success: true, message: 'Đã xóa dịch vụ thành công' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
