import { blogData } from '../../data/sampleData';
import { useApi } from '../../hooks/useApi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Blog.css';

const Blog = ({ fullPage = false }) => {
  const { data: blogs } = useApi('/blogs', blogData);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="blog" className={`section blog ${fullPage ? 'blog--page' : ''}`}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Blog & Kiến Thức</span>
          <h2 className="section-title">Bài Viết Hữu Ích Cho Mẹ</h2>
          <p className="section-description">
            Cập nhật kiến thức chăm sóc mẹ bầu, em bé sơ sinh và sức khỏe gia đình
            từ đội ngũ chuyên gia của SÕN.
          </p>
        </div>

        <div className={`blog__grid ${fullPage ? 'blog__grid--page' : ''}`}>
          {blogs.map((post, index) => (
            <article
              className="blog__card card"
              key={post.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="blog__card-image">
                <img src={post.image} alt={post.title} loading="lazy" />
                <span className="blog__card-category">{post.category}</span>
              </div>
              <div className="blog__card-content">
                <div className="blog__card-meta">
                  <span className="blog__meta-item">{post.author}</span>
                  <span className="blog__meta-separator">•</span>
                  <span className="blog__meta-item">{post.read_time || post.readTime}</span>
                </div>
                <h3 className="blog__card-title">{post.title}</h3>
                <p className="blog__card-excerpt">{post.excerpt}</p>
                <button
                  className="blog__card-link"
                  onClick={() => scrollToSection('contact')}
                >
                  Đọc tiếp
                </button>
              </div>
            </article>
          ))}
        </div>

        {!fullPage && (
          <div className="blog__cta">
            <Link className="btn btn-outline" to="/blog">
              Xem Tất Cả Bài Viết
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
