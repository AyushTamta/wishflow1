"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  size: 1 + ((i * 17) % 30) / 10,
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  duration: 18 + (i % 8),
  delay: i * 0.35,
  opacity: 0.18 + (i % 6) * 0.04,
}));

export default function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            opacity: particle.opacity,
            filter: "blur(1px)",
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-8, 8, -8],
            opacity: [
              particle.opacity * 0.4,
              particle.opacity,
              particle.opacity * 0.4,
            ],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}