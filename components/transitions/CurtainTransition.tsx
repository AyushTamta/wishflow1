"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  show: boolean;
}

export default function CurtainTransition({
  show,
}: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {/* Left Curtain */}
          <motion.div
            initial={{
              x: 0,
            }}
            animate={{
              x: "-100%",
            }}
            exit={{
              x: 0,
            }}
            transition={{
              duration: 1.2,
              ease: [0.77, 0, 0.18, 1],
            }}
            className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-red-950 via-red-900 to-red-800 shadow-2xl"
          />

          {/* Right Curtain */}
          <motion.div
            initial={{
              x: 0,
            }}
            animate={{
              x: "100%",
            }}
            exit={{
              x: 0,
            }}
            transition={{
              duration: 1.2,
              ease: [0.77, 0, 0.18, 1],
            }}
            className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-red-950 via-red-900 to-red-800 shadow-2xl"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}