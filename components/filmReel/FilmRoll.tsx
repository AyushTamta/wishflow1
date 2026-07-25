// components/filmReel/FilmRoll.tsx

"use client";

import { motion } from "framer-motion";

interface FilmRollProps {
  side: "left" | "right";
  spinning?: boolean;
}

export default function FilmRoll({
  side,
  spinning = true,
}: FilmRollProps) {
  return (
    <motion.div
      animate={
        spinning
          ? {
              rotate: side === "left" ? 360 : -360,
            }
          : {}
      }
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
      className={`absolute top-1/2 z-30 flex h-44 w-44 -translate-y-1/2 items-center justify-center rounded-full border-[10px] border-neutral-700 ${
        side === "left" ? "left-10" : "right-10"
      }`}
    >
      <div className="absolute h-8 w-8 rounded-full bg-neutral-500" />

      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-2 w-16 origin-left rounded bg-neutral-600"
          style={{
            transform: `rotate(${i * 15}deg)`,
          }}
        />
      ))}
    </motion.div>
  );
}
