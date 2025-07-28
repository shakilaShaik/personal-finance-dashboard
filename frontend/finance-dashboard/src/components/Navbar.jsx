// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Sign In", path: "/signin" },
    { name: "Sign Up", path: "/signup" },
  ];

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-teal-600">
          FinTrack
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 text-gray-700 text-lg font-medium">
          {navItems.map(({ name, path }) => (
            <li key={name}>
              <Link
                to={path}
                className={`${
                  location.pathname === path
                    ? "text-teal-600 border-b-2 border-teal-600 pb-1"
                    : "hover:text-teal-500"
                }`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4">
          <ul className="space-y-2 text-gray-700 text-base font-medium">
            {navItems.map(({ name, path }) => (
              <li key={name}>
                <Link
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 ${
                    location.pathname === path
                      ? "text-teal-600 font-semibold"
                      : "hover:text-teal-500"
                  }`}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
