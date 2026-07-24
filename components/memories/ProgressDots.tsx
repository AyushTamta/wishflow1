"use client";

import { motion } from "framer-motion";
import { ProgressDotsProps } from "@/types/memory";

export default function ProgressDots({
  total,
  current,
}: ProgressDotsProps) {
  return (
    <div className="mt-10 flex justify-center gap-3">
      {Array.from({ length: total }).map((_, index) => {
        const active = index === current;

        return (
          <motion.div
            key={index}
            animate={{
              width: active ? 34 : 8,
              opacity: active ? 1 : 0.35,
            }}
            transition={{
              duration: 0.35,
            }}
            className="h-2 rounded-full bg-white"
          />
        );
      })}
    </div>
  );
}