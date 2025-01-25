import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import { TransitionProvider } from "./transitions/ContentTransition";
import TransitionComponent from "./transitions/Transiton";
import AboutMotion2 from "./components/FrameMotion/AboutMotion2";
import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { WaveMaterial } from "./transitions/WaveMaterial";
import { easing } from "maath";
import Footer from "./components/Footer";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

function ShaderPlane() {
  const ref = useRef();
  const { viewport, size } = useThree();
  useFrame((state, delta) => {
    ref.current.time += delta;
    easing.damp3(ref.current.pointer, state.pointer, 0.2, delta);
  });
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <waveMaterial
        ref={ref}
        key={WaveMaterial.key}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
      />
    </mesh>
  );
}

function App() {
  return (
    <>
      <div className=" h-screen w-full  relative ">
        <div className="absolute  w-full h-screen ">
          <Canvas>
            <ShaderPlane />
          </Canvas>
        </div>
        <motion.ul
          animate={{ rotate: 360 }} // Rotate 360 degrees
          transition={{
            duration: 2, // Animation duration (seconds)
            ease: "easeInOut", // Smooth easing
          }}
        >
          <NavBar />

          <TransitionProvider>
            <Routes>
              <Route
                path=""
                element={
                  <TransitionComponent>
                    <Home />
                  </TransitionComponent>
                }
              />
              <Route
                path="About"
                element={
                  <TransitionComponent>
                    <About />
                  </TransitionComponent>
                }
              />
              <Route
                path="Projects"
                element={
                  <TransitionComponent>
                    <Projects />
                  </TransitionComponent>
                }
              />
              <Route
                path="Contact"
                element={
                  <TransitionComponent>
                    <Contact />
                  </TransitionComponent>
                }
              />
            </Routes>
          </TransitionProvider>
        </motion.ul>
        <div className="text-white ">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
