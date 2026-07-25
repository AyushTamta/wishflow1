"use client";

import { motion } from "framer-motion";

export default function FilmGrain() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-40 opacity-[0.035] mix-blend-soft-light"
      animate={{
        backgroundPosition: [
          "0% 0%",
          "100% 100%",
          "50% 20%",
          "0% 0%",
        ],
      }}
      transition={{
        duration: 0.4,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundImage: `
          radial-gradient(circle, white 0.7px, transparent 0.8px)
        `,
        backgroundSize: "6px 6px",
      }}
    />
  );
}