"use client";

import { motion, useTime, useTransform } from "motion/react";

export default function UseTime() {
    const time = useTime();
    const rotate = useTransform(
        time,
        [0, 4000], // time in milliseconds
        [0, 360], // rotation in degrees
        { clamp: false }
    );

    return (
        <>
            {/* Layer with blurred tiny boxes */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 20,
                    filter: "blur(4px)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                        width: 500,
                        gap: 80,
                    }}
                >
                    {Array.from({ length: 16 }).map((_, index) => (
                        <motion.div
                            key={index}
                            style={{
                                width: 40,
                                height: 40,
                                backgroundColor: "#9911ff",
                                borderRadius: 5,
                                rotate: useTransform(() => rotate.get() * 2), // 2x speed
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Layer with blurred small boxes */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 20,
                    filter: "blur(2px)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 50,
                        flexWrap: "wrap",
                        width: 300,
                    }}
                >
                    {Array.from({ length: 4 }).map((_, index) => (
                        <motion.div
                            key={index}
                            style={{
                                width: 80,
                                height: 80,
                                backgroundColor: "#dd00ee",
                                borderRadius: 5,
                                rotate: useTransform(() => rotate.get() * 1.5), // 1.5x speed
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Layer with a single rotating large box */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 20,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 50,
                        flexWrap: "wrap",
                    }}
                >
                    <motion.div
                        style={{
                            width: 100,
                            height: 100,
                            backgroundColor: "#ff0088",
                            borderRadius: 5,
                            rotate,
                        }}
                    />
                </div>
            </div>
        </>
    );
}
