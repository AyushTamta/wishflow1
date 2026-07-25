"use client";

import { motion } from "framer-motion";

interface TheatreCurtainsProps {
  open: boolean;
}

export default function TheatreCurtains({
  open,
}: TheatreCurtainsProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
      {/* Left Curtain */}
      <motion.div
        initial={false}
        animate={{
          x: open ? "-100%" : "0%",
        }}
        transition={{
          duration: 1.4,
          ease: [0.83, 0, 0.17, 1],
        }}
        className="
          absolute
          left-0
          top-0
          h-full
          w-1/2
          bg-gradient-to-r
          from-[#240000]
          via-[#5b0000]
          to-[#7a0000]
          shadow-[30px_0_80px_rgba(0,0,0,.6)]
        "
      >
        <div
          className="
            absolute
            inset-0
            opacity-20
            bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_18px,rgba(255,255,255,.12)_19px,transparent_22px)]
          "
        />
      </motion.div>

      {/* Right Curtain */}
      <motion.div
        initial={false}
        animate={{
          x: open ? "100%" : "0%",
        }}
        transition={{
          duration: 1.4,
          ease: [0.83, 0, 0.17, 1],
        }}
        className="
          absolute
          right-0
          top-0
          h-full
          w-1/2
          bg-gradient-to-l
          from-[#240000]
          via-[#5b0000]
          to-[#7a0000]
          shadow-[-30px_0_80px_rgba(0,0,0,.6)]
        "
      >
        <div
          className="
            absolute
            inset-0
            opacity-20
            bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_18px,rgba(255,255,255,.12)_19px,transparent_22px)]
          "
        />
      </motion.div>
    </div>
  );
}