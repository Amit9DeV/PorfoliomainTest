import React from "react";
import { motion } from "framer-motion";
import { TfiEmail } from "react-icons/tfi";
import { FaLinkedin, FaGithubSquare, FaReact } from "react-icons/fa";
import { FaPhoneVolume, FaCode } from "react-icons/fa6";
import { TbBrandRedux } from "react-icons/tb";
import { SiJavascript, SiExpress, SiMongodb } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { LiaNode } from "react-icons/lia";


const skills = [
  { name: "React", level: 90, icon: FaReact, color: "text-blue-400" },
  { name: "Node.js", level: 75, icon: LiaNode, color: "text-green-500" },
  { name: "MongoDB", level: 70, icon: SiMongodb, color: "text-green-600" },
  { name: "Express", level: 65, icon: SiExpress, color: "text-gray-400" },
  { name: "JavaScript", level: 90, icon: SiJavascript, color: "text-yellow-400" },
  { name: "Tailwind CSS", level: 85, icon: RiTailwindCssFill, color: "text-cyan-400" },
  { name: "Redux", level: 80, icon: TbBrandRedux, color: "text-purple-500" },
  { name: "HTML & CSS", level: 90, icon: FaCode, color: "text-orange-500" },
];

const experiences = [
  {
    year: "Sep 2024 - Nov 2024",
    duration: "3 months",
    title: "Internship Trainee",
    company: "CodeClause",
    description: "Assisted in the development of full-stack web applications using the MERN stack. Collaborated with senior developers to implement new features and fix bugs.",
  },
  {
    year: "Jul 2024 - Aug 2024",
    duration: "1 month",
    title: "Internship Trainee",
    company: "CodSoft",
    description: "Worked on various projects as an intern, gaining hands-on experience in web development, version control, and agile methodologies.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function About() {
  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">


      <div className="max-w-6xl mx-auto space-y-12 md:space-y-24">
        {/* About Me Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-white">
              About <span className="text-blue-500">Me</span>
            </h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                I am a passionate MERN Stack Developer with a deep love for creating elegant, efficient, and user-centric web applications.
              </p>
              <p>
                My journey in web development began with a curiosity about the mechanics of the internet, which quickly evolved into a dedicated career. I specialize in building full-stack applications using MongoDB, Express.js, React, and Node.js, always striving for clean code and exceptional user experiences.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or solving complex algorithmic problems—one function at a time.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors border border-white/10">
                <FaGithubSquare className="text-xl" /> GitHub
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors border border-white/10">
                <FaLinkedin className="text-xl" /> LinkedIn
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors border border-white/10">
                <TfiEmail className="text-xl" /> Email
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02]">
              <div className="aspect-[4/3] bg-gray-900/50 backdrop-blur-sm">
                <img
                  src="/avtar.jpg"
                  alt="My Workspace"
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Technical <span className="text-blue-500">Skills</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A curated list of technologies I use to build scalable and performant applications.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <skill.icon className={`text-3xl ${skill.color}`} />
                  <h3 className="font-semibold text-white">{skill.name}</h3>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-blue-500 rounded-full"
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>Proficiency</span>
                  <span>{skill.level}%</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Experience Timeline */}
        <section className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Work <span className="text-blue-500">Experience</span></h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-0 pl-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-transparent" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative pl-16 group"
                >
                  <div className="absolute left-[27px] top-2 w-3 h-3 bg-blue-500 rounded-full ring-4 ring-black/50 group-hover:ring-blue-500/30 transition-shadow" />

                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <span className="text-sm font-medium text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full w-fit">
                        {exp.year}
                      </span>
                    </div>
                    <div className="text-lg text-gray-300 font-medium mb-2">@{exp.company}</div>
                    <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
