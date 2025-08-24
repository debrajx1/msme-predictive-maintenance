// LandingNavbar.jsx
import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { HiMenu, HiX } from "react-icons/hi";

const LandingNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Features", to: "features" },
    { label: "Achievements", to: "achievements" },
    { label: "Clients", to: "clients" },
    { label: "Plans", to: "plans" },
    { label: "Testimonials", to: "testimonials" },
    { label: "FAQ", to: "faq" },
  ];

  return (
    <nav className="fixed w-full z-50 backdrop-blur-md bg-gradient-to-r from-blue-700 to-purple-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-20">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          MSME AI
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <li key={link.to} className="cursor-pointer hover:text-yellow-400 transition-colors">
              <ScrollLink to={link.to} smooth={true} offset={-100} duration={600}>
                {link.label}
              </ScrollLink>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col bg-[#0f1115] text-white w-full absolute top-20 left-0 py-6 gap-6 items-center shadow-lg">
          {links.map((link) => (
            <li key={link.to} className="cursor-pointer hover:text-yellow-400 transition-colors">
              <ScrollLink
                to={link.to}
                smooth={true}
                offset={-100}
                duration={600}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </ScrollLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default LandingNavbar;
