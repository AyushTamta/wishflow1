"use client";

import { motion } from "framer-motion";

export default function MoonReflection() {
  return (
    <motion.div
      className="absolute left-1/2 top-[42%] -translate-x-1/2"
      animate={{
        opacity: [0.15, 0.35, 0.18],
        scaleX: [1, 1.05, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
      style={{
        width: 220,
        height: 320,
        background:
          "linear-gradient(to bottom, rgba(255,255,255,.3), transparent)",
        filter: "blur(24px)",
      }}
    />
  );
}