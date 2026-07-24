"use client";

import { motion } from "framer-motion";

export default function Moon() {
  return (
    <motion.div
      className="absolute right-24 top-20 h-32 w-32 rounded-full"
      animate={{
        opacity: [0.9, 1, 0.95],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
      }}
      style={{
        background: "#fdfdfd",
        boxShadow:
          "0 0 50px rgba(255,255,255,.7),0 0 120px rgba(255,255,255,.35)",
      }}
    />
  );
}