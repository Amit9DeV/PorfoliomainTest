import { memo, useState, useEffect, lazy, Suspense } from "react";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import "./App.css";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const Admin = lazy(() => import("./pages/Admin"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <motion.div
      className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

// Custom hook for mobile detection
const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Memoize the PageWrapper component
const PageWrapper = memo(function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
});

function App() {
  return (
    <div className="relative min-h-screen bg-black">
      <ScrollToTop />
      
      {/* Content Container */}
      <div className="relative z-10">
        <NavBar />
        
        <main className="pt-16">
          <Suspense fallback={<PageLoader />}>
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
                path="/about"
                element={
                  <PageWrapper>
                    <About />
                  </PageWrapper>
                }
              />
              <Route
                path="/projects"
                element={
                  <PageWrapper>
                    <Projects />
                  </PageWrapper>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageWrapper>
                    <Contact />
                  </PageWrapper>
                }
              />
              <Route
                path="/admin"
                element={
                  <PageWrapper>
                    <Admin />
                  </PageWrapper>
                }
              />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default memo(App);
