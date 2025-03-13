import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import { TransitionProvider } from "./transitions/ContentTransition";
import TransitionComponent from "./transitions/Transiton";
import { Canvas } from "@react-three/fiber";
import { WaveMaterial } from "./transitions/WaveMaterial";
import { easing } from "maath";
import Footer from "./components/Footer";
import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import "./App.css";

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
    <div className="relative min-h-screen bg-black">
      {/* Background Canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <ShaderPlane />
        </Canvas>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        <NavBar />
        
        <main className="pt-16">
          <TransitionProvider>
            <AnimatePresence mode="wait">
              <Routes>
                <Route
                  path=""
                  element={
                    <TransitionComponent>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Home />
                      </motion.div>
                    </TransitionComponent>
                  }
                />
                <Route
                  path="About"
                  element={
                    <TransitionComponent>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <About />
                      </motion.div>
                    </TransitionComponent>
                  }
                />
                <Route
                  path="Projects"
                  element={
                    <TransitionComponent>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Projects />
                      </motion.div>
                    </TransitionComponent>
                  }
                />
                <Route
                  path="Contact"
                  element={
                    <TransitionComponent>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Contact />
                      </motion.div>
                    </TransitionComponent>
                  }
                />
              </Routes>
            </AnimatePresence>
          </TransitionProvider>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
