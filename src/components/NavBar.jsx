import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Book } from "lucide-react";
import { useIsDesktop } from "../hooks/usePerformance";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const NavBar = () => {
  const isDesktop = useIsDesktop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-2 md:py-4" : "py-4 md:py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div
            className={`flex items-center justify-between px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300 ${isScrolled
              ? "bg-black/70 backdrop-blur-xl border border-white/10 shadow-lg shadow-blue-900/50"
              : "bg-transparent"
              }`}
          >
            {/* Logo */}
            <NavLink to="/" className="text-xl font-bold tracking-tighter text-white z-50">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                AMIT
              </span>
              .DEV
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={`relative px-5 py-2 text-sm font-medium text-gray-300 transition-colors rounded-full ${isDesktop ? 'hover:text-white' : ''
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white/10 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {item.name === "Blog" && <Book className="w-4 h-4" />}
                      {item.name}
                    </span>
                  </NavLink>
                );
              })}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white z-50 relative min-touch-target"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-0 z-40 md:hidden ${isDesktop ? 'bg-black/60 backdrop-blur-xl' : 'bg-black/90'
              }`}
          >
            {/* Gradient Background Blobs - Desktop only for performance */}
            {isDesktop && (
              <>
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
              </>
            )}

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-col h-full justify-center px-8"
            >
              <div className="space-y-6">
                {navigation.map((item, i) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <motion.div
                      key={item.name}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        show: { opacity: 1, x: 0 },
                      }}
                    >
                      <NavLink
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group flex items-center gap-4 text-3xl md:text-4xl font-bold tracking-tight transition-all duration-300 min-touch-target ${isActive
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                          : "text-white/50 active:text-white"
                          }`}
                      >
                        <span className="text-sm font-mono text-white/30 mr-2">0{i + 1}</span>
                        {item.name}
                        {isActive && (
                          <motion.div
                            layoutId="mobile-indicator"
                            className="w-2 h-2 rounded-full bg-blue-400"
                          />
                        )}
                      </NavLink>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile Footer Info */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { delay: 0.5 } },
                }}
                className="absolute bottom-12 left-8 right-8 pt-8 border-t border-white/10"
              >
                <p className="text-gray-500 text-sm mb-4">Connect with me</p>
                <div className="flex gap-4">
                  <a href="#" className="text-white/60 hover:text-blue-400 transition-colors min-touch-target">GitHub</a>
                  <a href="#" className="text-white/60 hover:text-blue-400 transition-colors min-touch-target">LinkedIn</a>
                  <a href="#" className="text-white/60 hover:text-blue-400 transition-colors min-touch-target">Email</a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
