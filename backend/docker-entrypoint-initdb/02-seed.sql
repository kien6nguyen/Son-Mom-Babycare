-- =====================================================
-- SÕN - Mom & Babycare | Seed Data
-- Dữ liệu mẫu để test local
-- =====================================================

-- Dịch vụ
INSERT INTO services (title, description, icon, image, sort_order) VALUES
('Chăm Sóc Mẹ Bầu', 'Chăm sóc toàn diện cho mẹ bầu suốt thai kỳ với các chuyên gia giàu kinh nghiệm, giúp mẹ khỏe mạnh và an tâm.', '🤰', 'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=600&h=400&fit=crop', 1),
('Chăm Sóc Em Bé Sơ Sinh', 'Dịch vụ chăm sóc bé sơ sinh tại nhà chuyên nghiệp: tắm bé, massage, theo dõi sức khỏe và phát triển.', '👶', 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&h=400&fit=crop', 2),
('Massage & Phục Hồi Sau Sinh', 'Massage chuyên biệt giúp mẹ phục hồi sức khỏe, giảm đau nhức, thư giãn và lấy lại vóc dáng sau sinh.', '💆‍♀️', 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=600&h=400&fit=crop', 3);

-- Liệu trình
INSERT INTO treatments (title, description, duration, sessions, highlights, image, popular) VALUES
('Liệu Trình Chăm Sóc Thai Kỳ 9 Tháng', 'Chương trình chăm sóc toàn diện xuyên suốt thai kỳ với theo dõi sức khỏe, dinh dưỡng và tâm lý.', '9 tháng', '36 buổi', '["Khám và tư vấn định kỳ", "Yoga bầu hàng tuần", "Massage thư giãn", "Tư vấn dinh dưỡng"]', 'https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=600&h=400&fit=crop', true),
('Liệu Trình Phục Hồi Sau Sinh 30 Ngày', 'Giúp mẹ phục hồi nhanh chóng sau sinh với massage, xông hơi, chăm sóc da và hỗ trợ tinh thần.', '30 ngày', '30 buổi', '["Massage toàn thân", "Xông hơi thảo dược", "Bấm huyệt giảm đau", "Tư vấn tâm lý"]', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop', false),
('Liệu Trình Chăm Sóc Bé Sơ Sinh', 'Chăm sóc bé sơ sinh chuyên nghiệp tại nhà: tắm, massage, theo dõi phát triển và hướng dẫn mẹ.', '30 ngày', '30 buổi', '["Tắm bé khoa học", "Massage bé", "Theo dõi cân nặng", "Hướng dẫn mẹ chăm bé"]', 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=600&h=400&fit=crop', false),
('Liệu Trình Lấy Lại Vóc Dáng', 'Kết hợp massage giảm mỡ, tập luyện nhẹ nhàng và dinh dưỡng khoa học giúp mẹ tự tin trở lại.', '60 ngày', '24 buổi', '["Massage giảm mỡ bụng", "Tập phục hồi cơ sàn chậu", "Thực đơn giảm cân", "Theo dõi tiến độ"]', 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&h=400&fit=crop', true);

-- Bảng giá
INSERT INTO pricing (name, price, unit, description, features, not_included, highlight, color) VALUES
('Gói Cơ Bản', 2500000, 'VNĐ/tháng', 'Phù hợp cho mẹ cần chăm sóc cơ bản', '["Tư vấn sức khỏe online", "2 buổi massage/tháng", "Tư vấn dinh dưỡng", "Hỗ trợ qua điện thoại 24/7"]', '["Chăm sóc tại nhà", "Yoga bầu", "Xông hơi thảo dược"]', false, '#F8BBD0'),
('Gói Tiêu Chuẩn', 5000000, 'VNĐ/tháng', 'Gói phổ biến nhất, được nhiều mẹ tin chọn', '["Tất cả dịch vụ Gói Cơ Bản", "4 buổi massage/tháng", "4 buổi yoga bầu/tháng", "Chăm sóc tại nhà 2 lần/tháng", "Tư vấn tâm lý thai kỳ"]', '["Xông hơi thảo dược"]', true, '#F48FB1'),
('Gói Premium', 9500000, 'VNĐ/tháng', 'Trải nghiệm chăm sóc toàn diện VIP', '["Tất cả dịch vụ Gói Tiêu Chuẩn", "Massage không giới hạn", "Yoga cá nhân 1-1", "Chăm sóc tại nhà hàng tuần", "Xông hơi thảo dược", "Chuyên gia dinh dưỡng riêng", "Quà tặng cho mẹ & bé"]', '[]', false, '#CE93D8');

-- Blog
INSERT INTO blogs (title, slug, excerpt, content, category, author, image, read_time, published) VALUES
('Chế Độ Dinh Dưỡng Cho Mẹ Bầu 3 Tháng Đầu', 'che-do-dinh-duong-me-bau-3-thang-dau', 'Tìm hiểu về chế độ dinh dưỡng khoa học giúp mẹ bầu 3 tháng đầu khỏe mạnh, thai nhi phát triển tốt nhất.', 'Nội dung chi tiết bài viết...', 'Dinh dưỡng', 'BS. Nguyễn Thị Hoa', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop', '5 phút', true),
('Hướng Dẫn Massage Bé Sơ Sinh Tại Nhà', 'huong-dan-massage-be-so-sinh', 'Massage cho bé sơ sinh giúp bé ngủ ngon, tiêu hóa tốt và phát triển vận động. Xem ngay cách massage đúng!', 'Nội dung chi tiết bài viết...', 'Chăm sóc bé', 'ĐD. Trần Minh Anh', 'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=600&h=400&fit=crop', '7 phút', true),
('Yoga Bầu: Những Bài Tập An Toàn Cho Từng Giai Đoạn', 'yoga-bau-bai-tap-an-toan', 'Tổng hợp các bài tập yoga an toàn và hiệu quả cho mẹ bầu qua từng tam cá nguyệt.', 'Nội dung chi tiết bài viết...', 'Yoga & Vận động', 'HLV. Lê Thùy Dung', 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop', '6 phút', true),
('Dấu Hiệu Trầm Cảm Sau Sinh Và Cách Vượt Qua', 'dau-hieu-tram-cam-sau-sinh', 'Nhận biết sớm dấu hiệu trầm cảm sau sinh và những phương pháp hỗ trợ mẹ vượt qua giai đoạn khó khăn.', 'Nội dung chi tiết bài viết...', 'Sức khỏe tinh thần', 'TS. Phạm Thanh Vân', 'https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=600&h=400&fit=crop', '8 phút', true),
('Cách Cho Con Bú Đúng Cách Ngay Từ Đầu', 'cach-cho-con-bu-dung-cach', 'Hướng dẫn chi tiết cách cho con bú đúng tư thế, cách khắc phục các vấn đề thường gặp khi cho con bú.', 'Nội dung chi tiết bài viết...', 'Nuôi con', 'BS. Nguyễn Thị Hoa', 'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=600&h=400&fit=crop', '6 phút', true),
('Phục Hồi Sau Sinh Mổ: Những Điều Mẹ Cần Biết', 'phuc-hoi-sau-sinh-mo', 'Tổng hợp kiến thức về chăm sóc và phục hồi sau sinh mổ, từ chế độ ăn uống đến vận động phù hợp.', 'Nội dung chi tiết bài viết...', 'Sau sinh', 'BS. Lê Hoàng Nam', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop', '7 phút', true);

-- Liên hệ test
INSERT INTO contacts (name, phone, email, service, message, status) VALUES
('Nguyễn Thị Lan', '0909111222', 'lan@gmail.com', 'cham-soc-me-bau', 'Em muốn tư vấn gói chăm sóc thai kỳ 9 tháng ạ', 'new'),
('Trần Minh Thu', '0912333444', 'thu.tran@gmail.com', 'massage-sau-sinh', 'Cho em hỏi giá massage sau sinh tại nhà khu vực quận 7', 'contacted');
