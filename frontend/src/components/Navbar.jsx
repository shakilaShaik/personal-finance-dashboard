// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart2,
  FileText,
  Menu,
  LogOut,
  UserPlus,
  LogIn,
} from "lucide-react";
import { useState } from "react";
import {RxPlus} from "react-icons/rx"
import { CiMoneyCheck1 } from "react-icons/ci";
const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Desktop Nav Items
  const desktopNav = [
    { name: "Home", path: "/home" },
    { name: "Sign In", path: "/signin" },
    { name: "Sign Up", path: "/signup" },
  ];

  // Mobile Icon Nav Items
  const mobileNav = [
   
    { name: "Add Log", path: "/add-log", icon: <RxPlus size={24} /> },
    { name: "Analytics", path: "/analytics", icon: <BarChart2 size={24} /> },
     { name: "show Log", path: "/show-logs", icon: < CiMoneyCheck1 size={24}/>}
  ];

  // Dropdown Items (Mobile)
  const dropdownItems = [
    { name: "Sign In", path: "/signin", icon: <LogIn size={18} /> },
    { name: "Sign Up", path: "/signup", icon: <UserPlus size={18} /> },
    { name: "Logout", path: "/logout", icon: <LogOut size={18} /> },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* Brand for desktop */}
        <Link
          to="/home"
          className="text-2xl font-bold  hidden md:block"
        >
          FinTrack
        </Link>

        {/* Home icon for mobile */}
        <Link to="/home" className="md:hidden text-indigo-600">
          <Home size={28} />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 text-gray-700 text-lg font-medium">
          {desktopNav.map(({ name, path }) => (
            <li key={name}>
              <Link
                to={path}
                className={`${
                  location.pathname === path
                    ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                    : "hover:text-indigo-500"
                }`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation Icons */}
        <ul className="flex md:hidden gap-6 items-center">
          {mobileNav.map(({ name, path, icon }) => (
            <li key={name}>
              <Link
                to={path}
                className={`${
                  location.pathname === path
                    ? "text-indigo-600"
                    : "text-gray-700 hover:text-indigo-500"
                }`}
              >
                {icon}
              </Link>
            </li>
          ))}

          {/* Dropdown Menu Button */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-indigo-500"
            >
              <Menu size={24} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg">
                <ul>
                  {dropdownItems.map(({ name, path, icon }) => (
                    <li key={name}>
                      <Link
                        to={path}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                        onClick={() => setMenuOpen(false)}
                      >
                        {icon}
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
