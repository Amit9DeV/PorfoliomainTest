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
  <span className="inline-block w-3 h-5 bg-blue-500 ml-1" />
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
    <span className={className}>
      {displayText}
      {!isComplete && <Cursor />}
    </span>
  );
};

// Command button component - optimized for mobile
const CommandButton = ({ command, label, icon: Icon, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick(command)}
      className="group relative px-3 py-2 border border-blue-500/30 bg-blue-900/10 rounded-md text-left overflow-hidden hover:bg-blue-900/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0 w-6 h-6 bg-blue-900/30 rounded-full flex items-center justify-center border border-blue-500/30">
          <Icon className="w-3 h-3 text-blue-400" />
        </div>
        <div className="flex-grow min-w-0">
          <div className="text-gray-300 text-xs truncate">$ {command}</div>
          <div className="text-blue-300 font-mono text-sm truncate">{label}</div>
        </div>
        <ArrowRight className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0" />
      </div>
    </button>
  );
};

// Terminal line component - optimized for mobile
const TerminalLine = ({ username = "visitor", currentPath = "~/contact", children, delay = 0 }) => {
  return (
    <div className="font-mono text-xs sm:text-sm mb-2 break-words">
      <div>
        <span className="text-green-400">{username}@portfolio:</span>
        <span className="text-blue-400">{currentPath}$</span> {children}
      </div>
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

// Form field for contact form - optimized for mobile
const FormField = ({ label, type = "text", value, onChange, required = false, name, placeholder }) => {
  return (
    <div className="mb-3">
      <label className="block text-blue-400 text-xs uppercase tracking-wide font-mono mb-1">
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={3}
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
    </div>
  );
};

// Custom terminals - optimized for mobile
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
    <div className={`rounded-lg overflow-hidden border ${borderColor} shadow-2xl ${className}`}>
      <div className={`${headerBg} px-3 py-2 flex items-center`}>
        <div className="flex space-x-1.5 mr-3">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
        <div className="text-white font-mono text-xs sm:text-sm truncate">{title}</div>
      </div>
      <div className={`${bodyBg} p-3 sm:p-4 backdrop-blur-xl`}>
        {children}
      </div>
    </div>
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
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Contact Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactInfo.map((info) => (
            <CommandButton
              key={info.cmdName}
              command={info.cmdName}
              label={info.value}
              icon={info.icon}
              onClick={() => window.open(info.href, '_blank')}
            />
          ))}
        </div>

        {/* Contact Form Section */}
        <TerminalWindow title="Contact Form" className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
              <FormField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
            <FormField
              label="Message"
              type="textarea"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Enter your message"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </TerminalWindow>

        {/* Terminal Section */}
        <TerminalWindow title="Terminal" className="mt-6 hidden sm:block">
          <div className="space-y-2">
            <TerminalLine>
              <TypeWriter text="Welcome to the contact terminal!" />
            </TerminalLine>
            <TerminalLine>
              <TypeWriter text="Type 'help' to see available commands." delay={1000} />
            </TerminalLine>
            <div className="mt-4">
              <TerminalInput
                value={command}
                onChange={handleCommandChange}
                onSubmit={executeCommand}
                placeholder="Enter command..."
                disabled={commandExecuting}
              />
            </div>
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}