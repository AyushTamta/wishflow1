"use client";

import { AnimatePresence, motion } from "framer-motion";

interface TransitionLayerProps {
  isVisible: boolean;
}

export default function TransitionLayer({
  isVisible,
}: TransitionLayerProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-[9999] pointer-events-none"
        >
          {/* Black Fade */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          />

          {/* Soft Flash */}
          <motion.div
            className="absolute inset-0 bg-white mix-blend-screen"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0.35, 0],
            }}
            transition={{
              duration: 0.4,
            }}
          />

          {/* Vignette */}
          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle,transparent_55%,rgba(0,0,0,.65)_100%)]
            "
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}