import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar-container">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo-container">
            <img src={logo} alt="عدسة" className="logo-img" />
            <div className="logo-text">
              <h2>عدسة</h2>
            </div>
          </Link>
          
          <div className="nav-links-wrapper">
            <ul className="nav-links">
              <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>الرئيسية</Link></li>
              <li><Link to="/blog" className={location.pathname.startsWith('/blog') ? 'active' : ''}>المدونة</Link></li>
              <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>من نحن</Link></li>
            </ul>
          </div>

          <div className="nav-actions">
            <div className="search-icon-wrapper">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
            </div>
            <Link to="/blog" className="btn-primary">ابدأ القراءة</Link>
            
            <div className="mobile-menu-toggle" onClick={toggleMenu}>
              <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu-dropdown ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-inner">
          <div className="mobile-links-container">
            <ul className="mobile-nav-links">
              <li>
                <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={toggleMenu}>
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/blog" className={location.pathname.startsWith('/blog') ? 'active' : ''} onClick={toggleMenu}>
                  المدونة
                </Link>
              </li>
              <li>
                <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={toggleMenu}>
                  من نحن
                </Link>
              </li>
            </ul>
          </div>

          <div className="mobile-menu-footer">
            <Link to="/blog" className="btn-primary full-width" onClick={toggleMenu}>ابدأ القراءة</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
