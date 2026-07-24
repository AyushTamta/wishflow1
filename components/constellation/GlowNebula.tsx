"use client";

import { motion } from "framer-motion";

export default function GlowNebula() {
  return (
    <>
      <motion.div
        className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full blur-[140px]"
        animate={{
          opacity: [0.15, 0.28, 0.15],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        style={{
          background:
            "radial-gradient(circle,#4f46e540 0%,transparent 70%)",
        }}
      />

      <motion.div
        className="absolute right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full blur-[170px]"
        animate={{
          opacity: [0.08, 0.18, 0.08],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
        }}
        style={{
          background:
            "radial-gradient(circle,#9333ea40 0%,transparent 70%)",
        }}
      />
    </>
  );
}