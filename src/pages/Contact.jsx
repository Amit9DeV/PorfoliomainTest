import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, Phone, MapPin, ArrowRight, Check, X } from "iconoir-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+919334135467",
    href: "tel:+919334135467",
    cmdName: "call",
  },
  {
    icon: Mail,
    label: "Email",
    value: "cloud15333@gmail.com",
    href: "mailto:cloud15333@gmail.com",
    cmdName: "email",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "Amit9Dev",
    href: "https://github.com/Amit9Dev",
    cmdName: "github",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Amit Ram",
    href: "https://www.linkedin.com/in/amit-ram-b8384a24b/",
    cmdName: "linkedin",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bihar, India",
    href: "https://goo.gl/maps/VJqt9kfGVnJ2RKUS6",
    cmdName: "locate",
  },
];

// Cursor blink component
const Cursor = () => (
  <motion.span
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
    className="inline-block w-3 h-5 bg-blue-500 ml-1"
  />
);

// Terminal text animation
const TypeWriter = ({ text, delay = 0, className = "", speed = 50, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const index = useRef(0);

  useEffect(() => {
    if (index.current < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prevText) => prevText + text.charAt(index.current));
        index.current += 1;
      }, speed);
      
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
      if (onComplete) onComplete();
    }
  }, [displayText, text, speed, onComplete]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
      className={className}
    >
      {displayText}
      {!isComplete && <Cursor />}
    </motion.span>
  );
};

// Command button component
const CommandButton = ({ command, label, icon: Icon, onClick, disabled }) => {
  return (
    <motion.button
      disabled={disabled}
      onClick={() => onClick(command)}
      className="group relative px-4 py-2.5 border border-blue-500/30 bg-blue-900/10 rounded-md text-left overflow-hidden hover:bg-blue-900/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-blue-900/30 rounded-full flex items-center justify-center border border-blue-500/30">
          <Icon className="w-4 h-4 text-blue-400" />
        </div>
        <div className="flex-grow">
          <div className="text-gray-300 text-xs">$ {command}</div>
          <div className="text-blue-300 font-mono text-sm">{label}</div>
        </div>
        <ArrowRight className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
      </div>
    </motion.button>
  );
};

// Terminal line component
const TerminalLine = ({ username = "visitor", currentPath = "~/contact", children, delay = 0 }) => {
  return (
    <div className="font-mono text-sm mb-2">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay }}
      >
        <span className="text-green-400">{username}@portfolio:</span>
        <span className="text-blue-400">{currentPath}$</span> {children}
      </motion.div>
    </div>
  );
};

// Custom terminal input
const TerminalInput = ({ value, onChange, onSubmit, placeholder, disabled }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !disabled) {
      onSubmit();
    }
  };

  return (
    <div className="flex items-center gap-2 font-mono bg-transparent">
      <span className="text-green-400">visitor@portfolio:</span>
      <span className="text-blue-400">~/contact$</span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        className="flex-grow bg-transparent border-none outline-none text-white placeholder-gray-600 font-mono"
        autoFocus
      />
    </div>
  );
};

// Form field for contact form
const FormField = ({ label, type = "text", value, onChange, required = false, name, placeholder }) => {
  return (
    <motion.div 
      className="mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-blue-400 text-xs uppercase tracking-wide font-mono mb-1">
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={4}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-black/30 border border-blue-500/30 rounded-md text-white placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none font-mono text-sm transition-all duration-300"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-black/30 border border-blue-500/30 rounded-md text-white placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono text-sm transition-all duration-300"
        />
      )}
    </motion.div>
  );
};

