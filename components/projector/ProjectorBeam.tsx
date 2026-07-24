"use client";

import { motion } from "framer-motion";

export default function ProjectorBeam() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1.2,
      }}
      className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
    >
      {/* Main Beam */}
      <motion.div
        animate={{
          opacity: [0.45, 0.62, 0.5],
          scaleX: [1, 1.03, 1],
        }}
        transition={{
          duration: 0.18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="h-[90vh] w-[520px]"
        style={{
          clipPath:
            "polygon(48% 0%,52% 0%,100% 100%,0% 100%)",
          background:
            "linear-gradient(to bottom, rgba(255,248,210,.55), rgba(255,220,120,.12), transparent)",
          filter: "blur(18px)",
        }}
      />

      {/* Hot Core */}
      <motion.div
        animate={{
          opacity: [0.12, 0.24, 0.14],
        }}
        transition={{
          duration: 0.12,
          repeat: Infinity,
        }}
        className="absolute left-1/2 top-0 h-[90vh] w-20 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,.65), transparent)",
          filter: "blur(24px)",
        }}
      />
    </motion.div>
  );
}