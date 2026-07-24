"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const sequence = [
  "PLEASE SILENCE YOUR PHONES",
  "FEATURE PRESENTATION",
  "3",
  "2",
  "1",
];

export default function Countdown({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= sequence.length) {
      onComplete?.();
      return;
    }

    const delay = index < 2 ? 1800 : 900;

    const timer = setTimeout(() => {
      setIndex((i) => i + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [index, onComplete]);

  if (index >= sequence.length) return null;

  const isNumber = index >= 2;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={sequence[index]}
        className="absolute inset-0 z-20 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 0.5 }}
      >
        <h1
          className={
            isNumber
              ? "text-[10rem] md:text-[14rem] font-black text-white"
              : "text-center text-2xl md:text-5xl tracking-[0.35em] text-white"
          }
        >
          {sequence[index]}
        </h1>
      </motion.div>
    </AnimatePresence>
  );
}