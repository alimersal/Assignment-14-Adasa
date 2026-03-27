import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-column info-column">
            <Link to="/" className="footer-logo-link">
              <img src={logo} alt="عدسة" className="logo-img" />
              <div className="logo-text">
                <h2>عدسة</h2>
              </div>
            </Link>
            <p className="footer-desc">
              مدونة متخصصة في فن التصوير الفوتوغرافي، نشارك معكم أسرار المحترفين ونصائح عملية لتطوير مهاراتكم.
            </p>
            <div className="social-links-modern">
               <a href="#" className="social-box"><i className="fa-brands fa-youtube"></i></a>
               <a href="#" className="social-box"><i className="fa-brands fa-linkedin-in"></i></a>
               <a href="#" className="social-box"><i className="fa-brands fa-github"></i></a>
               <a href="#" className="social-box"><i className="fa-brands fa-x-twitter"></i></a>
            </div>
          </div>

          {/* Links */}
          <div className="footer-column">
            <h4 className="footer-title">استكشف</h4>
            <ul className="footer-links-list">
              <li><Link to="/">الرئيسية</Link></li>
              <li><Link to="/blog">المدونة</Link></li>
              <li><Link to="/about">من نحن</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-column">
            <h4 className="footer-title">التصنيفات</h4>
            <ul className="footer-links-list">
              <li><Link to="/blog?category=إضاءة">إضاءة</Link></li>
              <li><Link to="/blog?category=بورتريه">بورتريه</Link></li>
              <li><Link to="/blog?category=مناظر طبيعية">مناظر طبيعية</Link></li>
              <li><Link to="/blog?category=تقنيات">تقنيات</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-column newsletter-column">
            <h4 className="footer-title">ابقى على اطلاع</h4>
            <p className="newsletter-subtitle">اشترك للحصول على أحدث المقالات والتحديثات.</p>
            <div className="footer-newsletter-form">
              <input type="email" placeholder="أدخل بريدك الإلكتروني" />
              <button className="footer-subscribe-btn">اشترك</button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom-bar">
          <div className="bottom-right">
            <p>© 2026 عدسة. صنع بكل <i className="fa-solid fa-heart" style={{color: '#f97316'}}></i> جميع الحقوق محفوظة.</p>
          </div>
          <div className="bottom-left">
             <Link to="/privacy">سياسة الخصوصية</Link>
             <Link to="/terms">شروط الخدمة</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
