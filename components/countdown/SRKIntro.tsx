"use client";

import { motion } from "framer-motion";

interface SRKIntroProps {
  onStart: () => void;
}

export default function SRKIntro({ onStart }: SRKIntroProps) {
  return (
    <motion.div
      className="absolute inset-0 bg-contain bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/srk-quiz-intro.png')" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      aria-label="SRK quiz introduction"
    >
      <button
        type="button"
        onClick={onStart}
        aria-label="Let's Play the SRK quiz"
        className="absolute left-1/2 top-[75%] h-[8%] w-[34%] -translate-x-1/2 rounded-xl"
      />
    </motion.div>
  );
}
