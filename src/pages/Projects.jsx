// src/App.js
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Link as LinkIcon, Code, Star } from "iconoir-react";
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

const projects = [
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

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const filteredProjects = projects.filter(
    (project) => selectedCategory === "All" || project.category === selectedCategory
  );

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Featured Projects
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore my latest projects showcasing full-stack development, modern UI design,
            and clean code practices.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-w-16 aspect-h-9">
                  {project.video && !isVideoPlaying ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : project.video ? (
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      onPlay={() => setIsVideoPlaying(true)}
                    >
                      <source src={project.video} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  )}
                </div>

                {/* Project Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 p-6 space-y-4">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => {
                        const Icon = techStackIcons[tag];
                        return (
                          <div
                            key={tag}
                            className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm"
                          >
                            {Icon && <Icon className="w-4 h-4 text-purple-400" />}
                            <span className="text-xs text-white">{tag}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-2">
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500 text-white text-sm hover:bg-purple-600 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <LinkIcon className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <SiGithub className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              onClick={() => setSelectedProject(null)}
            >
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-start">
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

                  <p className="text-gray-300">{selectedProject.description}</p>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Key Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-300">
                          <FaCode className="text-purple-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600 transition-colors"
                    >
                      <LinkIcon className="w-5 h-5" />
                      <span>View Live Demo</span>
                    </a>
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
                    >
                      <SiGithub className="w-5 h-5" />
                      <span>View Source Code</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
