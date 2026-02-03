import { motion, AnimatePresence } from "framer-motion";
import { Xmark, Github, Link as LinkIcon, Calendar, Code, Check } from "iconoir-react";

export default function ProjectDetails({ project, isOpen, onClose }) {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl custom-scrollbar"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-white/10 text-white/70 hover:text-white rounded-full transition-all z-10 backdrop-blur-md"
                        >
                            <Xmark className="w-6 h-6" />
                        </button>

                        {/* Hero Image */}
                        <div className="relative h-64 sm:h-80 md:h-96 w-full group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        <div className="p-6 md:p-10 -mt-20 relative z-20">
                            {/* Header */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b border-white/10 pb-8">
                                <div>
                                    <motion.span
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="inline-block px-3 py-1 mb-3 text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full"
                                    >
                                        {project.category || "Development"}
                                    </motion.span>
                                    <motion.h2
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-3xl md:text-5xl font-bold text-white mb-2"
                                    >
                                        {project.title}
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-gray-400 text-lg max-w-2xl"
                                    >
                                        {project.description}
                                    </motion.p>
                                </div>

                                <div className="flex gap-3">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium flex items-center gap-2 transition-all hover:scale-105"
                                        >
                                            <Github className="w-5 h-5" /> Code
                                        </a>
                                    )}
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center gap-2 transition-all hover:scale-105 shadow-lg shadow-blue-600/20"
                                        >
                                            <LinkIcon className="w-5 h-5" /> Demo
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                {/* Main Content */}
                                <div className="md:col-span-2 space-y-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <Code className="w-5 h-5 text-blue-400" /> Technical Overview
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            {project.longDescription || project.description}
                                            {/* Placeholder for more detailed description if not present */}
                                            <br /><br />
                                            This project showcases the implementation of modern web standards and architectural patterns. Key focus areas included performance optimization, accessibility compliance, and responsive user interface design.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
                                        <ul className="grid sm:grid-cols-2 gap-3">
                                            {(project.features || ["Responsive Design", "API Integration", "State Management", "Authentication"]).map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                                                    <Check className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                                                    <span className="text-gray-300 text-sm">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Sidebar */}
                                <div className="space-y-6">
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Technologies</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech) => (
                                                <span key={tech} className="px-3 py-1 text-sm text-gray-300 bg-white/5 border border-white/10 rounded-lg">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Project Info</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-gray-400">
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-sm">Completed: 2024</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-400">
                                                <Code className="w-4 h-4" />
                                                <span className="text-sm">Role: Lead Developer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
