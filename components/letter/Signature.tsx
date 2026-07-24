"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SignatureProps {
  name: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export default function Signature({
  name,
  delay = 800,
  className = "",
  onComplete,
}: SignatureProps) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    setVisibleText("");

    let interval: number | undefined;
    let finishTimer: number | undefined;

    const startTimer = window.setTimeout(() => {
      let current = 0;

      interval = window.setInterval(() => {
        current++;

        setVisibleText(name.slice(0, current));

        if (current >= name.length) {
          if (interval) {
            window.clearInterval(interval);
          }

          finishTimer = window.setTimeout(() => {
            onComplete?.();
          }, 500);
        }
      }, 120);
    }, delay);

    return () => {
      window.clearTimeout(startTimer);

      if (interval) {
        window.clearInterval(interval);
      }

      if (finishTimer) {
        window.clearTimeout(finishTimer);
      }
    };
  }, [name, delay, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: visibleText ? 1 : 0,
        y: visibleText ? 0 : 20,
      }}
      transition={{ duration: 0.8 }}
      className={`mt-12 flex justify-end ${className}`}
    >
      <div className="text-right">
        <p className="mb-2 text-lg text-zinc-600">
          With love,
        </p>

        <h2 className="font-serif text-4xl italic tracking-wide text-zinc-800">
          {visibleText}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            |
          </motion.span>
        </h2>
      </div>
    </motion.div>
  );
}