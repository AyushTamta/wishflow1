"use client";

import { AnimatePresence, motion } from "framer-motion";

interface FilmBurnProps {
  show: boolean;
}

export default function FilmBurn({ show }: FilmBurnProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 2,
            opacity: [0, 0.8, 1, 0],
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.9,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute inset-0 z-50"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-orange-500 to-red-700 opacity-90 blur-2xl" />

          <div className="absolute inset-0 bg-white/50 mix-blend-screen" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}