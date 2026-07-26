"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const cards = [
  ["Too many memories,", "many more smiles,", "and many more birthdays."],
  [
    "If life ever gets overwhelming,",
    "I hope you always find your way back",
    "to the things that make you smile.",
  ],
  [
    "And remember,",
    "hope is a good thing, maybe the best of things,",
    "and no good thing ever dies.",
  ],
  ["If this video made you smile even once,", "then it was worth making."],
  ["Happy Birthday,", "Ambay, Amby, Ammu, Ammu_Batashaa. <3"],
];

export default function CreditRoll() {
  const [card, setCard] = useState(0);

  useEffect(() => {
    if (card >= cards.length - 1) return;

    const timer = window.setTimeout(
      () => setCard((current) => current + 1),
      5200
    );

    return () => window.clearTimeout(timer);
  }, [card]);

  const advance = () => setCard((current) => Math.min(current + 1, cards.length - 1));

  return (
    <button
      type="button"
      aria-label="Show the next credit card"
      onClick={advance}
      className="absolute inset-0 flex items-center justify-center overflow-hidden px-6 text-left"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={card}
          initial={{ opacity: 0, y: 36, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -26, scale: 1.02 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full max-w-4xl text-center"
        >
          <div className="mx-auto mb-10 h-px w-72 bg-gradient-to-r from-transparent via-[#E6C67A] to-transparent" />
          <div className="space-y-5">
            {cards[card].map((line, index) => (
              <motion.p
                key={line}
                className="font-serif text-3xl font-light tracking-wide text-white/90 md:text-5xl"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.32, duration: 0.7 }}
              >
                {line}
              </motion.p>
            ))}
          </div>
          <div className="mx-auto mt-10 h-px w-72 bg-gradient-to-r from-transparent via-[#E6C67A] to-transparent" />
          <p className="mt-7 text-[10px] uppercase tracking-[0.34em] text-white/35">Tap for the next note</p>
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
