// components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white px-6 py-3 flex justify-between items-center shadow">
      <Link to="/" className="text-xl font-bold">
        Professionals Hub
      </Link>
      <Link to="/create" className="bg-white text-blue-700 px-4 py-1 rounded hover:bg-gray-100">
        + New Post
      </Link>
    </nav>
  );
};

export default Navbar;
