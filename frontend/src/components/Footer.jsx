// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-12 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo and Summary */}
        <div>
          <h1 className="text-2xl font-bold text-teal-600">FinTrack</h1>
          <p className="mt-2 text-sm">
            Your smart assistant to manage daily expenses and track financial
            health.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-teal-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/signin" className="hover:text-teal-500">
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-teal-500">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-3">Features</h2>
          <ul className="space-y-2 text-sm">
            <li className="text-gray-600">Expense Tracking</li>
            <li className="text-gray-600">Analytics & Reports</li>
            <li className="text-gray-600">AI Budget Suggestions</li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-3">Connect</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <a
                href="mailto:support@fintrack.com"
                className="hover:text-teal-500"
              >
                support@fintrack.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Github size={16} />
              <a
                href="https://github.com/your-org/fintrack"
                target="_blank"
                className="hover:text-teal-500"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white text-center text-sm py-4 border-t text-gray-500">
        © {new Date().getFullYear()} FinTrack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
