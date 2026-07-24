"use client";

import { motion } from "framer-motion";

export default function HeroTitle() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.8,
        duration: 1.4,
      }}
    >
      <p className="mb-6 text-neutral-300 tracking-[0.5em] uppercase">
        Every great story begins with a single frame
      </p>

      <h1 className="text-7xl md:text-9xl font-bold">
        Happy Birthday
      </h1>

      <h2 className="mt-4 text-4xl text-white/80">
        Ambay ❤️
      </h2>
    </motion.div>
  );
}