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
import { Terminal, ArrowRight, Code, Download, ArrowDown } from "iconoir-react";

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
      <div className="text-gray-400 font-mono text-xs">visitor@amit-portfolio</div>
    </div>
  </div>
);

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
  { name: "Node.js", level: 75 },
  { name: "MongoDB", level: 70 },
  { name: "Express", level: 65 },
  { name: "JavaScript", level: 90 },
  { name: "Tailwind CSS", level: 85 },
  { name: "Microsoft Word", level: 75 },
  { name: "Microsoft Excel", level: 60 },
  { name: "Tally", level: 40 },
  { name: "Redux", level: 80 },
  { name: "Git", level: 70 },
  { name: "HTML & CSS", level: 90 },
  { name: "Bootstrap", level: 75 },

];
const experiences = [
  {
    year: "Sep 2024 - Nov 2024 · 3 months",
    title: "Internship Trainee",
    company: "CodeClause",
    description: "Assisted in the development of full-stack web applications using the MERN stack.",
  },
  {
    year: "Jul 2024 - Aug 2024 · 1 month",
    title: "Internship Trainee",
    company: "CodSoft",
    description: "Worked on various projects as an intern, gaining hands-on experience in web development.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* About Me Section */}
        <section className="space-y-8">
          <div className="mb-6">
            <TerminalHeader title="~/personal-info.md" />
            <div className="font-mono text-xs text-blue-400 mb-4 mt-3 bg-black/30 p-2 rounded-b-lg border border-blue-500/20 border-t-0">
              $ cat personal-info.md | more
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-mono text-white border-l-2 border-blue-500 pl-3">
                <span className="text-blue-400">function</span> <span className="text-green-400">aboutMe</span><span className="text-yellow-500">()</span> {"{"}
              </h2>
              <div className="pl-6 space-y-4 border-l border-dashed border-blue-500/30">
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
              </div>
              <div className="text-white font-mono">{"}"}</div>
            </div>
            <div className="relative">
              <TerminalHeader title="~/workspace.jpg" />
              <div className="aspect-w-16 aspect-h-9 rounded-b-lg overflow-hidden border border-blue-500/20 border-t-0">
                <img
                  src="/avtar.jpg"
                  alt="My Workspace"
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/70 backdrop-blur-sm font-mono text-xs text-green-400">
                  $ image --view workspace.jpg --resolution 1920x1080
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="space-y-8">
          <div className="mb-6">
            <TerminalHeader title="~/skills.json" />
            <div className="font-mono text-xs text-blue-400 mb-4 mt-3 bg-black/30 p-2 rounded-b-lg border border-blue-500/20 border-t-0">
              $ skills --list --sort level:desc | render
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="bg-black/30 backdrop-blur-xl rounded-lg p-4 space-y-2 border border-blue-500/20"
              >
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium font-mono">{skill.name}</span>
                  <span className="text-blue-400 font-mono text-sm">{skill.level}%</span>
                </div>
                <div className="h-2 bg-blue-900/20 rounded-full overflow-hidden border border-blue-500/10">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400 font-mono">
                  [<span className="text-yellow-500">{skill.level >= 80 ? 'Expert' : skill.level >= 70 ? 'Advanced' : 'Intermediate'}</span>]
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="space-y-8">
          <div className="mb-6">
            <TerminalHeader title="~/experience.log" />
            <div className="font-mono text-xs text-blue-400 mb-4 mt-3 bg-black/30 p-2 rounded-b-lg border border-blue-500/20 border-t-0">
              $ cat experience.log | tail -n 10 | less
            </div>
          </div>
          
          <div className="space-y-8">
            {experiences.map((exp) => (
              <div
                key={exp.year}
                className="relative pl-8 pb-8 border-l-2 border-blue-500/30 last:pb-0"
              >
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500" />
                <div className="space-y-2">
                  <span className="text-sm text-blue-400 font-mono">[{exp.year}]</span>
                  <h3 className="text-xl font-semibold text-white font-mono">{exp.title}</h3>
                  <p className="text-gray-400 font-mono text-sm">@{exp.company}</p>
                  <p className="text-gray-300 border-l-2 border-blue-500/20 pl-3">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center pt-8">
            <div className="font-mono text-xs flex items-center gap-2">
              <span className="text-green-400">visitor@portfolio:</span>
              <span className="text-blue-400">~/about$</span>
              <span className="text-gray-300">echo "Thanks for visiting!"</span>
              <div className="w-2 h-4 bg-blue-500 ml-1 animate-pulse" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
