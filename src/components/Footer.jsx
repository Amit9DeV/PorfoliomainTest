import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Code,
  Terminal,
  Star,
} from "iconoir-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/About" },
  { name: "Projects", href: "/Projects" },
  { name: "Contact", href: "/Contact" },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Amit9Dev",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/amit-ram-b8384a24b/",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:cloud15333@gmail.com",
    icon: Mail,
  },
];

// Terminal text line component
const TerminalLine = ({ label, value, icon: Icon, href }) => {
  const content = (
    <div className="flex items-start gap-3 group">
      <div className="flex items-center">
        <span className="text-blue-500 font-mono text-xs mr-1">$</span>
        <span className="text-green-400 font-mono text-xs">{label} :</span>
      </div>
      <div className="text-gray-300 font-mono text-xs flex-1">
        {value}
        {href && (
          <ArrowUp 
            className="inline-block ml-2 w-3 h-3 rotate-45 text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-1 group-hover:translate-x-0" 
          />
        )}
      </div>
    </div>
  );

  return href ? (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block hover:bg-blue-900/20 px-2 py-1 rounded-sm transition-colors duration-200"
    >
      {content}
    </a>
  ) : (
    <div className="px-2 py-1">
      {content}
    </div>
  );
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Current date formatted for terminal-style display
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  const timeString = today.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <footer className="relative mt-20 border-t border-blue-900/30 bg-black/40 backdrop-blur-lg">
      {/* Terminal Decoration Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
      
      {/* Grid accent lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Terminal Header Bar */}
        <div className="mb-8 rounded-t-lg bg-blue-900/30 border border-blue-500/20 overflow-hidden">
          <div className="px-4 py-2 flex items-center">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-white font-mono text-sm flex-1 text-center">portfolio-footer ~ root@amit-ram</div>
            <div className="text-gray-400 font-mono text-xs">{dateString} {timeString}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="font-mono"
            >
              <div className="text-blue-400 mb-1 text-xs">$ whoami</div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Amit Ram
              </h2>
              <div className="h-px w-full bg-gradient-to-r from-blue-500/5 via-blue-500/20 to-blue-500/5 my-3" />
              <div className="text-blue-400 text-xs mb-2">$ cat about.txt</div>
              <p className="text-gray-400 text-sm border-l-2 border-blue-800/30 pl-3 font-sans">
                Full-stack developer specializing in MERN stack development and modern web applications.
              </p>
            </motion.div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <div className="text-blue-400 font-mono text-xs mb-2">$ ls -la /navigation</div>
            <div className="border border-blue-900/30 rounded-md bg-black/20 p-3">
              <ul className="space-y-1 font-mono">
                {navigation.map((item, index) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) => 
                        `flex items-center text-xs hover:bg-blue-900/20 px-2 py-1 rounded-sm transition-colors ${
                          isActive ? "text-blue-400" : "text-gray-400"
                        }`
                      }
                    >
                      <span className="text-blue-500 mr-2">
                        {index.toString().padStart(2, '0')}
                      </span>
                      <Code className="w-3 h-3 mr-2 text-blue-400" />
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="text-blue-400 font-mono text-xs mb-2">$ contact --list</div>
            <div className="border border-blue-900/30 rounded-md bg-black/20 p-3">
              <div className="space-y-1">
                <TerminalLine 
                  label="phone" 
                  value="+919334135467" 
                  href="tel:+919334135467" 
                />
                <TerminalLine 
                  label="email" 
                  value="cloud15333@gmail.com" 
                  href="mailto:cloud15333@gmail.com" 
                />
                <TerminalLine 
                  label="location" 
                  value="Bihar, India" 
                  href="https://goo.gl/maps/VJqt9kfGVnJ2RKUS6" 
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <div className="text-blue-400 font-mono text-xs mb-2">$ social --connect</div>
            <div className="border border-blue-900/30 rounded-md bg-black/20 p-3 flex flex-col gap-4">
              <div className="flex justify-between">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="w-10 h-10 rounded-md bg-blue-900/20 border border-blue-500/20 flex items-center justify-center group-hover:border-blue-400 transition-colors">
                      <item.icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
              
              <div className="text-xs font-mono text-gray-500 border-t border-blue-900/20 pt-3 mt-1">
                <div className="flex items-center">
                  <Terminal className="w-3 h-3 mr-2 text-blue-500" />
                  <span>Status: <span className="text-green-400">Available for hire</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-blue-900/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs font-mono flex items-center gap-1">
              <span className="text-blue-500">$</span> echo "© 2024 Amit Ram. Built with
              <Star className="w-3 h-3 text-yellow-500 mx-1" />
              + React + Framer Motion"
            </p>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-md bg-blue-900/20 border border-blue-500/20 flex items-center justify-center hover:bg-blue-900/40 transition-colors group"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
            </button>
          </div>
        </div>
        
        {/* Terminal prompt line */}
        <div className="mt-6 flex items-center font-mono text-xs">
          <span className="text-green-400">visitor@portfolio:</span>
          <span className="text-blue-400">~$</span>
          <div className="w-2 h-4 bg-blue-500 ml-2 animate-pulse" />
        </div>
      </div>
    </footer>
  );
}
