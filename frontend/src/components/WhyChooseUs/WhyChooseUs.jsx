import { whyChooseData } from '../../data/sampleData';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="section why-us">
      <div className="why-us__bg-pattern"></div>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Vì Sao Chọn SÕN</span>
          <h2 className="section-title">Đặt Trọn Niềm Tin Với SÕN</h2>
          <p className="section-description">
            Với sự tận tâm, tỉ mỉ và tình yêu thương dành cho mẹ và bé,
            SÕN cam kết mang lại sự chăm sóc 1-1 an tâm, chu đáo và dịu dàng nhất.
          </p>
        </div>

        <div className="why-us__grid">
          {whyChooseData.map((item, index) => (
            <div
              className="why-us__card"
              key={item.id}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="why-us__card-stat">
                <span className="why-us__stat-number">{item.stat}</span>
                <span className="why-us__stat-label">{item.statLabel}</span>
              </div>
              <h3 className="why-us__card-title">{item.title}</h3>
              <p className="why-us__card-desc">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Trust Banner */}
        <div className="why-us__trust-banner">
          <div className="why-us__trust-item">
            <span className="why-us__trust-title">Chăm sóc 1-1</span>
            <span className="why-us__trust-desc">Chuyên viên cố định đồng hành</span>
          </div>
          <div className="why-us__trust-divider"></div>
          <div className="why-us__trust-item">
            <span className="why-us__trust-title">Tiệt trùng 100%</span>
            <span className="why-us__trust-desc">Dụng cụ chuẩn an toàn vệ sinh</span>
          </div>
          <div className="why-us__trust-divider"></div>
          <div className="why-us__trust-item">
            <span className="why-us__trust-title">Thảo mộc tự nhiên</span>
            <span className="why-us__trust-desc">Lành tính cho bé, phục hồi cho mẹ</span>
          </div>
          <div className="why-us__trust-divider"></div>
          <div className="why-us__trust-item">
            <span className="why-us__trust-title">Tận nhà chu đáo</span>
            <span className="why-us__trust-desc">Đúng giờ, chuyên nghiệp & kín gió</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
