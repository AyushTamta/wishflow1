"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  show: boolean;
}

export default function FilmBurnTransition({
  show,
}: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.5,
            },
          }}
        >
          {/* Bright Core */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [0, 1, 0.85, 0],
              scale: [0.7, 1.05, 1.2],
            }}
            transition={{
              duration: 0.9,
            }}
            style={{
              background:
                "radial-gradient(circle,#fff7d6 0%,#ffd166 18%,#ff8c42 42%,#ff4d00 65%,transparent 90%)",
            }}
          />

          {/* Left burn */}
          <motion.div
            className="absolute left-0 top-0 h-full w-1/2"
            animate={{
              x: [-80, 80],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 0.9,
            }}
            style={{
              background:
                "radial-gradient(circle at left,#ffb347 0%,#ff5a1f 35%,transparent 75%)",
              filter: "blur(80px)",
            }}
          />

          {/* Right burn */}
          <motion.div
            className="absolute right-0 top-0 h-full w-1/2"
            animate={{
              x: [80, -80],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 0.9,
            }}
            style={{
              background:
                "radial-gradient(circle at right,#ffd166 0%,#ff5a1f 40%,transparent 75%)",
              filter: "blur(80px)",
            }}
          />

          {/* White flash */}
          <motion.div
            className="absolute inset-0 bg-white"
            animate={{
              opacity: [0, 0.15, 0.4, 0],
            }}
            transition={{
              duration: 0.9,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}