import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Lock, Plus, Check, Eye, Refresh, Trash, Link, Github } from "iconoir-react";
import { Navigate, useNavigate } from "react-router-dom";
import debounce from 'lodash/debounce';

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
      <div className="text-gray-400 font-mono text-xs">admin@amit-portfolio</div>
    </div>
  </div>
);

// Available tech tags
const availableTags = [
  "React", "Node.js", "MongoDB", "Express", "Redux", "Tailwind CSS", 
  "JavaScript", "TypeScript", "Next.js", "Socket.io", "Firebase", 
  "HTML5", "CSS3", "Responsive Design"
];

// Categories
const categories = ["Full Stack", "Frontend", "Backend", "UI/UX"];

// Hardcoded password (in a real app, this should be properly secured)
const ADMIN_PASSWORD = "amit1234";

export default function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [projects, setProjects] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    video: "",
    tags: [],
    liveLink: "",
    githubLink: "",
    category: "Full Stack",
    features: ["", "", "", "", ""]
  });
  
  // Success message state
  const [showSuccess, setShowSuccess] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Load saved projects on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem("admin_projects");
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (e) {
        console.error("Failed to parse saved projects", e);
      }
    }
  }, []);
  
  // Handle authentication
  const handleAuthenticate = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid password. Access denied.");
    }
  };
  
  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle feature changes
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: newFeatures
    });
  };
  
  // Handle tag selection
  const handleTagToggle = (tag) => {
    if (formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: formData.tags.filter(t => t !== tag)
      });
    } else {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag]
      });
    }
  };
  
  // Debounced image preview
  const debouncedSetPreviewImage = useCallback(
    debounce((url) => {
      setPreviewImage(url);
    }, 300),
    []
  );

  // Optimized image preview handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
        debouncedSetPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Optimized form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const newProject = {
        ...formData,
        id: Date.now().toString(),
      };
      
      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      localStorage.setItem("admin_projects", JSON.stringify(updatedProjects));
      
      // Dispatch event for Projects page
      window.dispatchEvent(new Event('projectsUpdated'));
      
      setFormData({
        title: "",
        description: "",
        image: "",
        video: "",
        tags: [],
        features: [],
        liveLink: "",
        githubLink: "",
        category: "Full Stack",
      });
      setPreviewImage(null);
      setNewTag("");
      setNewFeature("");
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setAuthError("Error adding project. Please try again.");
      setTimeout(() => setAuthError(""), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Delete a project
  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const updatedProjects = projects.filter(p => p.id !== id);
      setProjects(updatedProjects);
      localStorage.setItem("admin_projects", JSON.stringify(updatedProjects));
      
      // Dispatch a custom event to notify other components about the change
      window.dispatchEvent(new Event('projectsUpdated'));
    }
  };
  
  // If not authenticated, show login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black">
            <div className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(30,64,175,0.2) 0%, transparent 60%)`
              }}
            />
          </div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-600/5 rounded-full filter blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative"
        >
          {/* Terminal window */}
          <div className="absolute -top-10 left-0 right-0 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-block px-4 py-1.5 bg-blue-900/30 text-blue-400 rounded-t-lg font-mono text-sm border border-blue-500/30"
            >
              secure-login.sh
            </motion.div>
          </div>
          
          <TerminalHeader title="~/admin/login.sh" />
          <div className="bg-black/30 backdrop-blur-md border border-blue-500/20 border-t-0 p-6 rounded-b-lg shadow-xl">
            <div className="font-mono text-xs text-blue-400 mb-6 border-b border-blue-500/20 pb-4">
              <div className="mb-1">$ whoami</div>
              <div className="text-green-400 mb-1">administrator</div>
              <div className="mb-1">$ sudo access --secure-area</div>
              <div className="text-yellow-400 mb-1">Password authentication required</div>
            </div>
            
            <form onSubmit={handleAuthenticate} className="space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-mono text-gray-300">
                    <span className="text-blue-400">$</span> Enter password:
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-blue-500" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-black/50 border border-blue-900/50 text-white font-mono text-sm rounded-md block w-full pl-10 pr-3 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-inner shadow-blue-900/10"
                    placeholder="Password"
                    required
                    autoFocus
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {authError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-mono text-xs text-red-500 bg-red-900/20 border border-red-500/30 p-4 rounded"
                >
                  <div className="flex items-start">
                    <div className="mr-2 text-red-400">ERROR:</div>
                    <div>{authError}</div>
                  </div>
                  <div className="mt-2 text-red-400/80">
                    Access denied. Retry with correct credentials.
                  </div>
                </motion.div>
              )}
              
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-900/30 border border-blue-500/30 rounded-md font-mono text-sm text-white hover:bg-blue-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                <Lock className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Authenticate</span>
              </button>
            </form>
            
            <div className="mt-6 pt-4 border-t border-blue-900/30 font-mono text-xs text-gray-500">
              <div className="flex items-center">
                <span className="text-green-500 mr-1">$</span>
                <span className="text-gray-400">Last login:</span>
                <span className="ml-1">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="mt-1 flex items-center">
                <span className="text-blue-400 mr-1">$</span>
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent rounded"></div>
        </motion.div>
      </div>
    );
  }
  
  // Admin dashboard
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black">
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(30,64,175,0.2) 0%, transparent 60%)`
            }}
          />
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-600/5 rounded-full filter blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>
      
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TerminalHeader title="~/admin/dashboard.sh" />
          <div className="bg-black/30 backdrop-blur-md border border-blue-500/20 border-t-0 p-6 rounded-b-lg">
            <div className="font-mono text-xs text-blue-400 mb-4">
              <div className="mb-1">$ whoami && pwd</div>
              <div className="text-green-400 mb-1">administrator /home/admin</div>
              <div className="mb-1">$ ./start_dashboard.sh --with-privileges</div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white font-mono">Admin Dashboard</h1>
                <p className="text-gray-400 font-mono text-sm">Logged in as Administrator</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 bg-green-900/20 border border-green-500/30 rounded-md">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-xs font-mono">ONLINE</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="inline-flex items-center px-4 py-2 bg-blue-900/30 border border-blue-500/30 rounded-md font-mono text-sm text-white hover:bg-blue-900/50 transition-colors"
                >
                  <span className="text-red-400 mr-2">$</span> logout
                </button>
              </div>
            </div>
            
            {/* Navigation Tabs */}
            <div className="mt-8 border-t border-blue-500/20 pt-4">
              <div className="flex flex-wrap gap-2">
                <button
                  className="px-4 py-2 bg-blue-900/40 text-white font-mono text-sm rounded-md border border-blue-500/30 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
                <button
                  className="px-4 py-2 bg-black/40 text-gray-400 font-mono text-sm rounded-md border border-gray-700 hover:border-blue-500/30 flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Projects</span>
                </button>
                <button
                  className="px-4 py-2 bg-black/40 text-gray-400 font-mono text-sm rounded-md border border-gray-700 hover:border-blue-500/30 flex items-center gap-1.5"
                >
                  <Refresh className="w-3.5 h-3.5" />
                  <span>Refresh Cache</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Success Alert */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg font-mono text-sm text-green-400 flex items-start gap-3"
          >
            <div className="w-5 h-5 rounded-full bg-green-900/50 border border-green-500/50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3" />
            </div>
            <div>
              <div className="font-semibold mb-1">Project added successfully!</div>
              <div className="text-green-500/80 text-xs">
                The project will appear on the Projects page after refreshing.
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Add Project Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -top-3 right-6">
            <div className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-t-lg font-mono text-xs border border-blue-500/30 border-b-0">
              editing
            </div>
          </div>
          
          <TerminalHeader title="~/admin/add-project.sh" />
          <div className="bg-black/30 backdrop-blur-md border border-blue-500/20 border-t-0 p-6 rounded-b-lg">
            <div className="font-mono text-xs text-blue-400 mb-6 border-b border-blue-500/20 pb-4">
              <div className="mb-1">$ vim new-project.json</div>
              <div className="text-gray-400 mb-1">-- INSERT MODE --</div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 font-mono mb-1 flex items-center">
                      <span className="text-blue-400 mr-1">*</span> Title:
                      <div className="ml-auto text-xs text-gray-500">required</div>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="bg-black/50 border border-blue-900/50 text-white font-mono text-sm rounded-md block w-full px-3 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-inner shadow-blue-900/10"
                        required
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 h-1.5 w-1.5 bg-blue-500 rounded-full animate-pulse opacity-50"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 font-mono mb-1 flex items-center">
                      <span className="text-blue-400 mr-1">*</span> Image URL:
                      <div className="ml-auto text-xs text-gray-500">required</div>
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="/project/your-image.jpg"
                        className="bg-black/50 border border-blue-900/50 text-white font-mono text-sm rounded-md block w-full pl-3 pr-10 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-inner shadow-blue-900/10"
                        required
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-blue-400 transition-colors">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      Path to image file (e.g. /project/image.jpg)
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 font-mono mb-1">
                      Video URL <span className="text-gray-500">(optional)</span>:
                    </label>
                    <input
                      type="text"
                      name="video"
                      value={formData.video}
                      onChange={handleChange}
                      placeholder="/project/your-video.mp4"
                      className="bg-black/50 border border-blue-900/50 text-white font-mono text-sm rounded-md block w-full px-3 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-inner shadow-blue-900/10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 font-mono mb-1 flex items-center">
                      <span className="text-blue-400 mr-1">*</span> Category:
                      <div className="ml-auto text-xs text-gray-500">required</div>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="bg-black/50 border border-blue-900/50 text-white font-mono text-sm rounded-md block w-full px-3 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-inner shadow-blue-900/10"
                      required
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 font-mono mb-1 flex items-center">
                      <span className="text-blue-400 mr-1">*</span> Description:
                      <div className="ml-auto text-xs text-gray-500">required</div>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="bg-black/50 border border-blue-900/50 text-white font-mono text-sm rounded-md block w-full px-3 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-inner shadow-blue-900/10"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 font-mono mb-1">
                      Live Link <span className="text-gray-500">(optional)</span>:
                    </label>
                    <div className="relative group">
                      <input
                        type="url"
                        name="liveLink"
                        value={formData.liveLink}
                        onChange={handleChange}
                        placeholder="https://your-site.com"
                        className="bg-black/50 border border-blue-900/50 text-white font-mono text-sm rounded-md block w-full pl-3 pr-10 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-inner shadow-blue-900/10"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-blue-400 transition-colors">
                        <Link className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 font-mono mb-1">
                      GitHub Link <span className="text-gray-500">(optional)</span>:
                    </label>
                    <div className="relative group">
                      <input
                        type="url"
                        name="githubLink"
                        value={formData.githubLink}
                        onChange={handleChange}
                        placeholder="https://github.com/yourusername/repo"
                        className="bg-black/50 border border-blue-900/50 text-white font-mono text-sm rounded-md block w-full pl-3 pr-10 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-inner shadow-blue-900/10"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-blue-400 transition-colors">
                        <Github className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Technologies */}
              <div className="space-y-3 pt-2 border-t border-blue-900/20">
                <label className="block text-sm font-medium text-gray-300 font-mono mb-1 flex items-center">
                  <span className="text-blue-400 mr-1">*</span> Technologies:
                  <div className="ml-auto text-xs text-gray-500">required</div>
                </label>
                <div className="flex flex-wrap gap-2 p-4 bg-black/20 rounded-lg border border-blue-900/20">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                        formData.tags.includes(tag)
                          ? "bg-blue-900/50 text-blue-300 border border-blue-500/50 shadow-md shadow-blue-900/20"
                          : "bg-black/50 text-gray-400 border border-gray-700 hover:border-blue-500/30"
                      }`}
                    >
                      {formData.tags.includes(tag) ? `[✓] ${tag}` : tag}
                    </button>
                  ))}
                </div>
                {formData.tags.length === 0 && (
                  <div className="text-xs text-yellow-500 font-mono">
                    Please select at least one technology
                  </div>
                )}
              </div>
              
              {/* Features */}
              <div className="space-y-3 pt-2 border-t border-blue-900/20">
                <label className="block text-sm font-medium text-gray-300 font-mono mb-1">
                  Key Features <span className="text-gray-500">(optional)</span>:
                </label>
                <div className="space-y-2 p-4 bg-black/20 rounded-lg border border-blue-900/20">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 font-mono text-xs">
                        {index + 1}.
                      </div>
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder={`Feature ${index + 1}`}
                        className="bg-black/50 border border-blue-900/50 text-white font-mono text-sm rounded-md block w-full pl-8 pr-3 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-inner shadow-blue-900/10"
                      />
                    </div>
                  ))}
                  <div className="text-xs text-gray-500 font-mono mt-2">
                    Add up to 5 key features of your project
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-end pt-4 border-t border-blue-900/20">
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-900/30 border border-blue-500/30 rounded-md font-mono text-sm text-white hover:bg-blue-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                  <Check className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
        
        {/* Added Projects */}
        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-3 right-6">
              <div className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-t-lg font-mono text-xs border border-blue-500/30 border-b-0">
                {projects.length} files
              </div>
            </div>
            
            <TerminalHeader title="~/admin/projects/list.sh" />
            <div className="bg-black/30 backdrop-blur-md border border-blue-500/20 border-t-0 p-6 rounded-b-lg">
              <div className="font-mono text-xs text-blue-400 mb-6 border-b border-blue-500/20 pb-4">
                <div className="mb-1">$ find ~/projects -type f -name "*.json" | grep "custom" | wc -l</div>
                <div className="text-green-400 mb-1">{projects.length}</div>
                <div className="mb-1">$ ls -la ~/projects/custom</div>
              </div>
              
              <div className="space-y-4">
                {projects.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {projects.map((project) => (
                      <motion.div 
                        key={project.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-black/40 rounded-lg border border-blue-900/30 overflow-hidden group hover:border-blue-500/40 transition-all duration-300"
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-48 flex-shrink-0 relative overflow-hidden">
                            <div className="aspect-video md:h-full">
                              <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                              />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                              <span className="text-xs font-mono text-white bg-blue-900/70 px-2 py-1 rounded">
                                {project.category}
                              </span>
                              <span className="text-xs font-mono text-white bg-black/70 px-2 py-1 rounded">
                                {project.tags.length} tags
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex-grow p-4 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-white font-mono text-lg flex items-center gap-2">
                                <span className="text-blue-400">$</span> {project.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleDeleteProject(project.id)}
                                  className="p-1.5 text-gray-500 hover:text-red-400 focus:outline-none hover:bg-red-900/20 rounded transition-colors"
                                  title="Delete project"
                                >
                                  <Trash className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {project.tags.map((tag) => (
                                <span key={tag} className="px-2 py-0.5 bg-blue-900/20 text-blue-400 rounded text-xs font-mono">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                            
                            <div className="mt-auto flex flex-wrap gap-3 pt-3 border-t border-blue-900/20">
                              {project.liveLink && (
                                <a
                                  href={project.liveLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-400 transition-colors font-mono"
                                >
                                  <Link className="w-3.5 h-3.5" />
                                  <span>demo</span>
                                </a>
                              )}
                              
                              {project.githubLink && (
                                <a
                                  href={project.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-400 transition-colors font-mono"
                                >
                                  <Github className="w-3.5 h-3.5" />
                                  <span>repo</span>
                                </a>
                              )}
                              
                              <div className="ml-auto text-xs text-gray-500 font-mono">
                                ID: {project.id.substring(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-500 font-mono text-sm">No custom projects found</div>
                    <div className="text-gray-600 font-mono text-xs mt-2">Add a project using the form above</div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Terminal Footer */}
        <div className="font-mono text-xs text-center text-gray-600 pt-8">
          <div className="inline-flex items-center gap-1.5 bg-black/30 px-4 py-2 rounded-lg border border-blue-900/20">
            <span className="text-green-400">admin@portfolio:</span>
            <span className="text-blue-400">~/admin$</span>
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </div>
  );
} 