import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const AnimatedBackground = () => {
    // Mobile detection - disable animations on small screens for better performance
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        checkDesktop();
        window.addEventListener('resize', checkDesktop);

        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 bg-black overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(0,0,0,1))]" />

            {/* Animated Blobs - Only on Desktop for Performance */}
            {isDesktop && (
                <>
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.2, 0.3, 0.2],
                            x: [0, 30, 0],
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/40 rounded-full blur-[80px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.2, 0.3, 0.2],
                            x: [0, -30, 0],
                            y: [0, 30, 0],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2,
                        }}
                        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-900/40 rounded-full blur-[80px]"
                    />
                </>
            )}

            {/* Static blur circles on mobile for better performance */}
            {!isDesktop && (
                <>
                    <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] bg-blue-900/25 rounded-full blur-[60px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-violet-900/25 rounded-full blur-[60px]" />
                </>
            )}
        </div>
    );
};

export default AnimatedBackground;
