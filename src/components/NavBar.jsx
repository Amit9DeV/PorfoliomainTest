import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/About" },
  { name: "Projects", href: "/Projects" },
  { name: "Contact", href: "/Contact" },
];

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <div className="relative group">
                    <span className="relative z-10">{item.name}</span>
                    {isActive ? (
                      <motion.div
                        layoutId="navunderline"
                        className="absolute left-0 right-0 h-0.5 -bottom-1 bg-gradient-to-r from-blue-600 to-blue-400"
                      />
                    ) : (
                      <div className="absolute left-0 right-0 h-0.5 -bottom-1 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 transform scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-300" />
                    )}
                  </div>
                )}
              </NavLink>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Drawer>
              <DrawerTrigger className="relative p-2 rounded-lg hover:bg-blue-900/20 transition-all duration-300 group">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-900/0 to-blue-600/0 group-hover:from-blue-900/10 group-hover:to-blue-600/10 transition-all duration-300" />
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </DrawerTrigger>
              <DrawerContent className="h-[90vh] backdrop-blur-2xl bg-black/95 border-t border-blue-900/30">
                <div className="flex flex-col items-center justify-center h-full space-y-8">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        `relative text-xl font-medium transition-all duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-gray-400 hover:text-white"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <div className="relative group px-6 py-2">
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-900/0 to-blue-600/0 group-hover:from-blue-900/10 group-hover:to-blue-600/10 transition-all duration-300" />
                          <span className="relative z-10">{item.name}</span>
                          {isActive && (
                            <motion.div
                              layoutId="mobilenavunderline"
                              className="absolute left-0 right-0 h-0.5 -bottom-1 bg-gradient-to-r from-blue-600 to-blue-400"
                            />
                          )}
                        </div>
                      )}
                    </NavLink>
                  ))}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
