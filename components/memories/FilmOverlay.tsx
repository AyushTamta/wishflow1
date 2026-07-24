"use client";

import { motion } from "framer-motion";
import GrainOverlay from "./GrainOverlay";

export default function FilmOverlay() {
  return (
    <>
      <GrainOverlay />

      {/* Projector brightness flicker */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-white"
        animate={{
          opacity: [0.03, 0.07, 0.02, 0.05, 0.03],
        }}
        transition={{
          duration: 0.18,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent_58%,rgba(0,0,0,.75)_100%)]" />

      {/* Vertical scratches */}
      <motion.div
        animate={{
          x: ["-4%", "104%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute inset-y-0 w-[2px] bg-white/10 blur-[1px]"
      />

      <motion.div
        animate={{
          x: ["110%", "-10%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute inset-y-0 w-px bg-white/10"
      />
    </>
  );
}