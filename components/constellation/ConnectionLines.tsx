"use client";

import { motion } from "framer-motion";

const lines = [
  { x1: 25, y1: 32, x2: 41, y2: 26 },
  { x1: 41, y1: 26, x2: 56, y2: 38 },
  { x1: 56, y1: 38, x2: 67, y2: 28 },
  { x1: 67, y1: 28, x2: 80, y2: 45 },
];

export default function ConstellationLines() {
  return (
    <svg className="absolute inset-0 h-full w-full">
      {lines.map((line, index) => (
        <motion.line
          key={index}
          x1={`${line.x1}%`}
          y1={`${line.y1}%`}
          x2={`${line.x2}%`}
          y2={`${line.y2}%`}
          stroke="rgba(255,255,255,.45)"
          strokeWidth="1.5"
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 1,
          }}
          transition={{
            duration: 1,
            delay: index * 0.4,
          }}
        />
      ))}
    </svg>
  );
}