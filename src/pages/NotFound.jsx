import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <h1>404</h1>
        <h2>عذراً، الصفحة غير موجودة!</h2>
        <p style={{color: 'var(--text-muted)', margin: '20px 0'}}>
          يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <Link to="/" className="btn-primary">
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
