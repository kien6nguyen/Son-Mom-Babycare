/* Dữ liệu mẫu cho trang web SÕN - Mom and Babycare */

// ===== DỊCH VỤ =====
export const servicesData = [
  {
    id: 1,
    title: 'Chăm Sóc Mẹ Bầu',
    description: 'Chăm sóc toàn diện cho mẹ bầu suốt thai kỳ với sự tận tâm, nhẹ nhàng, giúp mẹ thư giãn, giảm nhức mỏi và an tâm đón bé.',
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Chăm Sóc Em Bé Sơ Sinh',
    description: 'Dịch vụ tắm bé, massage kích thích tiêu hóa và vận động, vệ sinh rốn chuẩn y khoa nhẹ nhàng ngay tại nhà.',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Massage & Phục Hồi Sau Sinh',
    description: 'Massage chuyên sâu tống sản dịch, quấn đai thảo dược giảm mỡ bụng, xông hơi và phục hồi thể trạng nhanh chóng cho mẹ.',
    image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=600&h=400&fit=crop',
  },
];

// ===== GÓI DỊCH VỤ =====
export const packagesData = [
  {
    id: 'co-ban',
    name: 'Gói Cơ Bản',
    duration: '60 phút',
    tagline: 'Quy trình chăm sóc nền tảng thiết yếu, nhẹ nhàng cho mẹ và bé',
    highlight: false,
    babyCare: [
      { text: 'KTV sát khuẩn bằng cồn' },
      { text: 'Kiểm tra tình trạng sức khoẻ bé' },
      { text: 'Massage tay chân cho bé' },
      { text: 'Massage bụng kích thích hệ tiêu hoá' },
      { text: 'Massage lưng, tập kỹ trườn, cứng cổ' },
      { text: 'Tập vận động giúp bé ngủ ngon' },
      { text: 'Chuẩn bị nước tắm cho bé' },
      { text: 'Tắm bé 5 phút trong phòng kín gió' },
      { text: 'Vệ sinh mắt, mũi, tai, rơ lưỡi cho bé' },
      { text: 'Vệ sinh rốn cho bé' },
      { text: 'Vệ sinh vùng kín cho bé' },
      { text: 'Hơ lá trầu giữ ấm, khử khuẩn, giảm đầy hơi' },
      { text: 'Bôi tinh dầu tràm, kem chống hăm cho bé' },
      { text: 'Mặc quần áo cho bé, quấn chũn' },
      { text: 'Cho bé bú sữa' },
      { text: 'Vỗ ợ hơi cho bé' },
    ],
    momCare: [
      { text: 'Kiểm tra tình trạng sức khỏe của mẹ' },
      { text: 'Thoa rượu gừng nghệ lần 1' },
      { text: 'Massage bụng hỗ trợ tống sản dịch' },
      { text: 'Thoa gel gừng / cao ngải cứu giảm mỡ vùng bụng' },
      { text: 'Quấn đai nóng thư giãn lưng, giảm mỡ bụng' },
      { text: 'Đắp túi muối thảo dược vùng bụng' },
      { text: 'Làm sạch mặt bằng SRM thiên nhiên' },
      { text: 'Đắp mặt nạ ngũ hoa' },
      { text: 'Đắp mắt bằng lá trầu' },
      { text: 'Đắp túi muối thảo dược mắt' },
      { text: 'Tẩy trắng nách bằng phèn chua + hơ lá trầu' },
      { text: 'Massage lưng', note: 'Cách ngày' },
      { text: 'Xông toàn thân với thuốc thảo mộc', note: 'Cách ngày' },
      { text: 'Xông vùng kín', note: 'Cách ngày' },
      { text: 'Thoa rượu gừng nghệ lần 2' },
      { text: 'Vệ sinh vết mổ', note: 'Theo yêu cầu của Mẹ' },
      { text: 'Gội đầu thảo dược', note: 'Theo yêu cầu của Mẹ' },
      { text: 'Ngâm chân thảo mộc' },
    ],
  },
  {
    id: 'chuyen-sau',
    name: 'Gói Chuyên Sâu',
    duration: '90 phút',
    tagline: 'Chăm sóc toàn diện, thêm massage ngực thông sữa, đá nóng & cổ vai gáy',
    highlight: true,
    babyCare: [
      { text: 'KTV sát khuẩn bằng cồn' },
      { text: 'Kiểm tra tình trạng sức khoẻ bé' },
      { text: 'Massage tay chân cho bé' },
      { text: 'Massage bụng kích thích hệ tiêu hoá' },
      { text: 'Massage lưng, tập kỹ trườn, cứng cổ' },
      { text: 'Tập vận động giúp bé ngủ ngon' },
      { text: 'Chuẩn bị nước tắm cho bé' },
      { text: 'Tắm bé 5 phút trong phòng kín gió' },
      { text: 'Vệ sinh mắt, mũi, tai, rơ lưỡi cho bé' },
      { text: 'Vệ sinh rốn cho bé' },
      { text: 'Vệ sinh vùng kín cho bé' },
      { text: 'Hơ lá trầu giữ ấm, khử khuẩn, giảm đầy hơi' },
      { text: 'Bôi tinh dầu tràm, kem chống hăm cho bé' },
      { text: 'Mặc quần áo cho bé, quấn chũn' },
      { text: 'Cho bé bú sữa' },
      { text: 'Vỗ ợ hơi cho bé' },
    ],
    momCare: [
      { text: 'Kiểm tra tình trạng sức khỏe của mẹ' },
      { text: 'Thoa rượu gừng nghệ lần 1' },
      { text: 'Massage bụng hỗ trợ tống sản dịch' },
      { text: 'Đắp cao ngải cứu / gel gừng giảm mỡ vùng bụng' },
      { text: 'Quấn đai nóng giảm mỡ vùng bụng' },
      { text: 'Đắp túi muối thảo dược vùng bụng' },
      { text: 'Massage ngực + đắp men rượu', badge: 'Gói 90p có thêm' },
      { text: 'Làm sạch mặt (tẩy TBC, rửa mặt)', badge: 'Gói 90p có thêm' },
      { text: 'Đắp mặt nạ ngũ hoa' },
      { text: 'Đắp mắt bằng lá trầu' },
      { text: 'Đắp túi muối thảo dược mắt' },
      { text: 'Massage cổ vai gáy', badge: 'Gói 90p có thêm' },
      { text: 'Tẩy trắng nách bằng phèn chua + hơ lá trầu' },
      { text: 'Massage tay + chân trước', note: 'Cách ngày', badge: 'Gói 90p có thêm' },
      { text: 'Massage lưng / đá nóng lưng', note: 'Cách ngày', badge: 'Đá nóng' },
      { text: 'Massage chân sau', note: 'Cách ngày', badge: 'Gói 90p có thêm' },
      { text: 'Xông toàn thân với thuốc thảo mộc', note: 'Cách ngày' },
      { text: 'Xông vùng kín', note: 'Cách ngày' },
      { text: 'Thoa rượu gừng nghệ lần 2' },
      { text: 'Vệ sinh vết mổ / vùng kín', note: 'Theo yêu cầu của Mẹ' },
      { text: 'Gội đầu thảo dược', note: 'Theo yêu cầu của Mẹ' },
      { text: 'Ngâm chân thảo mộc', note: 'Cách ngày' },
    ],
  },
];

