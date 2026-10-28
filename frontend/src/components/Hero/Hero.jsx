import './Hero.css';

const Hero = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="hero">
      {/* Decorative blobs */}
      <div className="hero__blob hero__blob--1"></div>
      <div className="hero__blob hero__blob--2"></div>
      <div className="hero__blob hero__blob--3"></div>

      <div className="container hero__container">
        <div className="hero__content">
          <span className="hero__badge"> Hành trình chữa lành cho Mẹ, khởi đầu an lành cho bé</span>
          <h1 className="hero__title">
            Chăm Sóc <span className="hero__title-highlight">Mẹ Bầu</span> &{' '}
            <span className="hero__title-highlight">Bé Yêu</span>
          </h1>
          <p className="hero__description">
            SÕN mang đến dịch vụ chăm sóc mẹ bầu và bé sơ sinh tận tâm tại nhà,
            nhẹ nhàng và chu đáo trong từng thao tác, giúp mẹ an tâm phục hồi
            và bé yêu phát triển khỏe mạnh.
          </p>
          <div className="hero__buttons">
            <button className="btn btn-primary" onClick={() => scrollToSection('packages')}>
              Xem Gói Dịch Vụ
            </button>
            <button className="btn btn-outline" onClick={() => scrollToSection('contact')}>
              Tư Vấn Miễn Phí
            </button>
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-number">Tận Tâm</span>
              <span className="hero__stat-label">Chăm sóc chu đáo</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <span className="hero__stat-number">An Toàn</span>
              <span className="hero__stat-label">Vệ sinh tiệt trùng</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <span className="hero__stat-number">Tận Nơi</span>
              <span className="hero__stat-label">Phục vụ tại nhà</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&h=700&fit=crop"
              alt="Mẹ và bé sơ sinh"
              className="hero__image"
            />
            <div className="hero__floating-card hero__floating-card--1">
              <div>
                <strong>Chăm sóc bé</strong>
                <small>Nhẹ nhàng & Chu đáo</small>
              </div>
            </div>
            <div className="hero__floating-card hero__floating-card--2">
              <div>
                <strong>Phục hồi cho mẹ</strong>
                <small>Thư giãn & An tâm</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
