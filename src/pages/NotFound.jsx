import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, WifiOff } from "iconoir-react";
import AnimatedBackground from "../components/ui/AnimatedBackground";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
            <AnimatedBackground />

            <div className="text-center z-10 max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 relative inline-block"
                >
                    <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
                    <WifiOff className="w-32 h-32 text-blue-400 relative z-10 mx-auto opacity-80" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tighter"
                >
                    4<span className="text-blue-500">0</span>4
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl md:text-3xl font-medium text-gray-300 mb-6"
                >
                    Page Not Found
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-400 text-lg mb-10 max-w-md mx-auto"
                >
                    The signal was lost in the digital void. The page you are looking for doesn't exist or has been moved.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform"
                    >
                        <ArrowLeft className="w-5 h-5" /> Return Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
