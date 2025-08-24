import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../assets/images/logo.png";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useContext(AuthContext); // get logged-in user

  // Separate links for public and authenticated users
  const publicLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const authLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Predictions", path: "/predictions" },
    { name: "Upload Data", path: "/upload" },
    { name: "Simulation", path: "/simulation" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
  ];

  const linkClasses = ({ isActive }) =>
    `relative px-2 py-1 font-medium transition-all duration-300 ${
      isActive
        ? "text-white after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-500"
        : "text-slate-300 hover:text-white hover:after:content-[''] hover:after:absolute hover:after:-bottom-1 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-blue-500"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur bg-gray-900/95">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <motion.img
            src={logo}
            alt="Logo"
            className="h-10 w-10 rounded-xl shadow-lg object-cover"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <span className="text-lg md:text-xl font-semibold text-white">
            AI-Powered Predictive Maintenance
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {(user ? authLinks : publicLinks).map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClasses}>
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-gray-900/95 border-t border-white/10 px-4 py-6 flex flex-col gap-4"
          >
            {(user ? authLinks : publicLinks).map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-2 py-1 font-medium transition-all duration-300 ${
                    isActive ? "text-blue-400" : "text-slate-300 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
