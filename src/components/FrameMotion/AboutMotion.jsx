"use client";

import { motion } from "framer-motion";

// Shape data for looping
const shapes = [
    { type: "circle", cx: 100, cy: 100, r: 80, stroke: "#ff0088", delay: 0 },
    { type: "line", x1: 220, y1: 30, x2: 360, y2: 170, stroke: "#4ff0b7", delay: 0.5 },
    { type: "line", x1: 220, y1: 170, x2: 360, y2: 30, stroke: "#4ff0b7", delay: 1 },
    { type: "rect", x: 410, y: 30, width: 140, height: 140, rx: 20, stroke: "#0d63f8", delay: 1.5 },
    { type: "circle", cx: 100, cy: 300, r: 80, stroke: "#0d63f8", delay: 2 },
    { type: "line", x1: 220, y1: 230, x2: 360, y2: 370, stroke: "#ff0088", delay: 2.5 },
    { type: "line", x1: 220, y1: 370, x2: 360, y2: 230, stroke: "#ff0088", delay: 3 },
    { type: "rect", x: 410, y: 230, width: 140, height: 140, rx: 20, stroke: "#4ff0b7", delay: 3.5 },
    { type: "circle", cx: 100, cy: 500, r: 80, stroke: "#4ff0b7", delay: 4 },
    { type: "line", x1: 220, y1: 430, x2: 360, y2: 570, stroke: "#0d63f8", delay: 4.5 },
    { type: "line", x1: 220, y1: 570, x2: 360, y2: 430, stroke: "#0d63f8", delay: 5 },
    { type: "rect", x: 410, y: 430, width: 140, height: 140, rx: 20, stroke: "#ff0088", delay: 5.5 },
];

export default function AboutMotion() {
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center" }}>
            <motion.svg
                width="200"
                height="200"
                viewBox="0 0 600 600"
                style={image}
            >
                {shapes.map((shape, index) => {
                    const animationProps = {
                        initial: { pathLength: 0, opacity: 0 },
                        animate: {
                            pathLength: [0, 1, 0], // Draw and reset
                            opacity: [0, 1, 0],    // Fade in and out
                        },
                        transition: {
                            delay: shape.delay,          // Stagger animations
                            duration: 2,                // Animation duration
                            repeat: Infinity,           // Loop indefinitely
                            repeatDelay: 2,            // Delay between loops
                            ease: "easeInOut",          // Smooth easing
                        },
                    };

                    if (shape.type === "circle") {
                        return (<>
                            <motion.circle
                                key={index}
                                cx={shape.cx}
                                cy={shape.cy}
                                r={shape.r}
                                stroke={shape.stroke}
                                {...animationProps}
                                style={shapeStyle}
                                
                            />
                            
                        </>
                        );
                    } else if (shape.type === "line") {
                        return (
                            <motion.line
                                key={index}
                                x1={shape.x1}
                                y1={shape.y1}
                                x2={shape.x2}
                                y2={shape.y2}
                                stroke={shape.stroke}
                                {...animationProps}
                                style={shapeStyle}
                            />
                        );
                    } else if (shape.type === "rect") {
                        return (
                            <motion.rect
                                key={index}
                                x={shape.x}
                                y={shape.y}
                                width={shape.width}
                                height={shape.height}
                                rx={shape.rx}
                                stroke={shape.stroke}
                                {...animationProps}
                                style={shapeStyle}
                            />
                        );
                    }
                    return null;
                })}
            </motion.svg>
        </div>
    );
}

/**
 * ==============   Styles   ================
 */

const image = {
    maxWidth: "80vw",
};

const shapeStyle = {
    strokeWidth: 10,
    strokeLinecap: "round",
    fill: "transparent",
};
