import { useLocation, useNavigate } from 'react-router-dom';
import { contactInfo, navLinks } from '../../data/sampleData';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (id === 'blog') {
      navigate('/blog');
      return;
    }

    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-text">
                <span className="footer__logo-name">SÕN</span>
                <span className="footer__logo-tagline">Mom & Babycare</span>
              </div>
            </div>
            <p className="footer__brand-desc">
              Đồng hành cùng mẹ trong hành trình thiêng liêng nhất. Chăm sóc mẹ bầu 
              và em bé sơ sinh chuyên nghiệp, tận tâm.
            </p>
            <div className="footer__social">
              <a href={contactInfo.social.facebook} className="footer__social-tag" target="_blank" rel="noreferrer">
                Facebook
              </a>
              <a href={contactInfo.social.zalo} className="footer__social-tag" target="_blank" rel="noreferrer">
                Zalo
              </a>
              <a href={contactInfo.social.tiktok} className="footer__social-tag" target="_blank" rel="noreferrer">
                TikTok
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__column">
            <h4 className="footer__column-title">Liên Kết Nhanh</h4>
            <nav className="footer__nav">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  className="footer__nav-link"
                  onClick={() => scrollToSection(link.id)}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="footer__column">
            <h4 className="footer__column-title">Dịch Vụ</h4>
            <nav className="footer__nav">
              <button className="footer__nav-link" onClick={() => scrollToSection('packages')}>Gói Chăm Sóc Cơ Bản</button>
              <button className="footer__nav-link" onClick={() => scrollToSection('packages')}>Gói Chăm Sóc Chuyên Sâu</button>
              <button className="footer__nav-link" onClick={() => scrollToSection('services')}>Chăm sóc mẹ bầu</button>
              <button className="footer__nav-link" onClick={() => scrollToSection('services')}>Chăm sóc bé sơ sinh</button>
              <button className="footer__nav-link" onClick={() => scrollToSection('services')}>Massage phục hồi sau sinh</button>
            </nav>
          </div>

          {/* Contact */}
          <div className="footer__column">
            <h4 className="footer__column-title">Liên Hệ</h4>
            <div className="footer__contact-list">
              <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="footer__contact-item">
                <span>Hotline: {contactInfo.phone}</span>
              </a>
              <a href={`mailto:${contactInfo.email}`} className="footer__contact-item">
                <span>Email: {contactInfo.email}</span>
              </a>
              <div className="footer__contact-item">
                <span>Địa chỉ: {contactInfo.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2026 SÕN - Mom & Babycare. Tất cả quyền được bảo lưu.
          </p>
          <p className="footer__made-with">
            Đồng hành và yêu thương cùng mẹ và bé
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
