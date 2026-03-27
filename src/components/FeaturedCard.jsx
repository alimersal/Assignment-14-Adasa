import { Link } from 'react-router-dom';

const FeaturedCard = ({ post }) => {
  const formattedDate = new Date(post.date).toLocaleDateString('ar-EG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Link to={`/blog/${post.id}`} className="featured-card">
      <div className="featured-card-image">
        <img src={post.image} alt={post.title} />
        <span className="featured-badge-star">
          <i className="fa-solid fa-star"></i> مميز
        </span>
      </div>

      <div className="featured-card-content">
        <div className="featured-card-top-meta">
          <span className="featured-category-badge">{post.category}</span>
          <span className="featured-read-time">
            <i className="fa-regular fa-clock"></i> {post.readTime}
          </span>
        </div>

        <h3 className="featured-card-title">{post.title}</h3>
        <p className="featured-card-excerpt">{post.excerpt}</p>

        <div className="featured-card-footer">
          <div className="featured-author-info">
            <div className="featured-author-avatar-wrapper">
              <img
                src={post.author?.avatar}
                alt={post.author?.name}
                className="featured-author-avatar"
              />
              <span className="avatar-status-dot"></span>
            </div>
            <div className="featured-author-text">
              <span className="featured-author-name">{post.author?.name}</span>
              <span className="featured-author-date">{formattedDate}</span>
            </div>
          </div>
          <span className="featured-read-link">
            اقرأ المقال <i className="fa-solid fa-arrow-left"></i>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedCard;
