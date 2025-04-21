import { useMotionValue, useTransform } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useEffect, useState, useRef, useMemo } from "react";
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
import { Download, Mail, Code, Rocket, Star, ArrowDown, ArrowRight, Terminal } from "iconoir-react";
import smoothscroll from 'smoothscroll-polyfill';


// Terminal header component
const TerminalHeader = ({ title }) => (
  <div className="rounded-t-lg bg-blue-900/30 border border-blue-500/20 overflow-hidden">
    <div className="px-4 py-2 flex items-center">
      <div className="flex space-x-2 mr-4">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <div className="text-white font-mono text-sm flex-1 text-center">{title}</div>
      <div className="text-gray-400 font-mono text-xs">visitor@amit-portfolio</div>
    </div>
  </div>
);

// Command button component for terminal style
const CommandButton = ({ children, onClick, icon: Icon }) => {
  return (
    <button
      onClick={onClick}
      className="group relative px-4 py-3 border border-blue-500/30 bg-blue-900/10 rounded-lg text-left overflow-hidden hover:bg-blue-900/20 transition-all duration-300 w-full flex items-center gap-3"
    >
      {Icon && (
        <div className="flex-shrink-0 w-8 h-8 bg-blue-900/30 rounded-full flex items-center justify-center border border-blue-500/30">
          <Icon className="w-4 h-4 text-blue-400" />
        </div>
      )}
      <div className="flex-grow">{children}</div>
      <ArrowRight className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
    </button>
  );
};

// Particle effect component
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Only run animation on desktop
  useEffect(() => {
    if (isMobile) return;
    
    let animationFrame;
    let lastTime = 0;
    const fps = 20; // Further reduced FPS for mobile
    
    const animate = (currentTime) => {
      if (currentTime - lastTime > 1000 / fps) {
        setParticles(prev => 
          prev.map(particle => ({
            ...particle,
            x: (particle.x + particle.speedX + window.innerWidth) % window.innerWidth,
            y: (particle.y + particle.speedY + window.innerHeight) % window.innerHeight,
          }))
        );
        lastTime = currentTime;
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isMobile]);
  
  if (isMobile) return null;
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 opacity-10" // Further reduced opacity
      style={{ background: 'transparent' }}
    />
  );
};

