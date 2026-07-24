"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 40 });

export default function DustParticles() {
  return (
    <>
      {particles.map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/40"
          initial={{
            x: Math.random() * 900,
            y: Math.random() * 500,
            opacity: 0,
          }}
          animate={{
            y: ["0%", "-120%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 6 + Math.random() * 6,
            delay: Math.random() * 4,
          }}
        />
      ))}
    </>
  );
}