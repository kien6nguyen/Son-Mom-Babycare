import { useState } from 'react';
import { contactInfo } from '../../data/sampleData';
import toast, { Toaster } from 'react-hot-toast';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Gửi thông tin thành công! Chúng tôi sẽ liên hệ bạn sớm nhất.');
        setFormData({ name: '', phone: '', email: '', service: '', message: '' });
      } else {
        toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
      }
    } catch {
      toast.error('Không thể kết nối server. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section contact">
      <Toaster position="top-right" />
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Liên Hệ Tư Vấn</span>
          <h2 className="section-title">Đặt Lịch Tư Vấn Miễn Phí</h2>
          <p className="section-description">
            Để lại thông tin hoặc số điện thoại, SÕN sẽ liên hệ tư vấn trực tiếp
            và giải đáp tận tình mọi thắc mắc của mẹ.
          </p>
        </div>

        <div className="contact__wrapper">
          {/* Form */}
          <div className="contact__form-wrapper">
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__form-row">
                <div className="contact__form-group">
                  <label className="contact__label">Họ và tên *</label>
                  <input
                    type="text"
                    name="name"
                    className="contact__input"
                    placeholder="Nhập họ và tên"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact__form-group">
                  <label className="contact__label">Số điện thoại *</label>
                  <input
                    type="tel"
                    name="phone"
                    className="contact__input"
                    placeholder="Nhập số điện thoại"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact__form-row">
                <div className="contact__form-group">
                  <label className="contact__label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="contact__input"
                    placeholder="Nhập email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="contact__form-group">
                  <label className="contact__label">Dịch vụ quan tâm</label>
                  <select
                    name="service"
                    className="contact__input contact__select"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">-- Chọn gói dịch vụ --</option>
                    <option value="goi-co-ban">Gói Chăm Sóc Cơ Bản (Mẹ & Bé)</option>
                    <option value="goi-chuyen-sau">Gói Chăm Sóc Chuyên Sâu (Mẹ & Bé)</option>
                    <option value="cham-soc-me-bau">Chăm sóc mẹ bầu</option>
                    <option value="cham-soc-be-so-sinh">Chăm sóc bé sơ sinh</option>
                    <option value="massage-sau-sinh">Massage & Phục hồi sau sinh</option>
                    <option value="tu-van-sua-me">Tư vấn nuôi con bằng sữa mẹ</option>
                    <option value="yoga-bau">Yoga & Vận động thai kỳ</option>
                    <option value="cham-soc-tai-nha">Chăm sóc tại nhà</option>
                  </select>
                </div>
              </div>

              <div className="contact__form-group">
                <label className="contact__label">Lời nhắn</label>
                <textarea
                  name="message"
                  className="contact__input contact__textarea"
                  placeholder="Nhập lời nhắn hoặc câu hỏi của bạn..."
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary contact__submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang gửi yêu cầu...' : 'Gửi Yêu Cầu Tư Vấn'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact__info">
            <div className="contact__info-card">
              <h3 className="contact__info-title">Thông Tin Liên Hệ</h3>

              <div className="contact__info-items">
                <div className="contact__info-item">
                  <span className="contact__info-label">Hotline</span>
                  <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="contact__info-value">
                    {contactInfo.phone}
                  </a>
                </div>

                <div className="contact__info-item">
                  <span className="contact__info-label">Email</span>
                  <a href={`mailto:${contactInfo.email}`} className="contact__info-value">
                    {contactInfo.email}
                  </a>
                </div>

                <div className="contact__info-item">
                  <span className="contact__info-label">Địa chỉ</span>
                  <span className="contact__info-value">{contactInfo.address}</span>
                </div>

                <div className="contact__info-item">
                  <span className="contact__info-label">Giờ làm việc</span>
                  <span className="contact__info-value">{contactInfo.workingHours}</span>
                </div>
              </div>

              <div className="contact__info-note">
                <p>SÕN luôn sẵn sàng lắng nghe và đồng hành cùng mẹ. Hãy gửi thông tin để được hỗ trợ và hẹn lịch chu đáo nhất.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
