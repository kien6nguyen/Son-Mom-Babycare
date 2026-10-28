-- =====================================================
-- SÕN - Mom & Babycare | Supabase Database Schema
-- =====================================================

-- Bảng Dịch Vụ
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  image TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng Liệu Trình
CREATE TABLE IF NOT EXISTS treatments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  duration VARCHAR(100),
  sessions VARCHAR(100),
  highlights JSONB DEFAULT '[]',
  image TEXT,
  popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng Bảng Giá
CREATE TABLE IF NOT EXISTS pricing (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(12, 0) NOT NULL,
  unit VARCHAR(50) DEFAULT 'VNĐ/tháng',
  description TEXT,
  features JSONB DEFAULT '[]',
  not_included JSONB DEFAULT '[]',
  highlight BOOLEAN DEFAULT false,
  color VARCHAR(20),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng Bài Viết / Blog
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  category VARCHAR(100),
  author VARCHAR(255),
  image TEXT,
  read_time VARCHAR(50),
  published BOOLEAN DEFAULT false,
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng Liên Hệ / Tư Vấn
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  service VARCHAR(255),
  message TEXT,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== Indexes =====
CREATE INDEX IF NOT EXISTS idx_services_sort_order ON services(sort_order);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_treatments_active ON treatments(is_active);
CREATE INDEX IF NOT EXISTS idx_treatments_popular ON treatments(popular);
CREATE INDEX IF NOT EXISTS idx_pricing_active ON pricing(is_active);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- ===== Row Level Security (RLS) =====
-- Bật RLS cho tất cả bảng
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policy cho phép đọc public (services, treatments, pricing, blogs)
CREATE POLICY "Public can read active services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active treatments" ON treatments FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active pricing" ON pricing FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read published blogs" ON blogs FOR SELECT USING (published = true);

-- Policy cho phép insert contacts (form liên hệ)
CREATE POLICY "Public can submit contacts" ON contacts FOR INSERT WITH CHECK (true);

-- Policy service_role có full access (dùng cho backend API)
CREATE POLICY "Service role full access services" ON services FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access treatments" ON treatments FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access pricing" ON pricing FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access blogs" ON blogs FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access contacts" ON contacts FOR ALL USING (auth.role() = 'service_role');
