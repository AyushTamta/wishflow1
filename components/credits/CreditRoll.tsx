"use client";

import { motion } from "framer-motion";

const credits = [
  "A Small Story",
  "",
  "Created with ❤️",
  "for someone special",
  "",
  "Photography",
  "Our Memories",
  "",
  "Music",
  "The Moments Between Us",
  "",
  "Written by",
  "Ayush",
  "",
  "Directed by",
  "Ayush",
  "",
  "Thank you",
  "for watching.",
];

export default function CreditRoll() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        initial={{
          y: "100%",
        }}
        animate={{
          y: "-120%",
        }}
        transition={{
          duration: 42,
          ease: "linear",
        }}
        className="absolute left-1/2 top-full w-full max-w-3xl -translate-x-1/2"
      >
        <div className="space-y-10 py-40 text-center">
          {credits.map((line, index) => (
            <p
              key={index}
              className="text-2xl font-light tracking-wide text-white/90"
            >
              {line}
            </p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}