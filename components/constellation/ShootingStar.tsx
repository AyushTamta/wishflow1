"use client";

import { motion } from "framer-motion";

export default function ShootingStar() {
  return (
    <motion.div
      initial={{
        x: -300,
        y: -120,
        opacity: 0,
      }}
      animate={{
        x: 1400,
        y: 700,
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 1.8,
        delay: 5,
      }}
      className="absolute h-[2px] w-44 rotate-[25deg] rounded-full bg-gradient-to-r from-white via-blue-200 to-transparent shadow-[0_0_20px_white]"
    />
  );
}