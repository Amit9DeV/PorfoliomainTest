import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiGithub,
  SiLinkedin,
} from "react-icons/si";
import { Download, Mail, Code, Rocket, Star } from "iconoir-react";

const technologies = [
  { name: "React", icon: SiReact, color: "text-[#61DAFB]" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-[#339933]" },
  { name: "MongoDB", icon: SiMongodb, color: "text-[#47A248]" },
  { name: "Express", icon: SiExpress, color: "text-white" },
  { name: "Tailwind", icon: SiTailwindcss, color: "text-[#06B6D4]" },
  { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
  { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
];

const socialLinks = [
  {
    name: "GitHub",
    icon: SiGithub,
    href: "https://github.com/Amit9Dev",
    color: "hover:text-white",
  },
  {
    name: "LinkedIn",
    icon: SiLinkedin,
    href: "https://www.linkedin.com/in/amit-ram-b8384a24b/",
    color: "hover:text-[#0A66C2]",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:cloud15333@gmail.com",
    color: "hover:text-[#EA4335]",
  },
];

export default function Home() {
  // Particle effect state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Interactive Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900">
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147,51,234,0.3) 0%, transparent 60%)`
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center py-12 lg:py-0">
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10">
              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-20 right-1/4 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-40 -left-10 w-32 h-32 bg-pink-500/20 rounded-full blur-xl"
              />

              {/* Main Content */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column */}
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                    <div className="relative space-y-4">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm text-sm">
                        <Code className="w-4 h-4" />
                        <span>Full Stack Developer</span>
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      </div>
                      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                        Hi, I'm{" "}
                        <span className="relative inline-block">
                          <span className="relative z-10 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Amit Ram
                          </span>
                          <motion.span
                            className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-lg"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        </span>
                      </h1>
                      <p className="text-lg sm:text-xl text-gray-400 max-w-xl">
                        Building the future of web applications with modern technologies
                        and innovative solutions.
                      </p>
                    </div>
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-wrap gap-4"
                  >
                    <NavLink
                      to="/Projects"
                      className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium overflow-hidden hover:shadow-lg hover:shadow-purple-500/25 transition-shadow"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        View Projects
                        <Rocket className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500"
                        initial={false}
                        animate={{ x: "-100%" }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                    </NavLink>
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full border border-purple-500/30 text-white font-medium hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300"
                    >
                      <Download className="w-5 h-5 transition-transform group-hover:scale-110" />
                      <span>Download CV</span>
                    </a>
                  </motion.div>

                  {/* Tech Stack Preview */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-wrap gap-3"
                  >
                    {technologies.slice(0, 6).map((tech, index) => (
                      <motion.div
                        key={tech.name}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.5 + index * 0.1,
                        }}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors group relative"
                        title={tech.name}
                      >
                        <tech.icon className={`w-6 h-6 ${tech.color} group-hover:scale-110 transition-transform`} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Right Column - Avatar */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="relative"
                >
                  <div className="relative w-full max-w-lg mx-auto">
                    {/* Animated Shapes */}
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute -inset-4 bg-gradient-conic from-purple-500 via-transparent to-transparent rounded-full opacity-30 blur-2xl"
                    />
                    
                    {/* Avatar Container */}
                    <div className="relative rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-1 group">
                      <div className="relative rounded-xl overflow-hidden aspect-square">
                        {/* Hover Glow Effect */}
                        <motion.div
                          className="absolute -inset-2 bg-gradient-to-r from-blue-900 via-black to-blue-900 rounded-xl opacity-0 group-hover:opacity-80 blur-2xl transition-all duration-500"
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 45, 0],
                            background: [
                              "linear-gradient(45deg, #1e3a8a, #000000, #1e3a8a)",
                              "linear-gradient(45deg, #000000, #1e3a8a, #000000)",
                              "linear-gradient(45deg, #1e3a8a, #000000, #1e3a8a)"
                            ]
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />

                        {/* Animated Border */}
                        <motion.div
                          className="absolute inset-0 rounded-xl border-2 border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
                          animate={{
                            background: [
                              "linear-gradient(0deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
                              "linear-gradient(180deg, rgba(30,58,138,0.2) 0%, transparent 100%)",
                              "linear-gradient(360deg, rgba(234,179,8,0.2) 0%, transparent 100%)",
                            ],
                            borderColor: [
                              "rgba(255,255,255,0.2)",
                              "rgba(30,58,138,0.5)",
                              "rgba(234,179,8,0.3)",
                              "rgba(255,255,255,0.2)"
                            ]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />

                        <motion.img
                          src="/download.png"
                          alt="Amit Ram"
                          className="w-full h-full object-cover relative z-10 transition-all duration-500 group-hover:brightness-110 group-hover:contrast-110"
                          whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.3 }
                          }}
                          animate={{
                            boxShadow: [
                              "0 0 0 0 rgba(30,58,138,0)",
                              "0 0 40px 5px rgba(30,58,138,0.3)",
                              "0 0 0 0 rgba(30,58,138,0)"
                            ]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        
                        {/* Shine Effect */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                          initial={{ x: "-100%", y: "-100%" }}
                          animate={{ 
                            x: ["-100%", "100%"],
                            y: ["-100%", "100%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: "easeInOut"
                          }}
                        >
                          <div className="w-full h-full bg-gradient-to-br from-white/30 via-blue-900/20 to-transparent transform rotate-45" />
                        </motion.div>
                        
                        {/* Hover Overlay */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/90 via-blue-900/20 to-black/50 mix-blend-overlay"
                        />

                        {/* Interactive Elements */}
                        <div className="absolute inset-x-0 bottom-0 p-4 z-20">
                          <div className="flex flex-row items-center justify-between bg-black/90 backdrop-blur-md rounded-lg p-3 border border-blue-900/30">
                            {/* Available for Hire Badge */}
                            <motion.div 
                              className="flex items-center gap-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <Star className="w-5 h-5 text-yellow-500" />
                              <span className="text-sm font-medium text-white">Available for hire</span>
                            </motion.div>

                            {/* Social Links */}
                            <motion.div 
                              className="flex items-center gap-3"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.6 }}
                            >
                              {socialLinks.map((social, index) => (
                                <motion.a
                                  key={social.name}
                                  href={social.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`p-2 hover:bg-blue-900/30 rounded-full transition-all duration-300 ${social.color}`}
                                  title={social.name}
                                  whileHover={{ 
                                    scale: 1.15,
                                    rotate: [0, -10, 10, 0],
                                  }}
                                >
                                  <social.icon className="w-5 h-5 text-white hover:text-yellow-500" />
                                </motion.a>
                              ))}
                            </motion.div>
                          </div>
                        </div>

                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}