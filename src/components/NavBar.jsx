import { useState, useCallback, memo } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

// Memoized NavItem component
const NavItem = memo(({ name, href, isActive }) => (
  <NavLink
    to={href}
    className={`relative group font-medium transition duration-300 ${
      isActive ? "text-blue-400" : "text-gray-300"
    }`}
  >
    <span className="text-blue-400 mr-1">$</span>
    cd ~/{name.toLowerCase()}
    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
    {isActive && (
      <span className="ml-2 text-green-400 text-xs animate-pulse"># current</span>
    )}
  </NavLink>
));

// Memoized Logo component
const Logo = memo(() => (
  <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-widest drop-shadow-sm hover:scale-105 transition">
    <span className="inline-block animate-pulse">{"<"}</span>
    AMIT.DEV
    <span className="inline-block animate-pulse">{"/>"}</span>
  </Link>
));

// Memoized mobile menu
const MobileMenu = memo(({ isOpen, navigation, location, onItemClick }) => {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden mt-4 px-4 space-y-4 bg-[#0d1117] rounded-lg shadow-md border border-blue-500/30 transition-all duration-300 ease-in-out">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          onClick={onItemClick}
          className={`block px-3 py-3 rounded-md transition duration-200 hover:bg-blue-500/10 ${
            location.pathname === item.href ? "text-blue-400" : "text-gray-300"
          }`}
        >
          <div className="flex items-center">
            <span className="text-blue-400 mr-2">$</span>
            cd ~/{item.name.toLowerCase()}
          </div>
          {location.pathname === item.href && (
            <div className="pl-6 text-xs text-green-400 mt-1 animate-pulse">
              # current
            </div>
          )}
        </Link>
      ))}
    </div>
  );
});

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <nav className="w-full py-4 px-4 sm:px-8 bg-[#0d1117] text-white fixed top-0 z-50 shadow-lg border-b border-blue-900/20">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Logo />

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          {navigation.map((item) => (
            <NavItem
              key={item.name}
              name={item.name}
              href={item.href}
              isActive={location.pathname === item.href}
            />
          ))}
        </div>

        {/* Mobile Icon */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none text-blue-400"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMenuOpen}
        navigation={navigation}
        location={location}
        onItemClick={closeMenu}
      />
    </nav>
  );
};

export default memo(Navbar);
