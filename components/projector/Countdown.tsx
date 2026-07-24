"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const COUNTDOWN = [3, 2, 1];

export default function Countdown() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= COUNTDOWN.length) return;

    const timer = setTimeout(() => {
      setStep((prev) => prev + 1);
    }, 900);

    return () => clearTimeout(timer);
  }, [step]);

  if (step >= COUNTDOWN.length) return null;

  const value = COUNTDOWN[step];

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      {/* Film Grain */}
      <motion.div
        animate={{
          opacity: [0.05, 0.1, 0.03, 0.08],
        }}
        transition={{
          duration: 0.12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle,#ffffff22_1px,transparent_1px)]
          bg-[length:6px_6px]
          mix-blend-overlay
        "
      />

      {/* Flash Flicker */}
      <motion.div
        animate={{
          opacity: [0, 0.05, 0, 0.08, 0],
        }}
        transition={{
          duration: 0.08,
          repeat: Infinity,
        }}
        className="absolute inset-0 bg-white mix-blend-overlay"
      />

      {/* Outer Circle */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ opacity: 0 }}
        className="
          absolute
          h-[420px]
          w-[420px]
          rounded-full
          border-4
          border-white/60
        "
      />

      {/* Inner Circle */}
      <div
        className="
          absolute
          h-[300px]
          w-[300px]
          rounded-full
          border-2
          border-white/40
        "
      />

      {/* Crosshair */}
      <div className="absolute h-[420px] w-[2px] bg-white/20" />
      <div className="absolute h-[2px] w-[420px] bg-white/20" />

      {/* Rotating Sweep */}
      <motion.div
        initial={{ rotate: -90 }}
        animate={{ rotate: 270 }}
        transition={{
          duration: 0.9,
          ease: "linear",
        }}
        className="
          absolute
          h-[420px]
          w-[420px]
          rounded-full
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-0
            h-1/2
            w-[2px]
            -translate-x-1/2
            origin-bottom
            bg-white/60
          "
        />
      </motion.div>

      {/* Number */}
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{
            opacity: 0,
            scale: 0.75,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.25,
          }}
          transition={{
            duration: 0.35,
          }}
          className="
            text-[10rem]
            font-black
            tracking-wider
            text-white
            drop-shadow-[0_0_20px_rgba(255,255,255,.4)]
          "
        >
          {value}
        </motion.div>
      </AnimatePresence>

      {/* Corner Marks */}
      <div className="absolute left-16 top-16 h-8 w-8 border-l-2 border-t-2 border-white/40" />
      <div className="absolute right-16 top-16 h-8 w-8 border-r-2 border-t-2 border-white/40" />
      <div className="absolute bottom-16 left-16 h-8 w-8 border-b-2 border-l-2 border-white/40" />
      <div className="absolute bottom-16 right-16 h-8 w-8 border-b-2 border-r-2 border-white/40" />
    </div>
  );
}