"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import CreditRoll from "./CreditRoll";
import ReplayButton from "./ReplayButton";

interface Props {
  active: boolean;
}

export default function CreditsScene({
  active,
}: Props) {
  const [finished, setFinished] = useState(false);

  if (!active) return null;

  return (
    <motion.section
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
    >
      {/* Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 150 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute h-1 w-1 rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <CreditRoll />

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: finished ? 1 : 0,
        }}
        className="absolute bottom-20"
      >
        <ReplayButton
          onReplay={() => location.reload()}
        />
      </motion.div>

      <motion.div
        onAnimationComplete={() => setFinished(true)}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 43,
        }}
      />
    </motion.section>
  );
}