// ===== VÌ SAO CHỌN SÕN =====
export const whyChooseData = [
  {
    id: 1,
    title: 'Chuyên Viên Tận Tâm',
    description: 'Chăm sóc trực tiếp, chu đáo và thấu hiểu tình trạng thực tế của mẹ và bé.',
    stat: 'Tận tâm',
    statLabel: 'Đồng hành chu đáo',
  },
  {
    id: 2,
    title: 'Nhẹ Nhàng & Kiên Nhẫn',
    description: 'Nâng niu bé cẩn thận, chăm sóc mẹ nhẹ nhàng trong từng thao tác phục hồi.',
    stat: 'Yêu thương',
    statLabel: 'Nhẹ nhàng từng bước',
  },
  {
    id: 3,
    title: 'Vệ Sinh Chuẩn Y Khoa',
    description: 'Dụng cụ tiệt trùng kỹ trước mỗi ca, kết hợp nguyên liệu thảo mộc tự nhiên lành tính.',
    stat: 'An toàn',
    statLabel: 'Tiệt trùng kỹ lưỡng',
  },
  {
    id: 4,
    title: 'Phục Vụ Tận Nhà',
    description: 'Đến tận phòng ngủ của mẹ đúng giờ, đầy đủ đồ dùng, mẹ an tâm nghỉ ngơi kín gió.',
    stat: 'Tận nơi',
    statLabel: 'Tiện lợi cho mẹ',
  },
];