// Custom terminals
const TerminalWindow = ({ title, children, className = "", variant = "primary" }) => {
  let headerBg, bodyBg, borderColor;
  
  switch (variant) {
    case "success":
      headerBg = "bg-green-900/50";
      bodyBg = "bg-black/80";
      borderColor = "border-green-500/30";
      break;
    case "error":
      headerBg = "bg-red-900/50";
      bodyBg = "bg-black/80";
      borderColor = "border-red-500/30";
      break;
    case "primary":
    default:
      headerBg = "bg-blue-900/50";
      bodyBg = "bg-black/80";
      borderColor = "border-blue-500/30";
  }
  
  return (
    <motion.div
      className={`rounded-lg overflow-hidden border ${borderColor} shadow-2xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={`${headerBg} px-4 py-2 flex items-center`}>
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-white font-mono text-sm">{title}</div>
      </div>
      <div className={`${bodyBg} p-4 backdrop-blur-xl`}>
        {children}
      </div>
    </motion.div>
  );
};

export default function Contact() {
  const [activeTab, setActiveTab] = useState("terminal");
  const [command, setCommand] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([
    { type: "intro", content: "Welcome to the interactive contact terminal." },
    { type: "intro", content: "Type 'help' for available commands or select an option below." },
  ]);

  const [commandExecuting, setCommandExecuting] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const terminalRef = useRef(null);
  
  // Scroll terminal to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCommandChange = (e) => {
    setCommand(e.target.value);
  };

  const executeCommand = (cmd = command) => {
    // Add user command to history
    setTerminalHistory((prev) => [
      ...prev,
      { type: "command", content: cmd },
    ]);
    
    setCommandExecuting(true);
    setCommand("");
    
    // Process command after small delay to show "typing" effect
    setTimeout(() => {
      processCommand(cmd.toLowerCase().trim());
      setCommandExecuting(false);
    }, 500);
  };

  const processCommand = (cmd) => {
    // Handle help command
    if (cmd === "help") {
      setTerminalHistory((prev) => [
        ...prev,
        { 
          type: "response", 
          content: [
            "Available commands:",
            "- help: Show this help menu",
            "- clear: Clear terminal",
            "- contact: Open contact form",
            "- call: Get phone number",
            "- email: Send email",
            "- github: View GitHub profile",
            "- linkedin: View LinkedIn profile",
            "- locate: Show location",
            "- exit: Minimize terminal"
          ] 
        },
      ]);
      return;
    }
    
    // Handle clear command
    if (cmd === "clear") {
      setTerminalHistory([]);
      return;
    }
    
    // Handle contact command
    if (cmd === "contact") {
      setShowContactForm(true);
      setTerminalHistory((prev) => [
        ...prev,
        { type: "response", content: ["Opening contact form..."] },
      ]);
      return;
    }
    
    // Handle locate command
    if (cmd === "locate") {
      setShowMap(true);
      setTerminalHistory((prev) => [
        ...prev,
        { type: "response", content: ["Loading map..."] },
      ]);
      return;
    }
    
    // Handle exit command
    if (cmd === "exit") {
      setTerminalHistory((prev) => [
        ...prev,
        { type: "response", content: ["Closing terminal..."] },
      ]);
      
      // Reset after animation
      setTimeout(() => {
        setActiveTab("terminal");
        setTerminalHistory([
          { type: "intro", content: "Terminal minimized. Click to reopen." },
        ]);
      }, 1000);
      return;
    }
    
    // Handle contact info commands
    const contactCommand = contactInfo.find(
      (info) => info.cmdName === cmd
    );
    
    if (contactCommand) {
      // If it's a link, open it
      if (contactCommand.href) {
        window.open(contactCommand.href, "_blank");
      }
      
      setTerminalHistory((prev) => [
        ...prev,
        { 
          type: "response", 
          content: [
            `${contactCommand.label}: ${contactCommand.value}`,
            contactCommand.href ? `Opening ${contactCommand.label.toLowerCase()} link...` : "",
          ].filter(Boolean)
        },
      ]);
      return;
    }
    
    // Unknown command
    setTerminalHistory((prev) => [
      ...prev,
      { 
        type: "error", 
        content: [
          `Command not found: ${cmd}`,
          "Type 'help' for available commands."
        ] 
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSubmitStatus("success");
      setTerminalHistory((prev) => [
        ...prev,
        { 
          type: "response", 
          content: [
            "Message sent successfully!",
            "I'll get back to you soon."
          ] 
        },
      ]);
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      // Close form after success
      setTimeout(() => {
        setShowContactForm(false);
      }, 3000);
      
    } catch (error) {
      setSubmitStatus("error");
      setTerminalHistory((prev) => [
        ...prev,
        { 
          type: "error", 
          content: [
            "Failed to send message.",
            "Please try again or use another contact method."
          ] 
        },
      ]);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 4000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Futuristic Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10" />
        
        {/* Animated glow spots */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full filter blur-3xl animate-pulse" 
          style={{ animationDuration: '7s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-blue-500/5 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDuration: '10s', animationDelay: '1s' }} />
          
        {/* Code matrix effect background - made with CSS grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold font-mono bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 bg-clip-text text-transparent">
            &lt;Contact Terminal&gt;
          </h1>
          <p className="text-blue-300 md:text-lg max-w-3xl mx-auto font-mono">
            Interactive command-line interface to connect with me.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Main Terminal */}
            <TerminalWindow 
              title="contact@amit-portfolio ~ (bash)"
              className="h-[600px] md:h-[700px] flex flex-col"
            >
              <div 
                ref={terminalRef}
                className="font-mono text-sm overflow-y-auto flex-grow custom-scrollbar mb-4"
                style={{ maxHeight: 'calc(100% - 40px)' }}
              >
                {terminalHistory.map((item, index) => {
                  if (item.type === "command") {
                    return (
                      <TerminalLine key={index} delay={0.1}>
                        {item.content}
                      </TerminalLine>
                    );
                  } else if (item.type === "intro") {
                    return (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="text-blue-300 mb-1"
                      >
                        {item.content}
                      </motion.div>
                    );
                  } else if (item.type === "error") {
                    return (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 mb-2 pl-6"
                      >
                        {item.content.map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </motion.div>
                    );
                  } else {
                    return (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-green-300 mb-2 pl-6"
                      >
                        {item.content.map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </motion.div>
                    );
                  }
                })}

                {/* Contact Form */}
                <AnimatePresence>
                  {showContactForm && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="mt-4 p-4 border border-blue-500/30 rounded-md bg-black/30 backdrop-blur-md"
                    >
                      {submitStatus === "success" ? (
                        <div className="text-center p-4">
                          <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4 border border-green-500/30">
                            <Check className="w-8 h-8 text-green-400" />
                          </div>
                          <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                          <p className="text-gray-300 mb-6">Thanks for reaching out. I'll be in touch shortly.</p>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              label="Name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              placeholder="Your name"
                            />
                            <FormField
                              label="Email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder="your.email@example.com"
                            />
                          </div>
                          <FormField
                            label="Subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="Message subject"
                          />
                          <FormField
                            label="Message"
                            name="message"
                            type="textarea"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Type your message here..."
                          />
                          
                          <div className="flex justify-between items-center">
                            <button
                              type="button"
                              onClick={() => setShowContactForm(false)}
                              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                            >
                              Cancel
                            </button>
                            <motion.button
                              type="submit"
                              disabled={isSubmitting}
                              className="px-6 py-2 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 rounded-md text-blue-300 font-mono flex items-center gap-2 disabled:opacity-50"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {isSubmitting ? (
                                <>
                                  <svg className="animate-spin h-4 w-4 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Processing...
                                </>
                              ) : (
                                <>
                                  $ send_message
                                </>
                              )}
                            </motion.button>
                    </div>
    
                          {submitStatus === "error" && (
                            <div className="flex items-center gap-2 p-3 rounded-md bg-red-500/20 text-red-400 border border-red-500/30">
                              <X className="w-5 h-5 flex-shrink-0" />
                              <span>Failed to send message. Please try again.</span>
                            </div>
                          )}
                </form>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Map Display */}
                <AnimatePresence>
                  {showMap && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mt-4 relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-400/10 rounded-lg blur opacity-30 z-0" />
                      <div className="relative z-10 border border-blue-500/30 rounded-lg overflow-hidden bg-black/30 backdrop-blur-md">
                        <div className="p-2 bg-blue-900/30 border-b border-blue-500/30 flex justify-between items-center">
                          <span className="text-xs text-blue-300 font-mono">location: Bihar, India</span>
                          <button 
                            onClick={() => setShowMap(false)}
                            className="text-gray-400 hover:text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="aspect-video overflow-hidden">
                          <iframe
                            title="Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600.890430006037!2d85.13756661501636!3d25.61490998370096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58dce6732867%3A0x4b0c2c337c864b01!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1647887774745!5m2!1sen!2sin"
                            className="w-full h-full"
                            loading="lazy"
                            style={{ border: 0 }}
                          />
                        </div>
                        <div className="p-2 bg-blue-900/30 border-t border-blue-500/30 flex justify-end">
                          <a 
                            href="https://goo.gl/maps/VJqt9kfGVnJ2RKUS6" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 text-xs flex items-center hover:text-blue-300 transition-colors"
                          >
                            <span>Open in Google Maps</span>
                            <ArrowRight className="ml-1 w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Terminal Input */}
              <TerminalInput
                value={command}
                onChange={handleCommandChange}
                onSubmit={() => executeCommand()}
                placeholder="Type a command (try 'help')"
                disabled={commandExecuting || showContactForm}
              />
            </TerminalWindow>
          </div>
          
          <div className="space-y-6">
            {/* Quick Commands */}
            <TerminalWindow title="Quick Commands">
              <div className="space-y-2">
                <div className="text-blue-400 mb-2 text-sm">Select a command to execute:</div>
                {contactInfo.map((info) => (
                  <CommandButton
                    key={info.cmdName}
                    command={info.cmdName}
                    label={info.label}
                    icon={info.icon}
                    onClick={executeCommand}
                    disabled={commandExecuting}
                  />
                ))}
                <CommandButton
                  command="contact"
                  label="Send me a message"
                  icon={Mail}
                  onClick={executeCommand}
                  disabled={commandExecuting}
                />
                <CommandButton
                  command="help"
                  label="Show available commands"
                  icon={Check}
                  onClick={executeCommand}
                  disabled={commandExecuting}
                />
              </div>
            </TerminalWindow>
            
            {/* Terminal Info */}
            <TerminalWindow title="System Info" variant="primary">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">OS</span>
                  <span className="text-blue-300 font-mono">Portfolio.OS v1.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Connection</span>
                  <span className="text-green-300 font-mono">• Secure</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-300 font-mono">• Online</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Response Time</span>
                  <span className="text-blue-300 font-mono">Fast</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Hiring Status</span>
                  <span className="text-green-300 font-mono">• Available</span>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-900/30">
                  <div className="text-xs text-blue-400 mb-2">System Message</div>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Thank you for visiting my portfolio terminal. I'm excited to collaborate on new projects and opportunities!
                  </p>
                </div>
              </div>
            </TerminalWindow>
            </div>
        </div>
    </div>
    </motion.div>
  );
}