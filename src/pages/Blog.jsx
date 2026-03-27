import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const categories = ['جميع المقالات', 'إضاءة', 'بورتريه', 'مناظر طبيعية', 'تقنيات', 'معدات'];

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('جميع المقالات');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const location = useLocation();

  // update filters from URL
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Read category and page from URL
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    const pageParam = params.get('page');
    if (pageParam) {
      setCurrentPage(parseInt(pageParam));
    }

    fetch(`${import.meta.env.BASE_URL}posts.json`)
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts || data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, [location.search]);

  const filteredPosts = posts.filter(post => {
    const catToMatch = selectedCategory === 'جميع المقالات' ? 'الكل' : selectedCategory;
    const matchCategory = catToMatch === 'الكل' || post.category === catToMatch;
    const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="blog-page">
      {/* Header */}
      <section className="blog-header">
        <div className="grid-overlay"></div>
        <div className="container">
          <div className="hero-content-centered">
            <span className="blog-badge-small">
              <i className="fa-solid fa-layer-group"></i> مدونتنا
            </span>
            <h1>استكشف <span>مقالاتنا</span></h1>
            <p>اكتشف الدروس والرؤى وأفضل الممارسات للتطوير الحديث</p>
          </div>
        </div>
      </section>

      <section className="blog-main-section">
        <div className="container">
          {/* Top Filter Bar */}
          <div className="blog-filters-container">
            <div className="filters-right-side">
              <div className="search-wrapper-modern">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input 
                  type="text" 
                  placeholder="ابحث في المقالات..." 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <div className="category-chips-wrapper">
                {categories.map((cat, index) => (
                  <button 
                    key={index} 
                    className={`cat-chip ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sub-toolbar */}
          <div className="blog-toolbar">
            <div className="toolbar-right">
              <p className="posts-count">عرض <span>{filteredPosts.length}</span> مقالات</p>
            </div>
            <div className="toolbar-left">
              <div className="view-switcher-modern">
                <button 
                  className={viewMode === 'grid' ? 'active' : ''} 
                  onClick={() => setViewMode('grid')}
                >
                  <i className="fa-solid fa-table-cells-large"></i>
                </button>
                <button 
                  className={viewMode === 'list' ? 'active' : ''} 
                  onClick={() => setViewMode('list')}
                >
                  <i className="fa-solid fa-bars"></i>
                </button>
                
              </div>
            </div>
          </div>

          {loading ? (
            <div className="loading-container">جاري التحميل...</div>
          ) : filteredPosts.length === 0 ? (
            <div className="no-results-container">
              <i className="fa-regular fa-face-frown"></i>
              <h3>لا توجد نتائج</h3>
              <p>جرّب كلمات بحث أخرى أو تصنيفاً مختلفاً</p>
            </div>
          ) : (
            <>
              <div className={`blog-posts-display ${viewMode}-view`}>
                {currentPosts.map(post => (
                  <Link to={`/blog/${post.id}`} key={post.id} className="blog-article-card">
                    <div className="article-card-thumb">
                      <img src={post.image} alt={post.title} />
                      <span className="thumb-category-badge">{post.category}</span>
                    </div>
                    <div className="article-card-info">
                        <div className="article-top-meta">
                          <span className="meta-item"><i className="fa-regular fa-clock"></i> {post.readTime} </span>
                          <span className="meta-sep">•</span>
                          <span className="meta-item">
                            {new Date(post.date).toLocaleDateString('ar-EG', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      <h3 className="article-card-title">{post.title}</h3>
                      <p className="article-card-excerpt">{post.excerpt}</p>
                      
                      <div className="article-card-footer">
                        <div className="article-author-small">
                          <img src={post.author?.avatar} alt={post.author?.name} />
                          <div className="author-text">
                            <span className="author-name">{post.author?.name}</span>
                            <span className="author-role">{post.author?.role}</span>
                          </div>
                        </div>
                        <div className="article-arrow-btn">
                          <i className="fa-solid fa-chevron-left"></i>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination Modern */}
              {totalPages > 1 && (
                <div className="blog-pagination-wrapper">
                  <div className="pagination-controls">
                    <button 
                      className="pag-btn prev" 
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      <i className="fa-solid fa-chevron-right"></i>
                    </button>
                    
                    <div className="page-numbers">
                      {[...Array(totalPages)].map((_, index) => (
                        <button 
                          key={index} 
                          className={`num-btn ${currentPage === index + 1 ? 'active' : ''}`}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                    
                    <button 
                      className="pag-btn next" 
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <i className="fa-solid fa-chevron-left"></i>
                    </button>
                  </div>
                  <p className="pagination-text">صفحة {currentPage} من {totalPages}</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
