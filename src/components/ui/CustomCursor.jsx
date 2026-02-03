import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Only show on desktop non-touch devices
    const [shouldShowCursor, setShouldShowCursor] = useState(false);

    useEffect(() => {
        // Comprehensive check - only show on desktop with mouse
        const checkShouldShow = () => {
            const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const isLargeScreen = window.innerWidth >= 1024;
            const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

            // Only show on desktop (1024px+) with fine pointer (mouse), not touch
            setShouldShowCursor(isLargeScreen && !isTouch && !hasCoarsePointer);
        };

        checkShouldShow();
        window.addEventListener("resize", checkShouldShow);

        return () => window.removeEventListener("resize", checkShouldShow);
    }, []);

    useEffect(() => {
        if (!shouldShowCursor) return;

        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
            setIsVisible(true);

            // Check if hovering over clickable element
            const target = e.target;
            const isClickable =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.getAttribute('role') === 'button' ||
                target.classList.contains('cursor-pointer');

            setIsPointer(!!isClickable);
        };

        const mouseLeave = () => setIsVisible(false);
        const mouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", mouseMove);
        document.body.addEventListener("mouseleave", mouseLeave);
        document.body.addEventListener("mouseenter", mouseEnter);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            document.body.removeEventListener("mouseleave", mouseLeave);
            document.body.removeEventListener("mouseenter", mouseEnter);
        };
    }, [shouldShowCursor]);

    // Don't render on mobile/touch devices
    if (!shouldShowCursor || !isVisible) return null;

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-blue-500 rounded-full mix-blend-screen pointer-events-none z-[9999]"
                animate={{
                    x: mousePosition.x - 8,
                    y: mousePosition.y - 8,
                    scale: isPointer ? 1.5 : 1
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-blue-400 rounded-full mix-blend-screen pointer-events-none z-[9999]"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isPointer ? 1.5 : 1,
                    opacity: isPointer ? 0.5 : 0.2
                }}
                transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 20,
                    mass: 0.8
                }}
            />
        </>
    );
}
