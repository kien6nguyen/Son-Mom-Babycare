import { timingSafeEqual } from 'node:crypto';

const requireAdmin = (req, res, next) => {
  const configuredKey = process.env.ADMIN_API_KEY;
  if (!configuredKey) {
    return res.status(503).json({
      success: false,
      message: 'Chưa cấu hình ADMIN_API_KEY cho backend.',
    });
  }

  const providedKey = req.get('x-admin-key') || '';
  const expected = Buffer.from(configuredKey);
  const provided = Buffer.from(providedKey);
  const isValid = expected.length === provided.length && timingSafeEqual(expected, provided);

  if (!isValid) {
    return res.status(401).json({ success: false, message: 'Mã quản trị không hợp lệ.' });
  }

  next();
};

export default requireAdmin;
