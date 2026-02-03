import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2 as Trash,
  Edit,
  Save,
  X,
  Upload,
  LogOut,
  LayoutGrid,
  Folder,
  User,
  Book,
  FileText
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SEO from "../components/SEO";

// --- Schemas ---

const projectSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  tech: z.string().min(2, "Tech stack is required (comma separated)"),
  image: z.string().url("Must be a valid URL"),
  link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  github: z.string().url("Must be a valid GitHub URL").optional().or(z.literal("")),
  category: z.string().optional(),
});

const blogSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  date: z.string().min(1, "Date is required"),
  readTime: z.string().min(1, "Read time is required"),
  category: z.string().min(1, "Category is required"),
  image: z.string().url("Must be a valid URL"),
});

// --- Components ---

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("projects"); // "projects" | "blogs"

  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const [isEditing, setIsEditing] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Check for existing session
  useEffect(() => {
    const session = sessionStorage.getItem("admin_session");
    if (session === "true") {
      setIsAuthenticated(true);
    }

    // Load projects
    const savedProjects = localStorage.getItem("admin_projects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }

    // Load blogs
    const savedBlogs = localStorage.getItem("admin_blogs");
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    }
  }, []);

  // Update localStorage helpers
  const updateProjects = (newProjects) => {
    setProjects(newProjects);
    localStorage.setItem("admin_projects", JSON.stringify(newProjects));
    window.dispatchEvent(new Event("projectsUpdated"));
  };

  const updateBlogs = (newBlogs) => {
    setBlogs(newBlogs);
    localStorage.setItem("admin_blogs", JSON.stringify(newBlogs));
    window.dispatchEvent(new Event("blogsUpdated"));
  };

  // Login Logic
  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    // Hardcoded Credentials
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_session", "true");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_session");
  };

  // Delete Handlers
  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      updateProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      updateBlogs(blogs.filter(b => b.id !== id));
    }
  };

  // Submit Handlers
  const handleProjectSubmit = (data) => {
    const formattedData = {
      ...data,
      tech: typeof data.tech === 'string' ? data.tech.split(',').map(t => t.trim()) : data.tech
    };

    if (isEditing) {
      updateProjects(projects.map(p => p.id === isEditing.id ? { ...formattedData, id: isEditing.id } : p));
    } else {
      updateProjects([...projects, { ...formattedData, id: Date.now() }]);
    }
    setShowAddModal(false);
    setIsEditing(null);
  };

  const handleBlogSubmit = (data) => {
    if (isEditing) {
      updateBlogs(blogs.map(b => b.id === isEditing.id ? { ...data, id: isEditing.id } : b));
    } else {
      updateBlogs([...blogs, { ...data, id: Date.now() }]);
    }
    setShowAddModal(false);
    setIsEditing(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center px-4 relative">
        <SEO title="Admin Login" />
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/5 rounded-full border border-white/10">
              <User className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-center">Welcome Back</h2>
          <p className="text-gray-400 text-center mb-8">Enter your credentials to access the dashboard</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-white placeholder-gray-500"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-white placeholder-gray-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-900/20 mt-2"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6">
      <SEO title="Admin Dashboard" />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Dashboard
            </h1>
            <p className="text-gray-400 text-lg">Manage your content and analytics.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={() => {
                setIsEditing(null);
                setShowAddModal(true);
              }}
              className="flex-1 md:flex-none px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
            >
              <Plus className="w-5 h-5" /> New {activeTab === "projects" ? "Project" : "Article"}
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Projects", value: projects.length, icon: LayoutGrid, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
            { label: "Total Articles", value: blogs.length, icon: FileText, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
            { label: "Total Views", value: "32.8k", icon: Folder, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
            { label: "Active Session", value: "Online", icon: User, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
          ].map((stat, i) => (
            <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.07] transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.border} border`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all ${activeTab === "projects" ? "bg-white/10 text-white border border-white/10" : "text-gray-400 hover:text-white"}`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all ${activeTab === "blogs" ? "bg-white/10 text-white border border-white/10" : "text-gray-400 hover:text-white"}`}
          >
            Blog Posts
          </button>
        </div>

        {/* Content List */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
            <h2 className="text-xl font-bold">{activeTab === "projects" ? "Project Library" : "Recent Articles"}</h2>
            <span className="text-sm text-gray-400">
              {activeTab === "projects" ? projects.length : blogs.length} entries
            </span>
          </div>
          <div className="divide-y divide-white/10">
            <AnimatePresence>
              {activeTab === "projects" ? (
                projects.length > 0 ? (
                  projects.map((project) => (
                    <ProjectRow
                      key={project.id}
                      project={project}
                      onDelete={handleDeleteProject}
                      onEdit={() => {
                        setIsEditing(project);
                        setShowAddModal(true);
                      }}
                    />
                  ))
                ) : (
                  <EmptyState type="Projects" onAction={() => setShowAddModal(true)} />
                )
              ) : (
                blogs.length > 0 ? (
                  blogs.map((blog) => (
                    <BlogRow
                      key={blog.id}
                      blog={blog}
                      onDelete={handleDeleteBlog}
                      onEdit={() => {
                        setIsEditing(blog);
                        setShowAddModal(true);
                      }}
                    />
                  ))
                ) : (
                  <EmptyState type="Articles" onAction={() => setShowAddModal(true)} />
                )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          activeTab === "projects" ? (
            <ProjectModal
              isOpen={showAddModal}
              onClose={() => {
                setShowAddModal(false);
                setIsEditing(null);
              }}
              onSubmit={handleProjectSubmit}
              initialData={isEditing}
            />
          ) : (
            <BlogModal
              isOpen={showAddModal}
              onClose={() => {
                setShowAddModal(false);
                setIsEditing(null);
              }}
              onSubmit={handleBlogSubmit}
              initialData={isEditing}
            />
          )
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Helper Components ---

function EmptyState({ type, onAction }) {
  return (
    <div className="p-20 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
        <Folder className="w-8 h-8 text-gray-500" />
      </div>
      <h3 className="text-lg font-medium text-white mb-2">No {type} yet</h3>
      <p className="text-gray-400 max-w-sm mx-auto mb-6">Create your first entry to showcase your work.</p>
      <button
        onClick={onAction}
        className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
      >
        Create {type.slice(0, -1)} &rarr;
      </button>
    </div>
  );
}

function ProjectRow({ project, onDelete, onEdit }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, overflow: "hidden" }}
      className="p-6 flex flex-col sm:flex-row items-center gap-6 group hover:bg-white/[0.02] transition-colors"
    >
      <div className="relative w-full sm:w-24 h-48 sm:h-24 flex-shrink-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full rounded-lg object-cover border border-white/10"
        />
        {project.category && (
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] uppercase font-bold text-white">
            {project.category}
          </span>
        )}
      </div>

      <div className="flex-grow text-center sm:text-left w-full">
        <h3 className="font-bold text-lg mb-1 text-white">{project.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2 md:line-clamp-1 max-w-2xl mb-2">{project.description}</p>
        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
          {Array.isArray(project.tech) && project.tech.map((t, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button
          onClick={onEdit}
          className="p-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl transition-colors border border-blue-500/20"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(project.id)}
          className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors border border-red-500/20"
        >
          <Trash className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

function BlogRow({ blog, onDelete, onEdit }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, overflow: "hidden" }}
      className="p-6 flex flex-col sm:flex-row items-center gap-6 group hover:bg-white/[0.02] transition-colors"
    >
      <div className="relative w-full sm:w-24 h-48 sm:h-24 flex-shrink-0">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full rounded-lg object-cover border border-white/10"
        />
        <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] uppercase font-bold text-white">
          {blog.category}
        </span>
      </div>

      <div className="flex-grow text-center sm:text-left w-full">
        <h3 className="font-bold text-lg mb-1 text-white">{blog.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2 md:line-clamp-1 max-w-2xl mb-2">{blog.excerpt}</p>
        <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-gray-500">
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.readTime}</span>
        </div>
      </div>

      <div className="flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button
          onClick={onEdit}
          className="p-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl transition-colors border border-blue-500/20"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(blog.id)}
          className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors border border-red-500/20"
        >
          <Trash className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

function ProjectModal({ isOpen, onClose, onSubmit, initialData }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData ? {
      ...initialData,
      tech: Array.isArray(initialData.tech) ? initialData.tech.join(', ') : initialData.tech
    } : {
      title: "",
      description: "",
      tech: "",
      image: "",
      link: "",
      github: "",
      category: "Web App"
    }
  });

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Project' : 'New Project'} icon={initialData ? Edit : Plus}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Project Title</label>
              <input
                {...register("title")}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                placeholder="e.g. Neon Dashboard"
              />
              {errors.title && <p className="text-red-400 text-xs mt-1 ml-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Category</label>
              <input
                {...register("category")}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                placeholder="e.g. Frontend, Fullstack..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Description</label>
            <textarea
              {...register("description")}
              rows="3"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none transition-all"
              placeholder="Describe the project's purpose and key features..."
            />
            {errors.description && <p className="text-red-400 text-xs mt-1 ml-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Tech Stack (comma separated)</label>
              <div className="relative">
                <LayoutGrid className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <input
                  {...register("tech")}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  placeholder="React, Tailwind, Node.js..."
                />
              </div>
              {errors.tech && <p className="text-red-400 text-xs mt-1 ml-1">{errors.tech.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Image URL</label>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Upload className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <input
                    {...register("image")}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    placeholder="https://..."
                  />
                </div>
              </div>
              {errors.image && <p className="text-red-400 text-xs mt-1 ml-1">{errors.image.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Live Demo URL</label>
              <input
                {...register("link")}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                placeholder="https://..."
              />
              {errors.link && <p className="text-red-400 text-xs mt-1 ml-1">{errors.link.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">GitHub URL</label>
              <input
                {...register("github")}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                placeholder="https://github.com/..."
              />
              {errors.github && <p className="text-red-400 text-xs mt-1 ml-1">{errors.github.message}</p>}
            </div>
          </div>
        </div>
        <ModalActions onClose={onClose} isEditing={!!initialData} type="Project" />
      </form>
    </ModalWrapper>
  );
}

function BlogModal({ isOpen, onClose, onSubmit, initialData }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: initialData || {
      title: "",
      excerpt: "",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: "5 min read",
      category: "Tech",
      image: ""
    }
  });

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Article' : 'New Article'} icon={initialData ? Edit : Plus}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Article Title</label>
              <input
                {...register("title")}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                placeholder="e.g. Modern UI Design"
              />
              {errors.title && <p className="text-red-400 text-xs mt-1 ml-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Category</label>
              <input
                {...register("category")}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                placeholder="e.g. Frontend, Design..."
              />
              {errors.category && <p className="text-red-400 text-xs mt-1 ml-1">{errors.category.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Excerpt</label>
            <textarea
              {...register("excerpt")}
              rows="3"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none transition-all"
              placeholder="Brief summary of the article..."
            />
            {errors.excerpt && <p className="text-red-400 text-xs mt-1 ml-1">{errors.excerpt.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Date</label>
              <input
                {...register("date")}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                placeholder="Mar 15, 2024"
              />
              {errors.date && <p className="text-red-400 text-xs mt-1 ml-1">{errors.date.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Read Time</label>
              <input
                {...register("readTime")}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                placeholder="5 min read"
              />
              {errors.readTime && <p className="text-red-400 text-xs mt-1 ml-1">{errors.readTime.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Image URL</label>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Upload className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <input
                    {...register("image")}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    placeholder="https://..."
                  />
                </div>
              </div>
              {errors.image && <p className="text-red-400 text-xs mt-1 ml-1">{errors.image.message}</p>}
            </div>
          </div>
        </div>
        <ModalActions onClose={onClose} isEditing={!!initialData} type="Article" />
      </form>
    </ModalWrapper>
  );
}

function ModalWrapper({ isOpen, onClose, title, icon: Icon, children }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
      >
        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Icon className="w-5 h-5 text-blue-400" />
            {title}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}

function ModalActions({ onClose, isEditing, type }) {
  return (
    <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
      <button
        type="button"
        onClick={onClose}
        className="px-5 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2"
      >
        <Save className="w-4 h-4" />
        {isEditing ? 'Save Changes' : `Create ${type}`}
      </button>
    </div>
  );
}