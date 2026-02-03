import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, MapPin, Send, CheckCircle, Xmark, WarningCircle } from "iconoir-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SEO from "../components/SEO";

// Validation Schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 93341 35467",
    href: "tel:+919334135467",
    color: "text-green-400",
    bg: "bg-green-400/10"
  },
  {
    icon: Mail,
    label: "Email",
    value: "cloud15333@gmail.com",
    href: "mailto:cloud15333@gmail.com",
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    icon: Github,
    label: "GitHub",
    value: "Amit9Dev",
    href: "https://github.com/Amit9Dev",
    color: "text-white",
    bg: "bg-white/10"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Amit Ram",
    href: "https://www.linkedin.com/in/amit-ram-b8384a24b/",
    color: "text-blue-600",
    bg: "bg-blue-600/10"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bihar, India",
    href: "https://goo.gl/maps/VJqt9kfGVnJ2RKUS6",
    color: "text-red-400",
    bg: "bg-red-400/10"
  },
];

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setSubmitStatus(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const emailBody = `Name: ${data.name}%0D%0AEmail: ${data.email}%0D%0ASubject: ${data.subject}%0D%0AMessage: ${data.message}`;
      window.location.href = `mailto:cloud15333@gmail.com?subject=${data.subject}&body=${emailBody}`;

      setSubmitStatus("success");
      reset();
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="relative min-h-screen pt-24 md:pt-32 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Contact"
        description="Get in touch with Amit Ram. Available for freelance projects and full-time opportunities."
      />

      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Have a project in mind or just want to say hi? I'm always open to discussing new projects, creative ideas, or opportunities to contribute to your vision.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-[1.02] transition-all group"
              >
                <div className={`p-4 rounded-xl ${info.bg} ${info.color} group-hover:scale-110 transition-transform`}>
                  <info.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">{info.label}</h3>
                  <p className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {info.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
            <form onSubmit={handleSubmit(onSubmit)} className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl space-y-6 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    placeholder="Enter your name"
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:ring-1 transition-all outline-none ${errors.name ? "border-red-500/50 focus:border-red-500 focus:ring-red-500" : "border-white/10 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 flex items-center gap-1 ml-1">
                      <WarningCircle className="w-3 h-3" /> {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:ring-1 transition-all outline-none ${errors.email ? "border-red-500/50 focus:border-red-500 focus:ring-red-500" : "border-white/10 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 flex items-center gap-1 ml-1">
                      <WarningCircle className="w-3 h-3" /> {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-300 ml-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  {...register("subject")}
                  placeholder="What is this about?"
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:ring-1 transition-all outline-none ${errors.subject ? "border-red-500/50 focus:border-red-500 focus:ring-red-500" : "border-white/10 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                />
                {errors.subject && (
                  <p className="text-xs text-red-400 flex items-center gap-1 ml-1">
                    <WarningCircle className="w-3 h-3" /> {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">Message</label>
                <textarea
                  id="message"
                  {...register("message")}
                  rows="4"
                  placeholder="Tell me about your project..."
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:ring-1 transition-all outline-none resize-none ${errors.message ? "border-red-500/50 focus:border-red-500 focus:ring-red-500" : "border-white/10 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                />
                {errors.message && (
                  <p className="text-xs text-red-400 flex items-center gap-1 ml-1">
                    <WarningCircle className="w-3 h-3" /> {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${isSubmitting
                  ? "bg-blue-600/50 cursor-wait"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5"
                  }`}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 text-sm font-medium p-3 rounded-lg ${submitStatus === 'success'
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}
                >
                  {submitStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Message sent successfully!
                    </>
                  ) : (
                    <>
                      <Xmark className="w-4 h-4" />
                      Failed to send message. Please try again.
                    </>
                  )}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}