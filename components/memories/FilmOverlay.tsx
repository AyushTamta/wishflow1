"use client";

import { motion } from "framer-motion";

export default function FilmOverlay() {
  return (
    <>
      {/* Animated Film Grain */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-soft-light"
        animate={{
          backgroundPosition: [
            "0px 0px",
            "120px 80px",
            "-80px 120px",
            "0px 0px",
          ],
        }}
        transition={{
          duration: 0.35,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1.5px),
            radial-gradient(circle, rgba(255,255,255,0.5) 0.8px, transparent 1.2px)
          `,
          backgroundSize: "90px 90px, 140px 140px",
        }}
      />

      {/* Projector Flicker */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-white"
        animate={{
          opacity: [0.015, 0.04, 0.02, 0.035, 0.018],
        }}
        transition={{
          duration: 0.12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Gate Weave */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          x: [0, -1, 1, 0],
          y: [0, 1, -1, 0],
        }}
        transition={{
          duration: 0.18,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Vertical Scratches */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-20"
        animate={{
          backgroundPositionY: [
            "0%",
            "100%",
          ],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              transparent,
              rgba(255,255,255,.12),
              transparent
            )
          `,
          backgroundRepeat: "repeat-x",
          backgroundSize: "180px 100%",
        }}
      />

      {/* Dust */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          y: [0, 60],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Edge vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent_55%,rgba(0,0,0,.45)_100%)]" />

      {/* Warm projector tint */}
      <div className="pointer-events-none absolute inset-0 bg-amber-100/5 mix-blend-screen" />
    </>
  );
}