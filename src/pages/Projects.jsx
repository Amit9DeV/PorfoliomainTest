import React, { useState, useEffect, useRef, memo } from "react";
import { Link, Github, Star, ArrowRight } from "iconoir-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsDesktop } from "../hooks/usePerformance";
import ResponsiveAnimation from "../components/ui/ResponsiveAnimation";
import ProjectDetails from "../components/ProjectDetails";
import SEO from "../components/SEO";
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
      "Product categorization",
      "Shopping cart and wishlist",
      "Responsive design",
      "Order tracking system"
    ]
  },
  {
    title: "E-Books Store",
    description: "A digital bookstore platform where users can browse, search, and purchase e-books. Features a clean interface and comprehensive book management system.",
    image: "/project/ebooks.png",
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
    image: "/project/Travel.png",
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
    title: "Portfolio Website",
    description: "A personal portfolio website showcasing projects, skills, and professional experience with smooth animations and responsive design.",
    image: "/project/portfolio.png",
    tags: ["React", "Framer Motion", "Tailwind CSS"],
    liveLink: "https://amit-dev-portfolio.vercel.app/",
    githubLink: "https://github.com/Amit9Dev/portfolio",
    category: "Frontend",
    features: [
      "Smooth page transitions",
      "Interactive UI elements",
      "Project showcase",
      "Responsive layout",
      "Contact form integration"
    ]
  }
];

// Memoized Project Card Component - Mobile Optimized
const ProjectCard = memo(({ project, index, onClick }) => {
  const isDesktop = useIsDesktop();

  return (
    <ResponsiveAnimation
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`group bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-colors flex flex-col h-full ${isDesktop ? 'hover:bg-white/10' : ''
        }`}
    >
      <div
        onClick={() => onClick(project)}
        className="aspect-video overflow-hidden cursor-pointer relative"
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-500 ${isDesktop ? 'group-hover:scale-110' : ''
            }`}
        />
        {isDesktop && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white font-medium px-4 py-2 bg-black/60 backdrop-blur rounded-full border border-white/20">
              View Details
            </span>
          </div>
        )}
      </div>

      <div className="p-4 md:p-6 space-y-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <span className="text-xs font-medium text-blue-400 mb-2 block">
              {project.category}
            </span>
            <h3 className={`text-lg md:text-xl font-bold text-white transition-colors ${isDesktop ? 'group-hover:text-blue-400' : ''
              }`}>
              {project.title}
            </h3>
          </div>
          <div className="flex gap-2">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`min-touch-target text-gray-400 transition-colors p-2 rounded-lg ${isDesktop ? 'hover:text-white hover:bg-white/10' : 'active:text-white active:bg-white/10'
                }`}
              title="View Code"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`min-touch-target text-gray-400 transition-colors p-2 rounded-lg ${isDesktop ? 'hover:text-white hover:bg-white/10' : 'active:text-white active:bg-white/10'
                }`}
              title="View Live Site"
            >
              <Link className="w-5 h-5" />
            </a>
          </div>
        </div>

        <p className="text-gray-400 text-sm line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto pt-4">
          {project.tags.slice(0, 3).map((tag) => {
            const Icon = techStackIcons[tag];
            return (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-black/30 rounded-md text-gray-300 border border-white/5 flex items-center gap-1"
              >
                {Icon && <Icon className="w-3 h-3" />}
                {tag}
              </span>
            )
          })}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 text-xs bg-black/30 rounded-md text-gray-300 border border-white/5">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        <button
          onClick={() => onClick(project)}
          className={`min-touch-target w-full mt-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2 transition-all ${isDesktop ? 'hover:bg-white/10 group-hover:border-blue-500/30' : 'active:bg-white/10'
            }`}
        >
          View Project Details <ArrowRight className={`w-4 h-4 transition-transform ${isDesktop ? 'group-hover:translate-x-1' : ''
            }`} />
        </button>
      </div>
    </ResponsiveAnimation>
  );
});


const Projects = memo(() => {
  const isDesktop = useIsDesktop();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Load projects from local storage or fallback to defaults
    const loadProjects = () => {
      try {
        const savedProjects = localStorage.getItem("admin_projects");
        if (savedProjects) {
          const parsed = JSON.parse(savedProjects);
          setProjects(parsed.length > 0 ? parsed : defaultProjects);
        } else {
          setProjects(defaultProjects);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
        setProjects(defaultProjects);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();

    const handleUpdate = () => {
      const savedProjects = localStorage.getItem("admin_projects");
      if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
      }
    };

    window.addEventListener('projectsUpdated', handleUpdate);
    return () => window.removeEventListener('projectsUpdated', handleUpdate);

  }, []);

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  // Extract unique categories safely
  const categories = ["All", ...new Set(projects.map(p => p.category).filter(Boolean))];

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Projects"
        description="Explore my portfolio of web applications, tailored for performance and user experience."
      />

      <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 md:space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          >
            Featured Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg"
          >
            A collection of projects showcasing my efficient coding quality alongside modern UI/UX principles.
          </motion.p>
        </div>

        {/* Categories - Horizontal scroll on mobile */}
        <div className="flex justify-start md:justify-center overflow-x-auto gap-2 pb-2 md:pb-0 scrollbar-hide">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => setSelectedCategory(category)}
              className={`min-touch-target flex-shrink-0 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                : `bg-white/5 text-gray-400 ${isDesktop ? 'hover:bg-white/10 hover:text-white' : 'active:bg-white/10 active:text-white'}`
                }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid - Responsive: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              // Simple Skeleton Loading
              [...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-white/5 rounded-2xl animate-pulse" />
              ))
            ) : (
              filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id || index}
                  project={project}
                  index={index}
                  onClick={setSelectedProject}
                />
              ))
            )}
          </AnimatePresence>
        </div>

        {!isLoading && filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No projects found in this category.</p>
            <button
              onClick={() => setSelectedCategory("All")}
              className={`min-touch-target mt-4 px-6 py-2 bg-blue-600 rounded-full text-white font-medium transition ${isDesktop ? 'hover:bg-blue-700' : 'active:bg-blue-700'
                }`}
            >
              View All Projects
            </button>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      <ProjectDetails
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
});

export default Projects;
