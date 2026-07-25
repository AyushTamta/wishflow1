"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import CreditRoll from "./CreditRoll";
import ReplayButton from "./ReplayButton";

import { useScene } from "@/hooks/useScene";

interface CreditsSceneProps {
  active: boolean;
  onReplay?: () => void;
}

export default function CreditsScene({
  active,
  onReplay,
}: CreditsSceneProps) {
  useScene("credits", active);

  const [finished, setFinished] = useState(false);

  if (!active) return null;

  return (
    <motion.section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
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
        className="absolute bottom-20"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: finished ? 1 : 0,
        }}
      >
        <ReplayButton
          onReplay={onReplay ?? (() => window.location.reload())}
        />
      </motion.div>

      <motion.div
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 43,
        }}
        onAnimationComplete={() => setFinished(true)}
      />
    </motion.section>
  );
}