import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import FeaturedCard from '../components/FeaturedCard';
import LatestPostCard from '../components/LatestPostCard';

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const section4Ref = useRef(null);

  useEffect(() => {
    fetch('/posts.json')
      .then(res => res.json())
      .then(data => {
        const posts = data.posts || data;
        
        // 3 Featured posts for Section 2
        const featured = posts.filter(post => post.featured).slice(0, 3);
        setFeaturedPosts(featured);
        
        // Latest posts for Section 4 (ids 4, 5, 6 as in the image)
        // In the image order is: Camera Settings (4), Composition (5), Mobile (6)
        // We take them from the array.
        const latest = posts.slice(3, 6);
        setLatestPosts(latest);
        
        if (data.categories) {
          setCategories(data.categories);
        } else {
          const cats = [...new Set(posts.map(p => p.category))].map(name => ({
            name,
            count: posts.filter(p => p.category === name).length
          }));
          setCategories(cats);
        }
      })
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('.navbar-container');
      if (!nav || !section4Ref.current) return;

      const sec4Top = section4Ref.current.offsetTop;
      const scrollPos = window.scrollY;

      // When we hit the start of section 4
      if (scrollPos >= sec4Top - 70) {
        nav.classList.add('nav-stopped');
        // Set its absolute position to be exactly at the boundary
        nav.style.top = `${sec4Top - 70}px`;
      } else {
        nav.classList.remove('nav-stopped');
        nav.style.top = '0';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Reset navbar state when leaving the home page
      const nav = document.querySelector('.navbar-container');
      if (nav) {
        nav.classList.remove('nav-stopped');
        nav.style.top = '0';
      }
    };
  }, []);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'إضاءة': return 'fa-solid fa-gear';
      case 'بورتريه': return 'fa-solid fa-user';
      case 'مناظر طبيعية': return 'fa-solid fa-mountain-sun';
      case 'تقنيات': return 'fa-solid fa-sliders';
      case 'معدات': return 'fa-solid fa-gear';
      default: return 'fa-solid fa-camera';
    }
  };

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <span className="badge">
            <span className="dots-container">
              <span className="dot"></span>
              <span className="dot"></span>
            </span>
            مرحباً بك في عدسة
          </span>
          <h1>اكتشف <span>فن</span><br/>التصوير الفوتوغرافي</h1>
          <p>انغمس في أسرار المحترفين ونصائح عملية لتطوير مهاراتك في التصوير.</p>

          <div className="hero-actions">
            <Link to="/blog" className="btn-primary">
              استكشف المقالات <i className="fa-solid fa-arrow-left"></i>
            </Link>
            <Link to="/about" className="btn-outline">
              <i className="fa-solid fa-circle-info"></i> اعرف المزيد
            </Link>
          </div>

          <div className="stats">
            <div className="stat-item">
              <i className="fa-regular fa-newspaper"></i>
              <h3>+50</h3>
              <p>مقالة</p>
            </div>
            <div className="stat-item">
              <i className="fa-solid fa-users"></i>
              <h3>+10ألف</h3>
              <p>قارئ</p>
            </div>
            <div className="stat-item">
              <i className="fa-solid fa-folder"></i>
              <h3>4</h3>
              <p>تصنيفات</p>
            </div>
            <div className="stat-item">
              <i className="fa-solid fa-pen-nib"></i>
              <h3>6</h3>
              <p>كاتب</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="featured-section">
        <div className="container">
          <div className="featured-header">
            <div className="featured-header-right">
              <span className="badge">
                <span className="dots-container">
                  <span className="dot"></span>
                  <span className="dot"></span>
                </span>
                مميز
              </span>
              <h2 className="featured-title">مقالات مختارة</h2>
              <p className="featured-subtitle">محتوى منتقى لبدء رحلة تعلمك</p>
            </div>
            <div className="featured-header-left">
              <Link to="/blog" className="btn-view-all">
                عرض الكل <i className="fa-solid fa-chevron-left"></i>
              </Link>
            </div>
          </div>

          <div className="featured-cards">
            {featuredPosts.map(post => (
              <FeaturedCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-header">
            <span className="badge badge-accent">
              <span className="dots-container">
                <span className="dot"></span>
                <span className="dot"></span>
              </span>
              التصنيفات
            </span>
            <h2>استكشف حسب الموضوع</h2>
            <p>اعثر على محتوى مصمم حسب اهتماماتك</p>
          </div>

          <div className="categories-grid">
            {categories.map((cat, index) => (
              <Link to={`/blog?category=${cat.name}`} key={index} className="category-card">
                <div className="category-card-hover-arrow">
                  <i className="fa-solid fa-chevron-left"></i>
                </div>
                <div className="category-card-content">
                  <div className="category-icon-box">
                    <i className={getCategoryIcon(cat.name)}></i>
                  </div>
                  <div className="category-card-text">
                    <h3>{cat.name}</h3>
                    <p>{cat.count} مقالة</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Section */}
      <section className="latest-articles" id="latest-articles" ref={section4Ref}>
        <div className="container">
          <div className="latest-header">
            <div className="latest-header-right">
              <span className="badge">
                <span className="dots-container">
                  <span className="dot"></span>
                  <span className="dot"></span>
                </span>
                الأحدث
              </span>
              <h2>أحدث المقالات</h2>
              <p>محتوى جديد طازج من المطبعة</p>
            </div>
            <div className="latest-header-left">
              <Link to="/blog" className="btn-latest-all group">
                عرض جميع المقالات <i className="fa-solid fa-arrow-left"></i>
              </Link>
            </div>
          </div>

          <div className="latest-posts-grid">
            {latestPosts.map(post => (
              <LatestPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-box">
            <div className="newsletter-icon-container">
              <i className="fa-regular fa-envelope"></i>
            </div>
            <h2>اشترك في <span>نشرتنا الإخبارية</span></h2>
            <p>احصل على نصائح التصوير الحصرية ودروس جديدة مباشرة في بريدك الإلكتروني</p>
            
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="أدخل بريدك الإلكتروني" required />
              <button type="submit" className="newsletter-submit-btn">اشترك الآن</button>
            </form>
            
            <div className="newsletter-footer">
              <div className="user-avatars">
                <img src="https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=100&h=100&fit=crop&crop=face" alt="User" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="User" />
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" alt="User" />
              </div>
              <div className="newsletter-footer-info">
                <p>
                  انضم لـ <strong>+10,000</strong> مصور <span className="footer-dot">●</span> بدون إزعاج 
                  <span className="break-mobile"> <span className="footer-dot hidden-mobile">●</span> إلغاء الاشتراك في أي وقت</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
