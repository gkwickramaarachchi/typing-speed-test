
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/help" className="hover:text-white">Help</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              <li><Link to="/typing-test" className="hover:text-white">Typing Test</Link></li>
              <li><Link to="/help#keyboard" className="hover:text-white">Keyboard Guide</Link></li>
              <li><Link to="/help#tips" className="hover:text-white">Typing Tips</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="hover:text-white">Disclaimer</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Sitemap</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/sitemap" className="hover:text-white">Sitemap</Link></li>
              <li><a href="/sitemap.xml" className="hover:text-white">XML Sitemap</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} GigsTyping. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
