import React, { useContext, useState, useEffect } from 'react';
import { SwitchTransition, Transition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { memo } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import TransitionContext from './ContentTransition';

const TransitionComponent = memo(function TransitionComponent({ children }) {
  const location = useLocation();
  const { toggleCompleted } = useContext(TransitionContext);
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
    <AnimatePresence mode="wait">
      <motion.div
        initial={isMobile ? false : { opacity: 0, y: 20 }}
        animate={isMobile ? false : { opacity: 1, y: 0 }}
        exit={isMobile ? false : { opacity: 0, y: -20 }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
});

export default TransitionComponent;
