import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { LuArrowBigDownDash } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import AboutMotion from "../components/FrameMotion/AboutMotion";
import AboutMotion2 from "../components/FrameMotion/AboutMotion2";
import { FaReact } from "react-icons/fa";
import { TbBrandRedux } from "react-icons/tb";
import { SiJavascript } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { LiaNode } from "react-icons/lia";
import { SiExpress } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { motion } from "framer-motion";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// Custom Hook for Advanced Scroll Animation
const useAdvancedScrollAnimation = ({
  triggerSelector,
  animationConfig,
  scrollTriggerConfig,
}) => {
  useEffect(() => {
    const elements = document.querySelectorAll(triggerSelector);

    elements.forEach((element) => {
      gsap.fromTo(element, animationConfig.from, {
        ...animationConfig.to,
        scrollTrigger: {
          trigger: element,
          start: scrollTriggerConfig.start || "top 90%",
          end: scrollTriggerConfig.end || "bottom 0%",
          scrub: scrollTriggerConfig.scrub || true,
          markers: scrollTriggerConfig.markers || false,
          pin: scrollTriggerConfig.pin || false,
          anticipatePin: scrollTriggerConfig.anticipatePin || 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [triggerSelector, animationConfig, scrollTriggerConfig]);
};

const skills = [
  { name: "React", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "MongoDB", level: 80 },
  { name: "Express", level: 85 },
  { name: "JavaScript", level: 90 },
  { name: "TypeScript", level: 75 },
  { name: "Tailwind CSS", level: 85 },
  { name: "Three.js", level: 70 },
];

const experiences = [
  {
    year: "2023 - Present",
    title: "Senior MERN Stack Developer",
    company: "Tech Company Name",
    description: "Leading development of full-stack web applications using MERN stack.",
  },
  {
    year: "2021 - 2023",
    title: "Full Stack Developer",
    company: "Previous Company Name",
    description: "Developed and maintained multiple web applications using modern technologies.",
  },
  {
    year: "2020 - 2021",
    title: "Junior Developer",
    company: "First Company Name",
    description: "Started my journey in web development, focusing on front-end technologies.",
  },
];

export default function About() {
  useAdvancedScrollAnimation({
    triggerSelector: ".animateSection2",
    animationConfig: {
      from: { opacity: 0, scale: 0.5 },
      to: { opacity: 1, scale: 1 },
    },
    scrollTriggerConfig: {
      start: "top 90%",
      end: "bottom 0%",
    },
  });

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* About Me Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm a passionate MERN stack developer with 3+ years of experience in building
                modern web applications. My journey in web development started with a
                curiosity about how things work on the internet, and it has evolved into a
                full-fledged career in creating beautiful and functional web experiences.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                I specialize in building full-stack applications using MongoDB, Express.js,
                React, and Node.js. I'm also experienced in modern front-end technologies
                and best practices, always striving to create responsive and user-friendly
                interfaces.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
                <img
                  src="/coding-setup.jpg"
                  alt="My Workspace"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/5 backdrop-blur-xl rounded-lg p-4 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 * index }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.year}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="relative pl-8 pb-8 border-l-2 border-purple-500/30 last:pb-0"
              >
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                <div className="space-y-2">
                  <span className="text-sm text-purple-400">{exp.year}</span>
                  <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                  <p className="text-gray-400">{exp.company}</p>
                  <p className="text-gray-300">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
