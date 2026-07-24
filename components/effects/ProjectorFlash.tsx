"use client";

import { motion } from "framer-motion";

interface Props {
  active: boolean;
}

export default function ProjectorFlash({
  active,
}: Props) {
  if (!active) return null;

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: [0, 1, 0.4, 1, 0],
      }}
      transition={{
        duration: 0.7,
      }}
      className="
      pointer-events-none
      absolute
      inset-0
      bg-white
      mix-blend-screen
    "
    />
  );
}