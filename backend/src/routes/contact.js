import { Router } from 'express';
import db from '../lib/db.js';
import requireAdmin from '../middleware/requireAdmin.js';
import nodemailer from 'nodemailer';

const router = Router();

// Cấu hình email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Gửi form liên hệ tư vấn
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, service, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền họ tên và số điện thoại',
      });
    }

    const { data } = await db.create('contacts', {
      name,
      phone,
      email: email || null,
      service: service || null,
      message: message || null,
      status: 'new',
    });

    // Gửi email thông báo (không block response)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = createTransporter();
        await transporter.sendMail({
          from: `"SÕN Babycare" <${process.env.SMTP_USER}>`,
          to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
          subject: `[SÕN] Yêu cầu tư vấn mới từ ${name}`,
          html: `
            <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #FCE4EC, #F8BBD0); padding: 20px; border-radius: 12px; text-align: center;">
                <h1 style="color: #D81B60; margin: 0;">🌸 SÕN - Mom & Babycare</h1>
                <p style="color: #666; margin-top: 8px;">Yêu cầu tư vấn mới</p>
              </div>
              <div style="padding: 24px; background: #fff; border-radius: 12px; margin-top: 16px; border: 1px solid #F8BBD0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #999; width: 140px;">Họ và tên:</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
                  <tr><td style="padding: 8px 0; color: #999;">Số điện thoại:</td><td style="padding: 8px 0; font-weight: 600;">${phone}</td></tr>
                  ${email ? `<tr><td style="padding: 8px 0; color: #999;">Email:</td><td style="padding: 8px 0;">${email}</td></tr>` : ''}
                  ${service ? `<tr><td style="padding: 8px 0; color: #999;">Dịch vụ:</td><td style="padding: 8px 0;">${service}</td></tr>` : ''}
                  ${message ? `<tr><td style="padding: 8px 0; color: #999;">Lời nhắn:</td><td style="padding: 8px 0;">${message}</td></tr>` : ''}
                </table>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error('Lỗi gửi email thông báo:', emailErr.message);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Gửi yêu cầu tư vấn thành công!',
      data,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Lấy danh sách liên hệ (admin)
router.get('/', requireAdmin, async (req, res) => {
  try {
    const { data } = await db.findAll('contacts', {
      orderBy: 'created_at',
      orderDir: 'DESC',
    });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Cập nhật trạng thái liên hệ
router.patch('/:id/status', requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const { data } = await db.update('contacts', req.params.id, { status });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
