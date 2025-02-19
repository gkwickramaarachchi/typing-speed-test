
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "bg-purple-700 text-white" : "text-gray-300 hover:bg-purple-600 hover:text-white";
  };

  return (
    <nav className="bg-purple-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              GigsTyping
            </Link>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/")}`}
              >
                Home
              </Link>
              <Link
                to="/help"
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/help")}`}
              >
                Help
              </Link>
              <Link
                to="/blog"
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/blog")}`}
              >
                Blog
              </Link>
              <Link
                to="/about"
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/about")}`}
              >
                About
              </Link>
            </div>
          </div>
          <Link
            to="/typing-test"
            className="px-4 py-2 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 transition-colors"
          >
            Try Typing Test
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
