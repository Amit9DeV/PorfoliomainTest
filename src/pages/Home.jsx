import { motion, useScroll, useTransform } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useIsDesktop } from "../hooks/usePerformance";
import ResponsiveAnimation from "../components/ui/ResponsiveAnimation";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiPostgresql,
  SiDocker,
  SiAmazon,
  SiFigma,
} from "react-icons/si";
import { ArrowRight, Download, Github, Linkedin, Mail } from "iconoir-react";



const TechStack = () => {
  const isDesktop = useIsDesktop();
  const techs = [
    { Icon: SiReact, name: "React" },
    { Icon: SiNextdotjs, name: "Next.js" },
    { Icon: SiTailwindcss, name: "Tailwind" },
    { Icon: SiTypescript, name: "TypeScript" },
    { Icon: SiNodedotjs, name: "Node.js" },
    { Icon: SiPostgresql, name: "Postgres" },
    { Icon: SiDocker, name: "Docker" },
    { Icon: SiAmazon, name: "AWS" },
  ];

  return (
    <div className="py-12 md:py-20 border-y border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-medium text-gray-500 mb-8 md:mb-10 tracking-widest uppercase">
          Powering Next-Gen Applications
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-20 opacity-80">
          {techs.map(({ Icon, name }, index) => (
            <ResponsiveAnimation
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center gap-2 cursor-pointer"
            >
              <Icon className={`w-8 h-8 md:w-10 md:h-10 text-gray-400 transition-all duration-300 ${isDesktop ? 'group-hover:text-white group-hover:scale-110' : ''
                }`} />
              <span className={`text-xs text-gray-600 transition-colors absolute translate-y-12 ${isDesktop ? 'opacity-0 group-hover:opacity-100 group-hover:text-gray-300' : 'opacity-0'
                }`}>
                {name}
              </span>
            </ResponsiveAnimation>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const isDesktop = useIsDesktop();
  const { scrollY } = useScroll();
  // Only use parallax on desktop
  const y1 = useTransform(scrollY, [0, 500], [0, isDesktop ? 200 : 0]);
  const y2 = useTransform(scrollY, [0, 500], [0, isDesktop ? -150 : 0]);

  return (
    <div className="relative min-h-screen text-white">


      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 md:pt-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Text Content */}
          <div className="relative z-10 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-blue-300 mb-6 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Available for new projects
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                Simplifying Digital <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-indigo-400">
                  Complexity
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
                I am Amit Ram, a Full Stack Developer dedicated to transforming ideas into
                exceptional, high-performance web experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <NavLink
                to="/projects"
                className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </NavLink>

              <NavLink
                to="/contact"
                className="px-8 py-4 bg-white/5 border border-white/10 font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                Contact Me
              </NavLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="pt-8 flex items-center gap-6 text-gray-400"
            >
              {[
                { Icon: Github, href: "https://github.com/Amit9Dev" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/amit-ram-b8384a24b/" },
                { Icon: Mail, href: "mailto:cloud15333@gmail.com" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Visual Content - Abstract Composition */}
          <motion.div style={{ y: y2 }} className="relative hidden lg:block h-[600px]">
            {/* Main Image Card (Glass) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute top-10 right-10 w-[400px] h-[500px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/20 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
           <img src="./download.png" alt="download.png" />
              <div className="w-full h-full bg-slate-900/50 relative">
                {/* Abstract shape */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full blur-[80px] opacity-40"></div>
                {/* Code Snippet for visual interest */}
                <div className="absolute bottom-10 left-8 right-8 p-4 rounded-xl bg-black/40 border border-white/10 backdrop-blur-xl font-mono text-xs text-blue-300">
                  <div className="flex gap-1.5 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <p><span className="text-purple-400">const</span> <span className="text-yellow-200">future</span> = <span className="text-blue-400">new</span> <span className="text-green-300">DigitalExp</span>();</p>
                  <p>future.<span className="text-blue-200">initialize</span>();</p>
                </div>
              </div>
            </motion.div>


          </motion.div>
        </div>
      </section>

      <TechStack />

      {/* Stats/About Teaser */}
      <section className="py-16 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Beyond the Code</h2>
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  I don't just write code; I engineer solutions. My approach is rooted
                  in a deep technical understanding and a passion for creating interfaces
                  that feel natural and intuitive.
                </p>
                <p>
                  Whether I'm optimizing database queries or refining micro-animations,
                  I strive for excellence in every layer of the stack.
                </p>
                <div className="pt-4">
                  <NavLink to="/about" className="text-blue-400 font-medium hover:text-blue-300 inline-flex items-center gap-2 group">
                    More about me <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Projects", value: "15+" },
                { label: "Experience", value: "1+ Years" },
                { label: "Commits", value: "500+" },
                { label: "Coffee", value: "∞" }
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}