// Tech icon component with hover effect
const TechIcon = ({ icon: Icon, name, color }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div className="relative group">
      {!isMobile && (
        <div className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 bg-blue-600/20 blur transition-opacity duration-200" />
      )}
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-black/40 backdrop-blur-sm border border-white/5 ${
        !isMobile ? 'group-hover:border-blue-500/20 transition-colors' : ''
      } relative z-10`}>
        <Icon className={`w-6 h-6 ${color} ${
          !isMobile ? 'transition-transform duration-200 group-hover:scale-105' : ''
        }`} />
        
        {!isMobile && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-blue-900/20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-xs font-medium text-white">{name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// 3D Card effect component
const Card3D = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handleMouseMove = (e) => {
    if (isMobile) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / rect.width - 0.5) * 10; // Further reduced rotation range
    const yPct = (mouseY / rect.height - 0.5) * 10;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    if (isMobile) return;
    x.set(0);
    y.set(0);
  };
  
  return (
    <div
      style={{
        transformStyle: isMobile ? "flat" : "preserve-3d",
        willChange: isMobile ? "auto" : "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </div>
  );
};

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

// Stats for the skills section
const stats = [
  { label: "Projects Completed", value: "25+" },
  { label: "Years Experience", value: "3+" },
  { label: "Technologies", value: "12+" },
  { label: "Satisfied Clients", value: "15+" },
];

export default function Home() {

  useEffect(() => {
    if (!('scrollBehavior' in document.documentElement.style)) {
      smoothscroll.polyfill();
    }
  }, []);
  // Particle effect state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("hero");
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  

  
  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden">
      {/* Interactive Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black">
          <div className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(30,64,175,0.2) 0%, transparent 60%)`
            }}
          />
          <ParticleBackground />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
            </div>
          </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center py-20 lg:py-0">
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10">
              {/* Main Content */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column */}
                <div className="space-y-8">
                  <div className="relative">
                    <TerminalHeader title="~/.profile" />
                    <div className="relative space-y-4 bg-black/30 backdrop-blur-sm border border-blue-500/20 p-5 rounded-b-xl">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/20 border border-blue-500/30 text-sm">
                        <Terminal className="w-4 h-4 text-blue-400" />
                        <span className="font-mono text-sm text-sky-600">developer@amit-ram:~$</span>
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      </div>
                      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-purple-600">
                        Hi, I'm{" "}
                        <span className="relative inline-block">
                          <span className="relative z-10 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                            Amit Ram
                          </span>
                        </span>
                      </h1>
                      <p className="text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed border-l-2 border-blue-500/30 pl-4">
                        Building the future of web applications with modern technologies
                        and innovative solutions.
                      </p>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <CommandButton onClick={() => window.location.href='/Projects'} icon={Rocket}>
                      <div className="flex flex-col">
                        <span className="text-gray-300 text-xs font-mono">$ cd ~/projects</span>
                        <span className="text-blue-300 font-mono text-sm">View my projects</span>
                      </div>
                    </CommandButton>
                    
                    <CommandButton onClick={() => window.open('/resume.pdf', '_blank')} icon={Download}>
                      <div className="flex flex-col">
                        <span className="text-gray-300 text-xs font-mono">$ cat resume.pdf</span>
                        <span className="text-blue-300 font-mono text-sm">Download my CV</span>
                      </div>
                    </CommandButton>
                    
                    <CommandButton onClick={scrollToAbout} icon={ArrowDown}>
                      <div className="flex flex-col">
                        <span className="text-gray-300 text-xs font-mono">$ scroll --to about</span>
                        <span className="text-blue-300 font-mono text-sm">Learn more about me</span>
                      </div>
                    </CommandButton>
                  </div>

                  {/* Tech Stack Preview */}
                  <div>
                    <div className="text-blue-400 font-mono text-xs mb-4">$ ls -la ~/tech-stack</div>
                    <div className="flex flex-wrap gap-4">
                      {technologies.slice(0, 6).map((tech) => (
                        <div key={tech.name}>
                          <TechIcon {...tech} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Avatar */}
                <div className="relative">
                  <TerminalHeader title="~/avatar.jpg" />
                  <Card3D className="relative w-full max-w-lg mx-auto">
                    {/* Avatar Container */}
                    <div className="relative rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-1 group">
                      <div className="relative rounded-xl overflow-hidden aspect-square">
                        <img
                          src="/download.png"
                          alt="Amit Ram"
                          className="w-full h-full object-cover relative z-10"
                        />
                        
                        {/* Interactive Elements */}
                        <div className="absolute inset-x-0 bottom-0 p-4 z-20">
                          <div className="flex flex-row items-center justify-between bg-black/90 backdrop-blur-md rounded-lg p-3 border border-blue-900/30">
                            {/* Available for Hire Badge */}
                            <div className="flex items-center gap-2">
                              <Star className="w-5 h-5 text-yellow-500" />
                              <span className="text-sm font-medium text-white">Available for hire</span>
                            </div>

                            {/* Social Links */}
                            <div className="flex items-center gap-3">
                              {socialLinks.map((social) => (
                                <a
                                  key={social.name}
                                  href={social.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`p-2 hover:bg-blue-900/30 rounded-full transition-all duration-300 ${social.color}`}
                                  title={social.name}
                                >
                                  <social.icon className="w-5 h-5 text-white hover:text-blue-400" />
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />
                      </div>
                    </div>
                  </Card3D>
                </div>
              </div>
              
              {/* Terminal Prompt Line */}
              <div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center"
                onClick={scrollToAbout}
              >
                <div className="font-mono text-xs md:flex items-center gap-2 cursor-pointer hidden ">
                  <span className="text-green-400">visitor@portfolio:</span>
                  <span className="text-blue-400">~$</span>
                  <span className="text-gray-300">scroll --to about</span>
                  <div className="w-2 h-4 bg-blue-500 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="relative min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="relative">
              {/* Section Title */}
              <div className="text-center mb-16">
                <TerminalHeader title="~/about-me" />
                <div className="font-mono text-xs text-blue-400 mt-3 mb-2">$ cat about.md | render</div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-10">
                {/* About Text */}
                <div className="md:col-span-2 space-y-6">
                  <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Full Stack Developer & UI Designer
                    </h3>
                    <div className="space-y-4 text-gray-300">
                      <p>
                        I'm a passionate full-stack developer with expertise in modern web technologies. 
                        I specialize in building responsive, high-performance web applications with 
                        clean code and intuitive user experiences.
                      </p>
                      <p>
                        With a strong foundation in both front-end and back-end development, I bring 
                        ideas to life by creating applications that are not only visually appealing but 
                        also technically sound and scalable.
                      </p>
                      <p>
                        My goal is to deliver solutions that exceed client expectations while maintaining 
                        the highest standards of quality and performance.
                      </p>
                    </div>
                    
                    <div className="mt-8">
                      <NavLink
                        to="/About"
                        className="inline-flex items-center text-blue-400 font-medium group"
                      >
                        <span>Learn more about me</span>
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </NavLink>
                    </div>
                  </div>
                  
                  {/* Skills Section */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-white/5 text-center"
                      >
                        <span className="block text-3xl font-bold text-white mb-1">
                          {stat.value}
                        </span>
                        <span className="text-sm text-gray-400">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* All Technologies */}
                <div className="space-y-6">
                  <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-6">
                      My Tech Stack
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {technologies.map((tech) => (
                        <div
                          key={tech.name}
                          className="flex items-center gap-3 group"
                        >
                          <div className="p-2 rounded-lg bg-black/50 border border-white/5 group-hover:border-blue-500/30 transition-colors">
                            <tech.icon className={`w-6 h-6 ${tech.color}`} />
                          </div>
                          <span className="text-gray-300 group-hover:text-white transition-colors">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8">
                      <NavLink
                        to="/Projects"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium hover:shadow-lg hover:shadow-blue-500/10 transition-all w-full justify-center"
                      >
                        <span>View My Projects</span>
                        <Rocket className="w-5 h-5" />
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
  );
}