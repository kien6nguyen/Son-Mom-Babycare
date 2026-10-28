import { useState } from 'react';
import { packagesData } from '../../data/sampleData';
import './Packages.css';

const Packages = () => {
  const [filter, setFilter] = useState('all'); // 'all' | 'baby' | 'mom'

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const basicPkg = packagesData[0];
  const advancedPkg = packagesData[1];

  return (
    <section id="packages" className="section packages">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Chăm Sóc Mẹ & Bé Tại Nhà</span>
          <h2 className="section-title">Gói Dịch Vụ</h2>
          <p className="section-description">
            Toàn bộ quy trình được thực hiện tận tâm, nhẹ nhàng và chu đáo.
            Mẹ có thể theo dõi chi tiết từng bước chăm sóc bên dưới để lựa chọn gói phù hợp.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="packages__filter-bar">
          <button
            className={`packages__filter-btn ${filter === 'all' ? 'packages__filter-btn--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tất Cả Quy Trình
          </button>
          <button
            className={`packages__filter-btn ${filter === 'baby' ? 'packages__filter-btn--active' : ''}`}
            onClick={() => setFilter('baby')}
          >
            Chăm Sóc Bé (16 bước)
          </button>
          <button
            className={`packages__filter-btn ${filter === 'mom' ? 'packages__filter-btn--active' : ''}`}
            onClick={() => setFilter('mom')}
          >
            Chăm Sóc Mẹ (So sánh chi tiết)
          </button>
        </div>

        {/* Side-by-side Packages Grid */}
        <div className="packages__grid">
          {/* Card 1: Gói Cơ Bản */}
          <div className="packages__card card">
            <div className="packages__card-header">
              <div className="packages__card-meta">Thời gian: {basicPkg.duration}</div>
              <h3 className="packages__card-name">{basicPkg.name}</h3>
              <p className="packages__card-desc">{basicPkg.tagline}</p>
            </div>

            <div className="packages__card-body">
              {/* Bé */}
              {(filter === 'all' || filter === 'baby') && (
                <div className="packages__section">
                  <div className="packages__section-header packages__section-header--baby">
                    <span className="packages__section-title">Chăm Sóc Bé</span>
                    <span className="packages__section-count">{basicPkg.babyCare.length} bước</span>
                  </div>
                  <ul className="packages__list">
                    {basicPkg.babyCare.map((item, idx) => (
                      <li className="packages__item" key={idx}>
                        <span className="packages__dot"></span>
                        <span className="packages__text">{item.text}</span>
                        {item.note && <span className="packages__note">{item.note}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mẹ */}
              {(filter === 'all' || filter === 'mom') && (
                <div className="packages__section">
                  <div className="packages__section-header packages__section-header--mom">
                    <span className="packages__section-title">Chăm Sóc Mẹ</span>
                    <span className="packages__section-count">{basicPkg.momCare.length} bước</span>
                  </div>
                  <ul className="packages__list">
                    {basicPkg.momCare.map((item, idx) => (
                      <li className="packages__item" key={idx}>
                        <span className="packages__dot"></span>
                        <span className="packages__text">{item.text}</span>
                        {item.note && <span className="packages__note">{item.note}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="packages__card-footer">
              <button
                className="btn btn-outline packages__btn"
                onClick={() => scrollToSection('contact')}
              >
                Đăng Ký Tư Vấn Gói Cơ Bản
              </button>
            </div>
          </div>

          {/* Card 2: Gói Chuyên Sâu */}
          <div className="packages__card card packages__card--highlight">
            <div className="packages__badge">Khuyên Dùng</div>

            <div className="packages__card-header">
              <div className="packages__card-meta packages__card-meta--highlight">
                Thời gian: {advancedPkg.duration}
              </div>
              <h3 className="packages__card-name">{advancedPkg.name}</h3>
              <p className="packages__card-desc">{advancedPkg.tagline}</p>
            </div>

            <div className="packages__card-body">
              {/* Bé */}
              {(filter === 'all' || filter === 'baby') && (
                <div className="packages__section">
                  <div className="packages__section-header packages__section-header--baby">
                    <span className="packages__section-title">Chăm Sóc Bé</span>
                    <span className="packages__section-count">{advancedPkg.babyCare.length} bước</span>
                  </div>
                  <ul className="packages__list">
                    {advancedPkg.babyCare.map((item, idx) => (
                      <li className="packages__item" key={idx}>
                        <span className="packages__dot"></span>
                        <span className="packages__text">{item.text}</span>
                        {item.note && <span className="packages__note">{item.note}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mẹ */}
              {(filter === 'all' || filter === 'mom') && (
                <div className="packages__section">
                  <div className="packages__section-header packages__section-header--mom">
                    <span className="packages__section-title">Chăm Sóc Mẹ</span>
                    <span className="packages__section-count">{advancedPkg.momCare.length} bước</span>
                  </div>
                  <ul className="packages__list">
                    {advancedPkg.momCare.map((item, idx) => {
                      const isUpgraded = Boolean(item.badge);
                      return (
                        <li
                          className={`packages__item ${isUpgraded ? 'packages__item--upgraded' : ''}`}
                          key={idx}
                        >
                          <span className={`packages__dot ${isUpgraded ? 'packages__dot--upgraded' : ''}`}></span>
                          <span className={`packages__text ${isUpgraded ? 'packages__text--upgraded' : ''}`}>
                            {item.text}
                          </span>
                          {item.badge && <span className="packages__tag-upgraded">{item.badge}</span>}
                          {item.note && <span className="packages__note">{item.note}</span>}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            <div className="packages__card-footer">
              <button
                className="btn btn-primary packages__btn"
                onClick={() => scrollToSection('contact')}
              >
                Đăng Ký Tư Vấn Gói Chuyên Sâu
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
