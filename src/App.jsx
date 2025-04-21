import { memo, useCallback, useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
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

// Memoize the ShaderPlane component
const ShaderPlane = memo(function ShaderPlane() {
  const ref = useRef();
  const { viewport, size } = useThree();
  
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.time += delta * 0.5; // Reduced animation speed
    easing.damp3(ref.current.pointer, state.pointer, 0.1, delta); // Reduced pointer damping
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
});

// Memoize the PageWrapper component
const PageWrapper = memo(function PageWrapper({ children }) {
  return (
    <TransitionComponent>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }} // Reduced duration
      >
        {children}
      </motion.div>
    </TransitionComponent>
  );
});

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Canvas - Only render on desktop */}
      {!isMobile && (
        <div className="fixed inset-0 z-0">
          <Canvas>
            <ShaderPlane />
          </Canvas>
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10">
        <NavBar />
        
        <main className="pt-16">
          <TransitionProvider>
            <AnimatePresence mode="wait">
              <Routes>
                <Route
                  path="/"
                  element={
                    <PageWrapper>
                      <Home />
                    </PageWrapper>
                  }
                />
                <Route
                  path="About"
                  element={
                    <PageWrapper>
                      <About />
                    </PageWrapper>
                  }
                />
                <Route
                  path="Projects"
                  element={
                    <PageWrapper>
                      <Projects />
                    </PageWrapper>
                  }
                />
                <Route
                  path="Contact"
                  element={
                    <PageWrapper>
                      <Contact />
                    </PageWrapper>
                  }
                />
                <Route
                  path="Admin"
                  element={
                    <PageWrapper>
                      <Admin />
                    </PageWrapper>
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

export default memo(App);
