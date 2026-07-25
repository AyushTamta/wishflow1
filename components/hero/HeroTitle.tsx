"use client";

import { motion } from "framer-motion";
import { hero } from "@/lib/content";

export default function HeroTitle() {
  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6">
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.8,
          duration: 1,
        }}
        className="mb-6 uppercase tracking-[0.4em] text-white/70"
      >
        A birthday wish from Marine Drive
      </motion.p>

      <motion.h1
        initial={{
          opacity: 0,
          scale: 0.92,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 1.2,
          duration: 1,
        }}
        className="text-5xl font-black leading-tight md:text-8xl"
      >
        {hero.title}
      </motion.h1>

      <motion.h2
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.8,
          duration: 1,
        }}
        className="mt-6 text-2xl font-light text-yellow-300 md:text-5xl"
      >
        {hero.name}
      </motion.h2>
    </div>
  );
}
