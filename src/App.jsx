import { memo, useState, useEffect, lazy, Suspense } from "react";
import NavBar from "./components/NavBar";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/ui/AnimatedBackground";
import ScrollProgress from "./components/ui/ScrollProgress";
import CustomCursor from "./components/ui/CustomCursor";
import "./App.css";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const Admin = lazy(() => import("./pages/Admin"));
const Blog = lazy(() => import("./pages/Blog"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
  const location = useLocation();

  return (
    <HelmetProvider>
      <div className="relative min-h-screen bg-black text-white selection:bg-blue-500/30">
        <AnimatedBackground />
        <ScrollProgress />
        <CustomCursor />
        <ScrollToTop />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <NavBar />

          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
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
                  <Route
                    path="/blog"
                    element={
                      <PageWrapper>
                        <Blog />
                      </PageWrapper>
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <PageWrapper>
                        <NotFound />
                      </PageWrapper>
                    }
                  />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>
          <Footer />
        </div>
      </div>
    </HelmetProvider>
  );
}

export default memo(App);
