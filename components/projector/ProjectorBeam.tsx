"use client";

import { motion } from "framer-motion";

export default function ProjectorBeam() {
  return (
    <>
      {/* Main Beam */}
      <motion.div
        animate={{
          opacity: [0.35, 0.5, 0.42, 0.55, 0.35],
        }}
        transition={{
          duration: 0.18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          left-[290px]
          top-1/2
          h-[520px]
          w-[1100px]
          -translate-y-1/2

          bg-gradient-to-r

          from-yellow-100/30
          via-yellow-100/12
          to-transparent

          blur-2xl

          [clip-path:polygon(0_48%,100%_0,100%_100%,0_52%)]
        "
      />

      {/* Core Beam */}
      <motion.div
        animate={{
          opacity: [0.15, 0.22, 0.18, 0.25, 0.15],
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          left-[310px]
          top-1/2
          h-[280px]
          w-[1050px]
          -translate-y-1/2

          bg-gradient-to-r

          from-white/25
          via-yellow-50/12
          to-transparent

          blur-xl

          [clip-path:polygon(0_48%,100%_0,100%_100%,0_52%)]
        "
      />

      {/* Ambient Glow */}
      <motion.div
        animate={{
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_left,rgba(255,220,120,.10),transparent_60%)]

          pointer-events-none
        "
      />
    </>
  );
}