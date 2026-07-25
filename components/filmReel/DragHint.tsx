// components/filmReel/DragHint.tsx

"use client";

import { motion } from "framer-motion";

export default function DragHint() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: [0.45, 1, 0.45],
        y: [0, -5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      className="pointer-events-none absolute bottom-10 left-1/2 z-50 -translate-x-1/2 rounded-full border border-neutral-700 bg-black/45 px-6 py-3 backdrop-blur-md"
    >
      <span className="text-[11px] uppercase tracking-[0.45em] text-neutral-300">
        ← Drag • Scroll • Swipe →
      </span>
    </motion.div>
  );
}