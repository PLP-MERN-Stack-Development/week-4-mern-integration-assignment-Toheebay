import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h2>404 - Page Not Found</h2>
    <p>Sorry, the page you're looking for doesn't exist.</p>
    <Link to="/">Go to Home</Link>
  </div>
);

export default NotFound;
