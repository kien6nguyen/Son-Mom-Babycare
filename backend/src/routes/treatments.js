import { Router } from 'express';
import db from '../lib/db.js';
import requireAdmin from '../middleware/requireAdmin.js';

const router = Router();

// Lấy tất cả liệu trình
router.get('/', async (req, res) => {
  try {
    const { data } = await db.findAll('treatments', {
      orderBy: 'created_at',
      orderDir: 'DESC',
    });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Lấy liệu trình theo ID
router.get('/:id', async (req, res) => {
  try {
    const { data } = await db.findById('treatments', req.params.id);
    if (!data) return res.status(404).json({ success: false, message: 'Không tìm thấy liệu trình' });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Tạo liệu trình mới
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { title, description, duration, sessions, highlights, image, popular, is_active } = req.body;
    const { data } = await db.create('treatments', { title, description, duration, sessions, highlights, image, popular, is_active });
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Cập nhật liệu trình
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { title, description, duration, sessions, highlights, image, popular, is_active } = req.body;
    const { data } = await db.update('treatments', req.params.id, { title, description, duration, sessions, highlights, image, popular, is_active });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Xóa liệu trình
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    await db.remove('treatments', req.params.id);
    res.json({ success: true, message: 'Đã xóa liệu trình thành công' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