// ===== BÀI VIẾT =====
export const blogData = [
  {
    id: 1,
    title: 'Chế Độ Dinh Dưỡng Cho Mẹ Bầu 3 Tháng Đầu',
    excerpt: 'Tìm hiểu về chế độ dinh dưỡng khoa học giúp mẹ bầu 3 tháng đầu khỏe mạnh, thai nhi phát triển tốt nhất.',
    category: 'Dinh dưỡng',
    author: 'SÕN Babycare',
    date: '25/10/2026',
    readTime: '5 phút đọc',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Hướng Dẫn Massage Bé Sơ Sinh Tại Nhà Giúp Bé Ngủ Ngon',
    excerpt: 'Massage cho bé sơ sinh giúp bé ngủ ngon, tiêu hóa tốt và phát triển vận động. Xem ngay cách massage đúng!',
    category: 'Chăm sóc bé',
    author: 'SÕN Babycare',
    date: '22/10/2026',
    readTime: '7 phút đọc',
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Kinh Nghiệm Giảm Tắc Tia Sữa Cho Mẹ Mới Sinh',
    excerpt: 'Những mẹo dân gian kết hợp chườm ấm và massage ngực nhẹ nhàng giúp sữa non về dồi dào, mẹ nhẹ nhõm.',
    category: 'Sữa mẹ',
    author: 'SÕN Babycare',
    date: '18/10/2026',
    readTime: '6 phút đọc',
    image: 'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Chăm Sóc Vết Mổ & Kiêng Cữ Đúng Cách Sau Sinh',
    excerpt: 'Những lưu ý quan trọng khi vệ sinh vết mổ và chế độ nghỉ ngơi giúp vết thương nhanh lành, ngừa sẹo.',
    category: 'Sau sinh',
    author: 'SÕN Babycare',
    date: '15/10/2026',
    readTime: '8 phút đọc',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
  },
];

// ===== NAVIGATION =====
export const navLinks = [
  { id: 'why-us', label: 'Về SÕN' },
  { id: 'services', label: 'Dịch vụ' },
  { id: 'packages', label: 'Gói dịch vụ' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Liên hệ' },
];

// ===== THÔNG TIN LIÊN HỆ =====
export const contactInfo = {
  phone: '036 927 0005',
  email: 'ngocnhuquynh.1196@gmail.com',
  address: 'ấp An Thạnh, xã Cái Bè, tỉnh Đồng Tháp (Tiền Giang cũ)',
  workingHours: 'Thứ 2 - Chủ Nhật: 8:00 - 20:00 (Hẹn lịch trước)',
  social: {
    facebook: 'https://www.facebook.com/SON.ChamSocMeVaBeSauSinh',
    tiktok: 'https://www.tiktok.com/@sonbabycare',
    zalo: 'https://zalo.me/sonbabycare',
  },
};
