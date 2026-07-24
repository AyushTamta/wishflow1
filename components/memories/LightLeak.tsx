"use client";

import { motion } from "framer-motion";

export default function LightLeak() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0, 0.45, 0.2, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        repeatDelay: 5 + Math.random() * 4,
        ease: "easeInOut",
      }}
    >
      {/* Left Leak */}
      <motion.div
        className="absolute -left-40 top-0 h-full w-80 rounded-full blur-[120px]"
        animate={{
          x: [-60, 140],
          rotate: [-8, 10],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle,#ff6b00 0%,#ffb347 45%,transparent 75%)",
        }}
      />

      {/* Right Leak */}
      <motion.div
        className="absolute -right-40 bottom-0 h-full w-80 rounded-full blur-[120px]"
        animate={{
          x: [80, -120],
          rotate: [12, -8],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle,#ff0048 0%,#ff7b00 45%,transparent 75%)",
        }}
      />
    </motion.div>
  );
}