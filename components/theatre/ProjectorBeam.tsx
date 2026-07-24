"use client";

import { motion } from "framer-motion";

export default function ProjectorBeam() {
  return (
    <>
      {/* Light source */}
      <motion.div
        className="absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 rounded-full bg-white/30 blur-3xl"
        animate={{
          opacity: [0.2, 0.35, 0.25],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
        }}
      />

      {/* Beam */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 h-[90vh] w-[700px] -translate-x-1/2"
        style={{
          clipPath: "polygon(49% 0%,51% 0%,100% 100%,0% 100%)",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,.18), rgba(255,255,255,0))",
          filter: "blur(10px)",
        }}
        animate={{
          opacity: [0.08, 0.15, 0.1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
    </>
  );
}