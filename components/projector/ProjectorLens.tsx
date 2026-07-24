"use client";

import { motion } from "framer-motion";

export default function ProjectorLens() {
  return (
    <motion.div
      initial={{
        scale: 0,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        duration: 1.2,
      }}
      className="
        absolute
        left-24
        top-1/2
        h-8
        w-8
        -translate-y-1/2
        rounded-full
        bg-yellow-100
        shadow-[0_0_80px_25px_rgba(255,230,160,0.8)]
      "
    />
  );
}