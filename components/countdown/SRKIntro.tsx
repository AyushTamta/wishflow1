"use client";

import { motion } from "framer-motion";

export default function SRKIntro() {
  return (
    <motion.div
      className="absolute inset-0 bg-contain bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/srk-quiz-intro.png')" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      aria-label="SRK quiz introduction"
    />
  );
}
