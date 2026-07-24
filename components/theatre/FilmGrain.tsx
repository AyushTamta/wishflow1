"use client";

import { motion } from "framer-motion";

export default function FilmGrain() {
  return (
    <>
      {/* Fine grain */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-soft-light"
        animate={{
          backgroundPosition: [
            "0px 0px",
            "120px 80px",
            "-80px 150px",
            "40px -100px",
          ],
        }}
        transition={{
          duration: 0.35,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,.7) 0.6px, transparent 0.8px)",
          backgroundSize: "6px 6px",
        }}
      />

      {/* Subtle flicker */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-white"
        animate={{
          opacity: [0, 0.015, 0, 0.01, 0],
        }}
        transition={{
          duration: 0.18,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </>
  );
}