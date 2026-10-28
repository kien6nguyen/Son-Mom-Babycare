import { servicesData } from '../../data/sampleData';
import { useApi } from '../../hooks/useApi';
import './Services.css';

const Services = () => {
  const { data: services } = useApi('/services', servicesData);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Dịch Vụ Của Chúng Tôi</span>
          <h2 className="section-title">Chăm Sóc Toàn Diện Cho Mẹ & Bé</h2>
          <p className="section-description">
            Dịch vụ chăm sóc tận tâm được chuyên viên thực hiện trực tiếp tại nhà,
            nhẹ nhàng và chu đáo, giúp mẹ an tâm phục hồi và bé phát triển khỏe mạnh.
          </p>
        </div>

        <div className="services__grid">
          {services.slice(0, 3).map((service, index) => (
            <div
              className="services__card card"
              key={service.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="services__card-image">
                <img src={service.image} alt={service.title} loading="lazy" />
              </div>
              <div className="services__card-content">
                <h3 className="services__card-title">{service.title}</h3>
                <p className="services__card-desc">{service.description}</p>
                <button
                  className="btn btn-outline services__card-action-btn"
                  onClick={() => scrollToSection('contact')}
                >
                  Đăng Ký Tư Vấn
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
