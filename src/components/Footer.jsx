import { NavLink } from "react-router-dom";
import { Github, Linkedin, Mail, Twitter, ArrowUp } from "iconoir-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/About" },
  { name: "Projects", href: "/Projects" },
  { name: "Contact", href: "/Contact" },
  { name: "Admin", href: "/Admin" },
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

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Amit Ram</h2>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Full-stack developer focused on building beautiful, performance-optimized, and user-centric applications.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-4 md:items-center">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2 md:text-center">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `text-sm transition-colors hover:text-blue-400 ${isActive ? 'text-blue-400 font-medium' : 'text-gray-400'}`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Action */}
          <div className="flex flex-col space-y-4 md:items-end">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all border border-white/5 hover:border-white/20"
                  aria-label={item.name}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Amit Ram. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Back to Top <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
