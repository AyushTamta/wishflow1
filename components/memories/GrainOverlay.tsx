"use client";

import { motion } from "framer-motion";

export default function GrainOverlay() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-20"
      animate={{
        backgroundPosition: [
          "0px 0px",
          "40px -60px",
          "-50px 80px",
          "0px 0px",
        ],
      }}
      transition={{
        duration: 0.35,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundImage: `
          radial-gradient(circle, rgba(255,255,255,.12) 1px, transparent 1px)
        `,
        backgroundSize: "6px 6px",
      }}
    />
  );
}