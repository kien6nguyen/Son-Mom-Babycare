import multer from 'multer';

// Cấu hình Multer - lưu file tạm trong memory
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Cho phép ảnh và video
  const allowedTypes = [
    'image/jpeg', 'image/png', 'image/webp', 'image/gif',
    'video/mp4', 'video/quicktime', 'video/x-msvideo'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Định dạng file không được hỗ trợ. Chỉ chấp nhận ảnh (JPEG, PNG, WebP, GIF) và video (MP4, MOV, AVI).'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // Giới hạn 50MB
  },
});
