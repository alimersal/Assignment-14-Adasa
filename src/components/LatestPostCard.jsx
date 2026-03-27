import { Link } from 'react-router-dom';

const LatestPostCard = ({ post }) => {
  return (
    <Link to={`/blog/${post.id}`} className="latest-post-card">
      <div className="card-image-wrapper">
        <img src={post.image} alt={post.title} className="card-image" />
        <span className="card-category-badge">{post.category}</span>
      </div>
      
      <div className="card-body">
        <div className="card-meta">
          <span className="read-time">
            <i className="fa-regular fa-clock"></i> {post.readTime}
          </span>
          <span className="separator">•</span>
          <span className="post-date">
            {new Date(post.date).toLocaleDateString('ar-EG', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </span>
        </div>
        
        <h3 className="card-title">{post.title}</h3>
        <p className="card-excerpt">{post.excerpt}</p>
        
        <div className="card-footer">
          <div className="author-info">
            <img src={post.author.avatar} alt={post.author.name} className="author-avatar" />
            <div className="author-text">
              <span className="author-name">{post.author.name}</span>
              <span className="author-role">{post.author.role}</span>
            </div>
          </div>
          <div className="card-arrow">
            <i className="fa-solid fa-chevron-left"></i>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LatestPostCard;
