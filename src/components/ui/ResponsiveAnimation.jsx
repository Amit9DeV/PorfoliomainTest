import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * Wrapper component that conditionally animates based on device type
 * On mobile: renders children without animation
 * On desktop: applies Framer Motion animations
 */
export default function ResponsiveAnimation({
    children,
    initial,
    animate,
    exit,
    transition,
    viewport,
    whileHover,
    whileTap,
    ...props
}) {
    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        const checkShouldAnimate = () => {
            const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const isLargeScreen = window.innerWidth >= 1024;
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            setShouldAnimate(isLargeScreen && !isTouch && !prefersReducedMotion);
        };

        checkShouldAnimate();
        window.addEventListener('resize', checkShouldAnimate);

        return () => window.removeEventListener('resize', checkShouldAnimate);
    }, []);

    // If should not animate, render children without motion wrapper
    if (!shouldAnimate) {
        return <div {...props}>{children}</div>;
    }

    // Otherwise, apply all motion props
    return (
        <motion.div
            initial={initial}
            animate={animate}
            exit={exit}
            transition={transition}
            viewport={viewport}
            whileHover={whileHover}
            whileTap={whileTap}
            {...props}
        >
            {children}
        </motion.div>
    );
}
