"use client";

import { motion } from "framer-motion";

export default function CinematicBackground() {
  return (
    <>
      {/* Base */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Warm radial glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
        animate={{
          opacity: [0.12, 0.22, 0.14],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(255,180,80,.28) 0%, rgba(255,120,20,.08) 45%, transparent 75%)",
        }}
      />

      {/* Blue ambient */}
      <motion.div
        className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full blur-[160px]"
        animate={{
          opacity: [0.08, 0.18, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        style={{
          background:
            "radial-gradient(circle,#3b82f620 0%,transparent 70%)",
        }}
      />

      {/* Bottom glow */}
      <motion.div
        className="absolute bottom-0 left-1/2 h-[400px] w-[900px] -translate-x-1/2 blur-[180px]"
        animate={{
          opacity: [0.05, 0.12, 0.05],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        style={{
          background:
            "radial-gradient(circle,#f59e0b20 0%,transparent 70%)",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_35%,rgba(0,0,0,.82)_100%)]" />
    </>
  );
}