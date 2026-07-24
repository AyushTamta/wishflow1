"use client";

import { motion } from "framer-motion";

export default function Waves() {
  return (
    <motion.svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className="absolute bottom-0 w-full h-[38%]"
      animate={{
        x: [0, -120, 0],
      }}
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <path
        fill="#062038"
        d="M0,160L80,170C160,181,320,203,480,202.7C640,203,800,181,960,165.3C1120,149,1280,139,1360,133.3L1440,128V320H0Z"
      />
    </motion.svg>
  );
}