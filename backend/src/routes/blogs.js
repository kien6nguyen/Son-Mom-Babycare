import { Router } from 'express';
import db from '../lib/db.js';
import requireAdmin from '../middleware/requireAdmin.js';

const router = Router();

const requireAdminForDrafts = (req, res, next) => {
  if (req.query.includeUnpublished !== 'true') return next();
  return requireAdmin(req, res, next);
};

// Lấy tất cả bài viết (có phân trang)
router.get('/', requireAdminForDrafts, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const where = req.query.includeUnpublished === 'true' ? {} : { published: true };
    const { data, count } = await db.findAll('blogs', {
      where,
      orderBy: 'created_at',
      orderDir: 'DESC',
      limit,
      offset,
      count: true,
    });

    res.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Lấy bài viết theo slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const { data } = await db.findOne('blogs', { slug: req.params.slug, published: true });
    if (!data) return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Lấy bài viết theo ID
router.get('/:id', async (req, res) => {
  try {
    const { data } = await db.findById('blogs', req.params.id);
    if (!data) return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Tạo bài viết mới
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { title, slug, excerpt, content, category, author, image, read_time, published } = req.body;
    const { data } = await db.create('blogs', {
      title, slug, excerpt, content, category, author, image, read_time,
      published: published ?? false,
    });
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Cập nhật bài viết
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { title, slug, excerpt, content, category, author, image, read_time, published } = req.body;
    const { data } = await db.update('blogs', req.params.id, {
      title, slug, excerpt, content, category, author, image, read_time, published,
    });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Xóa bài viết
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    await db.remove('blogs', req.params.id);
    res.json({ success: true, message: 'Đã xóa bài viết thành công' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
