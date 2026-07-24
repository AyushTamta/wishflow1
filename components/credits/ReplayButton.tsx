"use client";

import { motion } from "framer-motion";

interface Props {
  onReplay: () => void;
}

export default function ReplayButton({
  onReplay,
}: Props) {
  return (
    <motion.button
      onClick={onReplay}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 1,
      }}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.96,
      }}
      className="
        rounded-full
        border
        border-white/20
        bg-white/10
        px-8
        py-4
        text-sm
        uppercase
        tracking-[0.35em]
        text-white
        backdrop-blur-md
      "
    >
      Replay Story
    </motion.button>
  );
}