import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { LuArrowBigDownDash } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";

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
    <>
      <div className=" flex w-full  justify-center">
        <div class=" h-screen absolute flex items-center justify-center flex-col md:pt-7 ">
          <div class="items-center max-w-screen-xl p-2   md:px-8  md:py-8 md:mx-auto lg:grid grid-cols-4 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6 flex-col md:flex-row backdrop-blur-3xl border">
            <div class="col-span-2 mb-8">
              <p class="text-4xl cursor-pointer hover:text-purple-800 transition font-medium text-purple-500 dark:text-purple-500">
                Amit Ram
              </p>
              <h2 class="mt-3 mb-4 text-3xl font-extrabold tracking-tight  md:text-3xl text-green-600 ">
                MERN Stack Developer
              </h2>
              <p class="font-light text-gray-300 sm:text-xl dark:text-gray-400">
                Passionate and detail-oriented MERN Stack Developer with a
                strong foundation in MongoDB, Express.js, React, and Node.js. I
                thrive in creating dynamic and scalable web applications,
                blending cutting-edge technology with innovative solutions. My
                experience spans full-stack development, where I’ve successfully
                built and maintained both frontend and backend systems, ensuring
                seamless user experiences and robust functionality.
              </p>
              <div class="pt-6 mt-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <a
                    href="/Amit Ram.pdf"
                    class="inline-flex items-center text-4xl font-medium text-green-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700"
                  >
                    Resume
                    <svg
                      class="w-10 h-5 ml-1  "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div class="col-span-2 space-y-8 grid grid-cols-2 md:gap-12 md:space-y-0 ">
              <div>
                <TfiEmail className="text-4xl text-purple-700 " />
                <h3 class="mb-2 text-2xl font-bold dark:text-white">Email</h3>
                <p class="font-light text-green-600 text-xl dark:text-gray-400">
                  cloud15333@gmail.com
                </p>
              </div>
              <div className="pl-9 md:pl-0">
                <a href="https://www.linkedin.com/in/amit-ram-b8384a24b/">
                  <FaLinkedin className="text-4xl text-purple-700 " />
                  <h3 class="mb-2 text-2xl font-bold dark:text-white">
                    linkedin
                  </h3>
                  <p class="font-light text-gray-500 dark:text-gray-400">
                    Amit Ram
                  </p>
                </a>
              </div>
              <div>
                <a href="https://github.com/Amit9DeV">
                  <FaGithubSquare className="text-4xl text-purple-700" />
                  <h3 class="mb-2 text-2xl font-bold dark:text-white">
                    GitHub
                  </h3>
                  <p class="font-light text-gray-500 dark:text-gray-400">
                    {" "}
                    Amit9Dev
                  </p>
                </a>
              </div>
              <div className="pl-9 md:pl-0">
                <FaPhoneVolume className="text-4xl text-purple-700" />
                <h3 class="mb-2 text-2xl font-bold dark:text-white">
                  contact number
                </h3>
                <p class="font-light text-green-600 dark:text-gray-400">
                  +919334135467
                </p>
              </div>
            </div>
          </div>
        </div>
{/*         
<div className="animateSection2" style={{ height: '100vh', background: '#6f61ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Another animated section</h2>
      </div> */}
      </div>
    </>
  );
}
