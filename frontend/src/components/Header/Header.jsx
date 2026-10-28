import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { navLinks, contactInfo } from '../../data/sampleData';
import { HiMenu, HiX } from 'react-icons/hi';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);

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

  const goHome = (event) => {
    event.preventDefault();
    setIsMobileMenuOpen(false);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__container">
        {/* Logo */}
        <a href="/" className="header__logo" onClick={goHome}>
          <div className="header__logo-text">
            <span className="header__logo-name">SÕN</span>
            <span className="header__logo-tagline">Mom & Babycare</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="header__nav">
          {navLinks.map((link) => (
            <button
              key={link.id}
              className="header__nav-link"
              onClick={() => scrollToSection(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="header__cta">
          <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="header__phone">
            <span>{contactInfo.phone}</span>
          </a>
          <button className="btn btn-primary header__book-btn" onClick={() => scrollToSection('contact')}>
            Đặt Lịch Tư Vấn
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="header__mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`header__mobile-menu ${isMobileMenuOpen ? 'header__mobile-menu--open' : ''}`}>
        <nav className="header__mobile-nav">
          {navLinks.map((link) => (
            <button
              key={link.id}
              className="header__mobile-link"
              onClick={() => scrollToSection(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="header__mobile-cta">
          <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="header__mobile-phone">
            {contactInfo.phone}
          </a>
          <button className="btn btn-primary" onClick={() => scrollToSection('contact')} style={{ width: '100%' }}>
            Đặt Lịch Tư Vấn
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
