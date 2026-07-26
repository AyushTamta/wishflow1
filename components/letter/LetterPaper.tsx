"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface LetterPaperProps {
  children: ReactNode;
}

export default function LetterPaper({
  children,
}: LetterPaperProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -24,
      }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative mx-auto min-h-full w-full max-w-6xl overflow-hidden rounded-[10px] border border-[#d7b77a]/55 bg-[#f4e4c2] shadow-[0_30px_120px_rgba(0,0,0,.5)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[url('/images/textures/paper.jpg')] bg-cover bg-center opacity-45 mix-blend-multiply" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,.55),transparent_38%),linear-gradient(90deg,rgba(95,55,20,.12),transparent_16%,transparent_84%,rgba(95,55,20,.12))]" />
      <div className="pointer-events-none absolute inset-x-10 top-8 h-px bg-gradient-to-r from-transparent via-[#9f7434]/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-10 bottom-8 h-px bg-gradient-to-r from-transparent via-[#9f7434]/50 to-transparent" />

      <div className="relative z-10 px-7 md:px-16">
        {children}
      </div>
    </motion.div>
  );
}
