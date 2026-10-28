# 🌸 SÕN - Mom & Babycare

Trang web dịch vụ chăm sóc mẹ bầu và em bé sơ sinh.

---

## 🚀 Hướng Dẫn Chạy Nhanh (Local với Docker)

### Bước 1: Khởi động Database (Docker)
1. Mở ứng dụng **Docker Desktop** trên máy tính
2. Chạy lệnh (hoặc double-click file `start-local-db.bat`):
   ```bash
   docker compose up -d
   ```
   > Container sẽ tự động tạo bảng và nạp sẵn dữ liệu mẫu tiếng Việt.

### Bước 2: Chạy Backend (Terminal 1)
```bash
cd backend
npm run dev
# → Chạy tại http://localhost:5000 (sử dụng Docker PostgreSQL local)
```

### Bước 3: Chạy Frontend (Terminal 2)
```bash
cd frontend
npm run dev
# → Chạy tại http://localhost:5173
```

---

## 🔄 Chuyển Đổi Sang Supabase Thật (Production)

Không cần sửa code! Chỉ cần đổi trong `backend/.env`:

```ini
# Đổi từ "local" sang "supabase"
DB_MODE=supabase

# Điền link và key Supabase thật của bạn
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Chạy schema `backend/supabase-schema.sql` trên Supabase SQL Editor.

---

## 📋 Cấu Trúc Dự Án

```
Son/
├── docker-compose.yml             # Cấu hình Docker PostgreSQL 16
├── start-local-db.bat             # Script 1-click khởi động DB
├── DOCKER-GUIDE.md                # Hướng dẫn chi tiết Docker
│
├── frontend/                      # React (Vite)
│   ├── src/
│   │   ├── components/            # Header, Hero, Services, Packages (Gói Dịch Vụ),
│   │   │                          # WhyChooseUs, Blog, Contact, Footer
│   │   ├── hooks/useApi.js        # Hook gọi API + fallback data
│   │   ├── config/supabase.js     # Supabase client
│   │   ├── data/sampleData.js     # Dữ liệu mẫu tiếng Việt
│   │   └── index.css              # Pink pastel theme
│   └── .env.example
│
├── backend/                       # Node.js (Express)
│   ├── src/
│   │   ├── config/                # database.js, supabase.js, cloudinary.js
│   │   ├── lib/db.js              # Database Abstraction Layer (Local/Supabase)
│   │   ├── middleware/upload.js   # Multer middleware
│   │   ├── routes/                # services, treatments, pricing, blogs, contact, upload
│   │   └── server.js              # Express entry point
│   ├── docker-entrypoint-initdb/  # Scripts tự động chạy khi Docker init
│   │   ├── 01-schema.sql
│   │   └── 02-seed.sql
│   ├── supabase-schema.sql        # Schema production cho Supabase
│   ├── .env                       # Config môi trường (sẵn sàng local)
│   └── .env.example
│
└── README.md
```

## 📡 API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/health` | Health check + xem DB mode hiện tại |
| GET / POST | `/api/services` | Lấy danh sách / Tạo dịch vụ |
| GET / PUT / DELETE | `/api/services/:id` | Xem / Sửa / Xóa dịch vụ |
| GET / POST | `/api/treatments` | Lấy danh sách / Tạo liệu trình |
| GET / PUT / DELETE | `/api/treatments/:id` | Xem / Sửa / Xóa liệu trình |
| GET / POST | `/api/pricing` | Lấy danh sách / Tạo gói giá |
| GET / PUT / DELETE | `/api/pricing/:id` | Xem / Sửa / Xóa gói giá |
| GET / POST | `/api/blogs` | Lấy bài viết (phân trang) / Tạo mới |
| GET | `/api/blogs/slug/:slug` | Lấy bài viết theo slug |
| POST | `/api/contact` | Gửi form tư vấn + gửi email thông báo |
| GET / PATCH | `/api/contact` | Xem danh sách / Đổi trạng thái (admin) |
| POST | `/api/upload/image` | Upload ảnh lên Cloudinary |
| POST | `/api/upload/video` | Upload video lên Cloudinary |

## 🎨 Design

- **Brand**: SÕN - Mom & Babycare
- **Tone**: Hồng nhạt pastel, sáng, dễ thương
- **Font**: Quicksand + Dancing Script
- **Primary Color**: `#F48FB1`

## 🛠️ Trang quản trị

Sau khi chạy frontend và backend, mở `http://localhost:5173/admin` để quản lý dịch vụ, liệu trình, gói giá, bài viết và trạng thái yêu cầu liên hệ. Trang quản trị dùng trực tiếp các API tại `/api`.

Trước khi sử dụng, đặt `ADMIN_API_KEY` thành một chuỗi ngẫu nhiên dài trong `backend/.env` (xem `backend/.env.example`) rồi khởi động lại backend. Khóa được hỏi tại trang đăng nhập quản trị và lưu trong session hiện tại của trình duyệt.
