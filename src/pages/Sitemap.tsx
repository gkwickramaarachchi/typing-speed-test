
import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const Sitemap = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Sitemap</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Main Pages</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-4 h-4 inline-block bg-blue-200 rounded-full mr-3"></span>
                <Link to="/" className="text-blue-600 hover:underline">Home</Link>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 inline-block bg-blue-200 rounded-full mr-3"></span>
                <Link to="/typing-test" className="text-blue-600 hover:underline">Typing Test</Link>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 inline-block bg-blue-200 rounded-full mr-3"></span>
                <Link to="/about" className="text-blue-600 hover:underline">About Us</Link>
              </li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Resources</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-4 h-4 inline-block bg-green-200 rounded-full mr-3"></span>
                <Link to="/help" className="text-blue-600 hover:underline">Help</Link>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 inline-block bg-green-200 rounded-full mr-3"></span>
                <Link to="/blog" className="text-blue-600 hover:underline">Blog</Link>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 inline-block bg-green-200 rounded-full mr-3"></span>
                <Link to="/help#keyboard" className="text-blue-600 hover:underline">Keyboard Guide</Link>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 inline-block bg-green-200 rounded-full mr-3"></span>
                <Link to="/help#tips" className="text-blue-600 hover:underline">Typing Tips</Link>
              </li>
            </ul>
          </section>
        </div>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Legal Information</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-4 h-4 inline-block bg-red-200 rounded-full mr-3"></span>
                <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 inline-block bg-red-200 rounded-full mr-3"></span>
                <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 inline-block bg-red-200 rounded-full mr-3"></span>
                <Link to="/disclaimer" className="text-blue-600 hover:underline">Disclaimer</Link>
              </li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Extras</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-4 h-4 inline-block bg-purple-200 rounded-full mr-3"></span>
                <Link to="/sitemap" className="text-blue-600 hover:underline">Sitemap</Link>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 inline-block bg-purple-200 rounded-full mr-3"></span>
                <a href="/sitemap.xml" className="text-blue-600 hover:underline flex items-center">
                  XML Sitemap
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
