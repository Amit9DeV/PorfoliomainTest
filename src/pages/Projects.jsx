// src/App.js
import React, { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Github, Link, Code, Star, ArrowDown, ArrowRight, Eye, Terminal } from "iconoir-react";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiSocketdotio,
  SiRedux,
  SiFirebase,
  SiGithub,
} from "react-icons/si";
import { FaCode } from "react-icons/fa";

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

// 3D Card effect component
const Card3D = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 100);
    y.set(yPct * 100);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  );
};

// Tag component for tech stack
const TechTag = ({ tag, icon: Icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/50 to-blue-800/50 rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
      <div className="relative flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-blue-500/20 group-hover:border-blue-500/30 transition-all duration-300">
        {Icon && (
          <Icon className="w-4 h-4 text-blue-400 transition-transform duration-300 group-hover:scale-110" />
        )}
        <span className="text-xs font-medium font-mono text-white">{tag}</span>
      </div>
    </motion.div>
  );
};

// Section Title component with terminal style
const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-12">
    <TerminalHeader title="~/projects" />
    <div className="bg-black/30 backdrop-blur-md border border-blue-500/20 border-t-0 p-4 rounded-b-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <div className="font-mono text-xs text-blue-400 mb-2">$ ls -la ~/projects | grep "featured" | sort</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white font-mono border-l-2 border-blue-500/30 pl-4">
          {title}
        </h1>
        {subtitle && <p className="text-gray-400 text-lg pl-4 border-l border-dashed border-blue-500/20">{subtitle}</p>}
      </motion.div>
    </div>
  </div>
);

const techStackIcons = {
  React: SiReact,
  "Node.js": SiNodedotjs,
  MongoDB: SiMongodb,
  Express: SiExpress,
  "Tailwind CSS": SiTailwindcss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  "Next.js": SiNextdotjs,
  "Socket.io": SiSocketdotio,
  Redux: SiRedux,
  Firebase: SiFirebase,
};

// Default projects array
const defaultProjects = [
  {
    title: "NexCart E-Commerce",
    description: "A comprehensive e-commerce platform featuring men's and women's fashion, grocery sections, user authentication, and a complete shopping experience with cart and wishlist functionality.",
    image: "/project/NexCart.png",
    video: "/NexCart.mp4",
    tags: ["React", "Node.js", "MongoDB", "Express", "Redux", "Tailwind CSS"],
    liveLink: "https://nex-cart-2.vercel.app/",
    githubLink: "https://github.com/Amit9Dev/NexCart",
    category: "Full Stack",
    features: [
      "User authentication & authorization",
      "Product categorization (Men's/Women's Fashion, Grocery)",
      "Shopping cart and wishlist",
      "Responsive design",
      "Order tracking system"
    ]
  },
  {
    title: "E-Books Store",
    description: "A digital bookstore platform where users can browse, search, and purchase e-books. Features a clean interface and comprehensive book management system.",
    image: "/project/ebooks.png",
    video: "/ebooks.mp4",
    tags: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    liveLink: "https://ebooks-store.vercel.app/",
    githubLink: "https://github.com/Amit9Dev/ebooks-store",
    category: "Full Stack",
    features: [
      "Book catalog management",
      "Search and filter functionality",
      "User library system",
      "Reading progress tracking",
      "Responsive design"
    ]
  },
  {
    title: "EOS Payment Platform",
    description: "A modern payment processing platform with secure transaction handling, user wallet management, and real-time payment tracking.",
    image: "/project/eospay.png",
    video: "/eospay.mp4",
    tags: ["React", "Node.js", "MongoDB", "Express", "Redux"],
    liveLink: "https://eospay.vercel.app/",
    githubLink: "https://github.com/Amit9Dev/eospay",
    category: "Full Stack",
    features: [
      "Secure payment processing",
      "Wallet management",
      "Transaction history",
      "Real-time notifications",
      "Multi-currency support"
    ]
  },
  {
    title: "Travel Explorer",
    description: "An immersive travel application that helps users discover, plan, and book their perfect vacation with interactive destination guides and trip planning tools.",
    image: "/travel.jpg",
    video: "/travel.mp4",
    tags: ["React", "JavaScript", "Tailwind CSS", "Node.js"],
    liveLink: "https://travel-app-react-project.vercel.app/",
    githubLink: "https://github.com/Amit9Dev/travel-app",
    category: "Frontend",
    features: [
      "Interactive destination guides",
      "Trip planning tools",
      "Travel itinerary builder",
      "Photo galleries",
      "Responsive design"
    ]
  },
  {
    title: "Library Management System",
    description: "A comprehensive library management system with book tracking, user management, and automated notifications.",
    image: "/Library.jpg",
    video: "/Library.mp4",
    tags: ["JavaScript", "Node.js", "MongoDB", "Express"],
    liveLink: "https://librarymanagementbyamit.netlify.app/",
    githubLink: "https://github.com/Amit9Dev/library-management",
    category: "Full Stack",
    features: [
      "Book catalog management",
      "User borrowing system",
      "Due date tracking",
      "Search functionality",
      "Admin controls"
    ]
  },
  {
    title: "SiGuA Photo Album",
    description: "A modern photo album web application with a clean and intuitive interface for viewing and managing photo collections. Features a responsive grid layout and smooth transitions.",
    image: "/photo-album.jpg",
    tags: ["React", "JavaScript", "CSS3", "Responsive Design"],
    liveLink: "https://sunny-sigu.netlify.app/",
    githubLink: "https://github.com/Amit9Dev/photo-album",
    category: "Frontend",
    features: [
      "Responsive photo grid layout",
      "Image viewing optimization",
      "Album organization",
      "Smooth transitions",
      "Modern UI design"
    ]
  },
  {
    title: "Nature Landing Page",
    description: "A beautiful and responsive landing page focused on environmental awareness and nature conservation. Features modern design elements and engaging content about mother nature.",
    image: "/nature-landing.jpg",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    liveLink: "https://amazing-alfajores-47d836.netlify.app/",
    githubLink: "https://github.com/Amit9Dev/nature-landing",
    category: "Frontend",
    features: [
      "Responsive design",
      "Modern UI components",
      "Contact form integration",
      "Blog section",
      "Environmental content"
    ]
  }
];

