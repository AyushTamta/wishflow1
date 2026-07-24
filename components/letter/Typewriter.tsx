"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  cursor?: boolean;
  onComplete?: () => void;
}

export default function Typewriter({
  text,
  speed = 28,
  className = "",
  cursor = true,
  onComplete,
}: TypewriterProps) {
  const characters = useMemo(() => [...text], [text]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index >= characters.length) {
      onComplete?.();
      return;
    }

    const current = characters[index];

    let delay = speed;

    switch (current) {
      case ".":
      case "!":
      case "?":
        delay = 420;
        break;

      case ",":
      case ";":
      case ":":
        delay = 220;
        break;

      case "\n":
        delay = 320;
        break;

      case " ":
        delay = speed * 0.6;
        break;

      default:
        delay = speed;
    }

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [index, characters, speed, onComplete]);

  return (
    <div
      className={`
        whitespace-pre-wrap
        leading-8
        tracking-wide
        text-zinc-800
        ${className}
      `}
    >
      {characters.slice(0, index).join("")}

      {cursor && index < characters.length && (
        <motion.span
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
          className="ml-1 inline-block font-light"
        >
          |
        </motion.span>
      )}
    </div>
  );
}