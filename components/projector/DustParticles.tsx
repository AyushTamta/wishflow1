"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 60 });

export default function DustParticles() {
  return (
    <>
      {particles.map((_, index) => {
        const left = 260 + Math.random() * 900;
        const top = 180 + Math.random() * 400;
        const size = Math.random() * 3 + 1;

        return (
          <motion.span
            key={index}
            style={{
              left,
              top,
              width: size,
              height: size,
            }}
            className="
              absolute
              rounded-full
              bg-white/60
              blur-[1px]
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              y: [0, -140],
              x: [0, 15, -12, 8],
              opacity: [0, 0.25, 0.6, 0.2, 0],
              scale: [1, 1.4, 0.9],
            }}
            transition={{
              duration: 6 + Math.random() * 8,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </>
  );
}