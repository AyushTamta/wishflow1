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
        y: 80,
        rotateX: 18,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -30,
        scale: 0.98,
      }}
      transition={{
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative w-full max-w-4xl px-6"
      style={{
        perspective: "1600px",
      }}
    >
      {/* Spotlight */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[520px] w-[520px] rounded-full bg-amber-300/10 blur-[120px]" />
      </div>

      {/* Shadow */}
      <motion.div
        animate={{
          opacity: [0.22, 0.3, 0.22],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute inset-x-16 bottom-0 -z-10 h-14 rounded-full bg-black/60 blur-3xl"
      />

      {/* Paper */}
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-amber-100/40
          bg-gradient-to-br
          from-[#fffdf7]
          via-[#fcf8ef]
          to-[#f7f0df]
          p-10
          md:p-16
          shadow-[0_30px_100px_rgba(0,0,0,.45)]
        "
      >
        {/* Paper texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(0,0,0,.15) 1px, transparent 1px),
              radial-gradient(circle at 80% 80%, rgba(0,0,0,.1) 1px, transparent 1px)
            `,
            backgroundSize: "22px 22px",
          }}
        />

        {/* Fold highlight */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-white/40" />

        {/* Top light */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/50 to-transparent" />

        {/* Bottom shade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/[0.04] to-transparent" />

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
}