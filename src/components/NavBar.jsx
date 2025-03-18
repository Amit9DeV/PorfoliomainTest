import { useState, useEffect, memo, useCallback } from "react";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Code } from "iconoir-react";
import { Link } from "react-router-dom";
import { Menu, X } from "iconoir-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/About" },
  { name: "Projects", href: "/Projects" },
  { name: "Contact", href: "/Contact" },
];

// Terminal header component for desktop navigation
const TerminalTab = ({ children, isActive }) => (
  <div className="relative group">
    <div className={`absolute top-0 inset-x-0 h-0.5 ${isActive ? "bg-blue-500" : "bg-transparent group-hover:bg-blue-500/40"} transition-colors duration-300`}></div>
    <div className="flex items-center space-x-1.5 px-2 py-1">
      {isActive && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
      )}
      {children}
    </div>
  </div>
);

const NavLink = memo(({ to, children, isActive }) => (
  <Link
    to={to}
    className={`relative px-4 py-2 text-sm font-medium transition-colors ${
      isActive ? "text-blue-400" : "text-gray-300 hover:text-white"
    }`}
  >
    {children}
    {isActive && (
      <motion.div
        layoutId="activeNav"
        className="absolute inset-0 bg-blue-500/10 rounded-lg"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
  </Link>
));

NavLink.displayName = "NavLink";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [location, closeMenu]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-x-0 top-0 z-50 ${
        isScrolled 
          ? "backdrop-blur-xl bg-black/80 border-b border-blue-900/20 shadow-lg shadow-black/5" 
          : "bg-transparent"
      } transition-all duration-300`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Logo Background Effects */}
            <motion.div 
              className="absolute -inset-2 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 rounded-lg blur-xl"
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [0.95, 1.05, 0.95],
                background: [
                  "linear-gradient(45deg, #1e3a8a, #2563eb, #1e3a8a)",
                  "linear-gradient(180deg, #2563eb, #1e3a8a, #2563eb)",
                  "linear-gradient(225deg, #1e3a8a, #2563eb, #1e3a8a)"
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-blue-900/30 rounded-lg"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(30,58,138,0.3) 0%, rgba(37,99,235,0.3) 100%)",
                  "linear-gradient(180deg, rgba(37,99,235,0.3) 0%, rgba(30,58,138,0.3) 100%)",
                  "linear-gradient(225deg, rgba(30,58,138,0.3) 0%, rgba(37,99,235,0.3) 100%)",
                ],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            {/* Logo Container */}
            <div className="relative flex items-center space-x-1">
              {/* Logo Symbol */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div 
                  className="relative z-10 px-2.5 py-1 rounded-lg border border-blue-500/50 bg-black/50 backdrop-blur-sm"
                  animate={{
                    borderColor: ["rgba(59,130,246,0.5)", "rgba(37,99,235,0.5)", "rgba(59,130,246,0.5)"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.span 
                    className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent"
                    animate={{
                      backgroundImage: [
                        "linear-gradient(to right, #ffffff, #dbeafe, #bfdbfe)",
                        "linear-gradient(to right, #bfdbfe, #ffffff, #dbeafe)",
                        "linear-gradient(to right, #dbeafe, #bfdbfe, #ffffff)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    A
                  </motion.span>
                </motion.div>
              </div>
              
              {/* Logo Text */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-blue-400/30 rounded-lg blur-sm"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [0.95, 1.05, 0.95]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.span 
                  className="relative text-2xl font-bold bg-gradient-to-r from-white via-white to-blue-200 bg-clip-text text-transparent"
                  animate={{
                    backgroundImage: [
                      "linear-gradient(to right, #ffffff, #ffffff, #bfdbfe)",
                      "linear-gradient(to right, #bfdbfe, #ffffff, #ffffff)",
                      "linear-gradient(to right, #ffffff, #bfdbfe, #ffffff)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  R
                </motion.span>
              </div>
            </div>

            {/* Continuous Shine Effect */}
            <motion.div
              className="absolute inset-0"
              initial={{ x: "-100%" }}
              animate={{ x: ["100%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
            >
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-12" />
            </motion.div>
          </motion.div>

          {/* Desktop Navigation - Terminal Style */}
          <div className="hidden md:flex items-center">
            {/* Terminal Header Bar */}
            <div className="bg-black/40 backdrop-blur-md rounded-lg border border-blue-500/30 flex items-center overflow-hidden">
              <div className="flex space-x-1.5 px-3 py-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              
              <div className="flex items-center">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    isActive={location.pathname === item.href}
                  >
                    <div className="flex items-center space-x-1.5">
                      <Code className={`w-4 h-4 ${location.pathname === item.href ? "text-blue-400" : "text-gray-500"}`} />
                      <span className="font-mono text-sm">{item.name.toLowerCase()}.sh</span>
                    </div>
                  </NavLink>
                ))}
              </div>
              
              <div className="px-3 py-2.5 font-mono text-xs text-gray-500">
                <div className="flex items-center gap-2 text-blue-400">
                  <span className="animate-pulse">●</span>
                  <span>visitor@portfolio</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button - Terminal Style */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="relative p-2 rounded-lg border border-blue-500/30 bg-black/30 backdrop-blur-sm hover:bg-blue-900/20 transition-all duration-300 group"
              aria-label="Toggle menu"
            >
              <div className="font-mono text-xs flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">menu</span>
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Menu - Terminal Style */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
              onClick={closeMenu}
            />
            
            {/* Side Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] z-50 bg-black/95 border-l border-blue-900/30"
            >
              {/* Terminal Header */}
              <div className="px-4 py-3 border-b border-blue-900/30 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-white font-mono text-sm">navigation.sh</span>
                </div>
                <button 
                  onClick={closeMenu}
                  className="text-gray-400 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              {/* Menu Content */}
              <div className="p-5 h-full">
                <div className="font-mono text-xs text-blue-400 mb-4">
                  $ cat navigation.sh | bash
                </div>
                
                <div className="space-y-1">
                  {navigation.map((item, index) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      isActive={location.pathname === item.href}
                    >
                      <div className="flex items-center">
                        <span className="text-blue-400 mr-2">$</span>
                        <span>cd ~/{item.name.toLowerCase()}</span>
                      </div>
                      {location.pathname === item.href && (
                        <div className="mt-1 pl-5 text-xs text-green-400">
                          # Current location
                          <div className="w-2 h-4 bg-blue-500 inline-block ml-1 animate-pulse align-middle" />
                        </div>
                      )}
                    </NavLink>
                  ))}
                </div>
                
                {/* Terminal Footer */}
                <div className="absolute bottom-4 left-5 right-5 font-mono text-xs text-gray-500">
                  <div className="flex justify-between items-center">
                    <div className="text-green-400">visitor@portfolio:~$</div>
                    <div className="text-blue-400 animate-pulse">● online</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
