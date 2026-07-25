"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const sequence = [
  { id: 0, text: "11:59 PM", duration: 2500 },
  { id: 1, text: "364 days...", duration: 2500 },
  { id: 2, text: "...all leading to this moment.", duration: 3000 },
  { id: 3, text: "The wait is finally over.", duration: 2500 },
  { id: 4, text: "❤️", duration: 1200 },
  {
    id: 5,
    text: "HAPPY BIRTHDAY",
    duration: 3500,
    birthday: true,
  },
  {
    id: 6,
    text: "Tonight...\nyou're the star of the show.",
    duration: 3500,
  },
  {
    id: 7,
    text: "Welcome to your story.",
    duration: 2500,
  },
];

export default function HeroSequence() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= sequence.length - 1) return;

    const timer = window.setTimeout(() => {
      setStep((prev) => prev + 1);
    }, sequence[step].duration);

    return () => clearTimeout(timer);
  }, [step]);

  const item = sequence[step];

  return (
    <div className="pointer-events-none absolute inset-0 z-[999] flex items-center justify-center px-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -40,
          }}
          transition={{
            duration: 0.8,
          }}
          className="text-center"
        >
          {item.birthday ? (
            <motion.h1
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-400 bg-clip-text text-6xl font-black tracking-[0.18em] text-transparent drop-shadow-[0_0_30px_rgba(255,220,120,0.6)] md:text-8xl"
            >
              {item.text}
            </motion.h1>
          ) : (
            <h2 className="whitespace-pre-line text-4xl font-light tracking-[0.12em] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] md:text-6xl">
              {item.text}
            </h2>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}