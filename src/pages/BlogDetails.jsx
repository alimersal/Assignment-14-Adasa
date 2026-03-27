import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${import.meta.env.BASE_URL}posts.json`)
      .then(res => res.json())
      .then(data => {
        const posts = data.posts || data;
        const currentPost = posts.find(p => p.id === parseInt(id));
        setPost(currentPost);

        // Fetch related posts (same category, excluding current)
        if (currentPost) {
          const related = posts
            .filter(p => p.category === currentPost.category && p.id !== currentPost.id)
            .slice(0, 3);
          setRelatedPosts(related);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching post data:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading-state">جاري التحميل...</div>;
  if (!post) return <div className="error-state">المقال غير موجود</div>;

  const formattedDate = new Date(post.date).toLocaleDateString('ar-EG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  let sectionCounter = 0;
  const renderContent = (content) => {
    if (!content) return null;
    return content.split('\n\n').map((block, index) => {
      if (block.startsWith('## ')) {
        const title = block.replace('## ', '');
        const currentId = `sec${sectionCounter++}`;
        return (
          <section className="article-section" id={currentId} key={index}>
            <div className="section-title-wrapper">
              <div className="section-icon"><i className="fa-solid fa-camera-retro"></i></div>
              <h2>{title}</h2>
            </div>
          </section>
        );
      }
      return <p className="article-text" key={index}>{block}</p>;
    });
  };

  return (
    <div className="blog-details-page">
      {/* Hero */}
      <section className="blog-hero" style={{ backgroundImage: `url(${post.image})` }}>
        <div className="hero-overlay"></div>
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-home"><i className="fa-solid fa-house"></i></Link>
            <i className="fa-solid fa-chevron-left"></i>
            <Link to="/blog">المدونة</Link>
            <i className="fa-solid fa-chevron-left"></i>
            <span className="current-post-category">{post.category}</span>
          </nav>

          <div className="hero-content">
            <div className="post-meta-top">
              <span className="post-category-badge">{post.category}</span>
              <div className="post-stats-inline">
                <span><i className="fa-regular fa-calendar"></i> {formattedDate}</span>
                <span><i className="fa-regular fa-clock"></i> {post.readTime}</span>
              </div>
            </div>

            <h1 className="post-main-title">{post.title}</h1>

            <div className="post-author-box">
              <div className="author-avatar-wrapper">
                <img src={post.author?.avatar} alt={post.author?.name} />
              </div>
              <div className="author-details">
                <span className="author-name">{post.author?.name}</span>
                <span className="author-role">{post.author?.role}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="blog-content-layout container">
        {/* Main Content */}
        <article className="blog-main-content">
          <div className="article-intro-box">
            <p>"{post.excerpt}"</p>
          </div>

          <div className="article-body">
            {renderContent(post.content)}
          </div>

          <div className="article-footer-meta-modern">
            <div className="tags-container-modern">
               <div className="tag-header">
                 <div className="related-icon-modern footer-icon-box">
                   <i className="fa-solid fa-tags"></i>
                 </div>
                 <span>الوسوم</span>
               </div>
               <div className="tags-list">
                 {post.tags?.map((tag, i) => (
                   <span key={i} className="modern-tag">#{tag}</span>
                 ))}
               </div>
            </div>

            <div className="share-section-modern">
              <div className="share-header">
                <div className="related-icon-modern footer-icon-box">
                  <i className="fa-solid fa-share-nodes"></i>
                </div>
                <span>شارك المقال</span>
              </div>
              <div className="share-buttons-modern">
                <button className="modern-share-btn"><i className="fa-brands fa-x-twitter"></i></button>
                <button className="modern-share-btn"><i className="fa-brands fa-linkedin-in"></i></button>
                <button className="modern-share-btn"><i className="fa-brands fa-whatsapp"></i></button>
                <button className="modern-share-btn"><i className="fa-solid fa-link"></i></button>
              </div>
            </div>

            <div className="author-card-modern">
               <div className="author-image-modern">
                 <img src={post.author?.avatar} alt={post.author?.name} />
               </div>
               <div className="author-info-modern">
                 <span className="author-label-modern">كاتب المقال</span>
                 <h3>{post.author?.name}</h3>
                 <p>{post.author?.role}</p>
                 <p className="author-desc-modern">{post.author?.bio || 'مصور محترف شغوف بمشاركة المعرفة والخبرات في عالم التصوير الفوتوغرافي.'}</p>
               </div>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="blog-sidebar sticky-sidebar">
          <div className="sidebar-card content-index-modern">
            <div className="card-header-modern">
              <div className="header-icon-box"><i className="fa-solid fa-list-check"></i></div>
              <h3>محتويات المقال</h3>
            </div>
            <ul className="index-list-modern">
              {post.content?.split('\n\n').filter(b => b.startsWith('## ')).map((block, i) => (
                <li key={i}>
                  <a href={`#sec${i}`}>
                    <span className="index-circle">{i + 1}</span> {block.replace('## ', '')}
                  </a>
                </li>
              ))}
              <li><a href="#"><span className="index-circle">#</span> الخلاصة</a></li>
            </ul>
          </div>

          <div className="meta-stats-row-modern">
            <div className="sidebar-card stat-card-modern">
              <i className="fa-solid fa-clock"></i>
              <div className="stat-text-modern">
                <span className="stat-value">{post.readTime}</span>
                <span className="stat-label">وقت القراءة</span>
              </div>
            </div>
            <div className="sidebar-card stat-card-modern">
              <i className="fa-solid fa-calendar-day"></i>
              <div className="stat-text-modern">
                <span className="stat-value">{formattedDate.split(' ')[0]} {formattedDate.split(' ')[1]}</span>
                <span className="stat-label">تاريخ النشر</span>
              </div>
            </div>
          </div>

          <div className="sidebar-card newsletter-card-modern">
            <div className="newsletter-icon-modern">
              <i className="fa-solid fa-envelope"></i>
            </div>
            <h3>لا تفوّت جديدنا</h3>
            <p>اشترك للحصول على أحدث المقالات</p>
            <Link to="/blog" className="btn-modern-orange" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>تصفح المزيد</Link>
          </div>
        </aside>
      </div>

      {/* Related Posts */}
      <section className="related-posts-modern">
        <div className="container">
          <div className="related-header-modern">
            <div className="related-title-box">
              <div className="related-icon-modern">
                <i className="fa-solid fa-images"></i>
              </div>
              <div className="title-text-modern">
                <h2>مقالات قد تعجبك</h2>
                <p>استكشف المزيد من المحتوى المميز</p>
              </div>
            </div>
            <Link to="/blog" className="modern-view-all">
              عرض الكل <i className="fa-solid fa-arrow-left"></i>
            </Link>
          </div>

          <div className="related-grid-modern">
            {relatedPosts.length > 0 ? (
              relatedPosts.map(p => (
                <Link to={`/blog/${p.id}`} key={p.id} className="modern-related-card">
                  <div className="modern-card-banner">
                    <img src={p.image} alt={p.title} />
                    <div className="modern-banner-overlay"></div>
                    <span className="modern-card-badge">{p.category}</span>
                  </div>
                  <div className="modern-card-details">
                    <h3>{p.title}</h3>
                    <div className="modern-card-footer">
                      <div className="footer-right-author">
                        <img src={p.author?.avatar} alt={p.author?.name} />
                        <span>{p.author?.name}</span>
                      </div>
                      <div className="footer-left-time">
                        {p.readTime}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="no-related-posts">لا توجد مقالات متعلقة حالياً.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;