const categories = ["All", "Full Stack", "Frontend", "Backend"];

// Terminal-style filter component
const FilterBar = ({ activeFilter, setActiveFilter, filters }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-10"
    >
      <div className="bg-black/30 backdrop-blur-md rounded-lg border border-blue-500/20 p-2 inline-block">
        <div className="font-mono text-xs text-blue-400 mb-2 px-2">$ filter --category</div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-md font-mono text-sm transition-all ${
                activeFilter === filter
                  ? "bg-blue-900/50 text-white border border-blue-500/50"
                  : "text-gray-400 hover:text-white bg-black/20 border border-white/5 hover:border-blue-500/30"
              }`}
            >
              {filter === "All" ? "all" : filter.toLowerCase().replace(" ", "-")}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Updated ProjectCard component with terminal style
const ProjectCard = memo(({ project, index, onClick }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-black/30 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all duration-300"
      onClick={() => onClick(project)}
    >
      <div className="relative aspect-video overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-black/50 animate-pulse" />
        )}
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-blue-900/30 text-blue-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const modalRef = useRef(null);
  const [allProjects, setAllProjects] = useState(defaultProjects);

  // Background animated shapes
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Load projects from localStorage on component mount
  useEffect(() => {
    const customProjects = localStorage.getItem("admin_projects");
    if (customProjects) {
      try {
        const parsedProjects = JSON.parse(customProjects);
        setAllProjects([...defaultProjects, ...parsedProjects]);
      } catch (e) {
        console.error("Failed to parse custom projects", e);
        setAllProjects(defaultProjects);
      }
    }
  }, []);

  // Filter projects by category and search query
  const filteredProjects = allProjects.filter(
    (project) => 
      (selectedCategory === "All" || project.category === selectedCategory) &&
      (searchQuery === "" || 
       project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
       project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedProject(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black">
          <div className="absolute inset-0 opacity-30"
        style={{
              backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(30,64,175,0.2) 0%, transparent 60%)`
            }}
          />
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-600/5 rounded-full filter blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <SectionTitle 
          title="Featured Projects" 
          subtitle="Explore my latest projects showcasing full-stack development, modern UI design, and clean code practices."
        />

        {/* Search and Filter Bar */}
        <FilterBar
          activeFilter={selectedCategory}
          setActiveFilter={setSelectedCategory}
          filters={categories}
        />

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  onClick={(project) => setSelectedProject(project)}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/5 shadow-xl">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
                  <p className="text-gray-400">Try adjusting your search or category filter</p>
                  <button
                    onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                    className="mt-6 px-4 py-2 bg-blue-600 rounded-lg text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div 
                className="fixed inset-0 bg-black/70 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                ref={modalRef}
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative bg-black/60 backdrop-blur-xl rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  {/* Modal Header */}
                  <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md px-6 py-4 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="p-6 space-y-8">
                    {/* Project Media */}
                    <div className="relative rounded-xl overflow-hidden">
                      {selectedProject.video ? (
                        <video className="w-full rounded-xl" controls>
                          <source src={selectedProject.video} type="video/mp4" />
              </video>
                      ) : (
                        <img
                          src={selectedProject.image}
                          alt={selectedProject.title}
                          className="w-full rounded-xl"
                        />
                      )}
                    </div>

                    {/* Project Content */}
                    <div className="grid md:grid-cols-3 gap-8">
                      {/* Left Column */}
                      <div className="md:col-span-2 space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-3">Project Overview</h3>
                          <p className="text-gray-300 leading-relaxed">{selectedProject.description}</p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-white">Key Features</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {selectedProject.features.map((feature, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-2 text-gray-300"
                              >
                                <div className="p-1 bg-blue-900/30 rounded-full mt-0.5">
                                  <Star className="w-3.5 h-3.5 text-blue-400" />
                                </div>
                                <span>{feature}</span>
                              </motion.div>
                            ))}
                          </div>
        </div>
      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-3">Tech Stack</h3>
                          <div className="grid grid-cols-2 gap-3">
                            {selectedProject.tags.map((tag, index) => {
                              const Icon = techStackIcons[tag];
                              return (
                                <motion.div
                                  key={tag}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 + index * 0.05 }}
                                  className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/5"
                                >
                                  {Icon && <Icon className="w-5 h-5 text-blue-400" />}
                                  <span className="text-sm text-gray-300">{tag}</span>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-white">Project Links</h3>
                          <div className="space-y-3">
                            <a
                              href={selectedProject.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 px-6 py-3 w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300"
                            >
                              <Link className="w-5 h-5" />
                              <span>View Live Demo</span>
                            </a>
                            <a
                              href={selectedProject.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 px-6 py-3 w-full rounded-lg bg-black/40 border border-white/10 text-white font-medium hover:bg-black/60 transition-all duration-300"
                            >
                              <SiGithub className="w-5 h-5" />
                              <span>View Source Code</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
        </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Terminal prompt at the end */}
      <div className="flex justify-center mt-16">
        <div className="font-mono text-xs flex items-center gap-2">
          <span className="text-green-400">visitor@portfolio:</span>
          <span className="text-blue-400">~/projects$</span>
          <span className="text-gray-300">echo "View more on GitHub"</span>
          <div className="w-2 h-4 bg-blue-500 ml-1 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
