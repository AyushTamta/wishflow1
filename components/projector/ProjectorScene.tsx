"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ProjectorLens from "./ProjectorLens";
import ProjectorBeam from "./ProjectorBeam";
import DustParticles from "./DustParticles";
import Countdown from "./Countdown";

export default function ProjectorScene() {
  const [powerOn, setPowerOn] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showMemories, setShowMemories] = useState(false);

  useEffect(() => {
    // Power on projector
    const powerTimer = setTimeout(() => {
      setPowerOn(true);
    }, 500);

    // Show countdown after projector starts
    const countdownTimer = setTimeout(() => {
      setShowCountdown(true);
    }, 2200);

    // Countdown ends -> next scene can begin
    const memoriesTimer = setTimeout(() => {
      setShowMemories(true);
    }, 5200);

    return () => {
      clearTimeout(powerTimer);
      clearTimeout(countdownTimer);
      clearTimeout(memoriesTimer);
    };
  }, []);

  return (
    <motion.section
      className="absolute inset-0 overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-900"
        animate={{
          filter: powerOn ? "brightness(1)" : "brightness(0.35)",
        }}
        transition={{
          duration: 1,
        }}
      />

      {/* Projector Beam */}
      <AnimatePresence>
        {powerOn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
            }}
          >
            <ProjectorBeam />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dust */}
      <AnimatePresence>
        {powerOn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.3,
              duration: 1,
            }}
          >
            <DustParticles />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projector */}
      <ProjectorLens />

      {/* Ambient Glow */}
      <motion.div
        animate={{
          opacity: powerOn ? [0.08, 0.15, 0.08] : 0,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_left,rgba(255,220,120,.12),transparent_65%)]
        "
      />

      {/* Film Flicker */}
      {powerOn && (
        <motion.div
          animate={{
            opacity: [0, 0.03, 0.06, 0.02, 0],
          }}
          transition={{
            duration: 0.12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            pointer-events-none
            absolute
            inset-0
            bg-white
            mix-blend-overlay
          "
        />
      )}

      {/* Vignette */}
      <motion.div
        animate={{
          opacity: powerOn ? 0.55 : 0.85,
        }}
        transition={{
          duration: 1,
        }}
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle,transparent_45%,rgba(0,0,0,.85)_100%)]
        "
      />

      {/* Countdown */}
      <AnimatePresence mode="wait">
        {showCountdown && !showMemories && <Countdown />}
      </AnimatePresence>

      {/* Future Memory Reel */}
      <AnimatePresence>
        {showMemories && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
              absolute
              inset-0
              z-50
              flex
              items-center
              justify-center
              text-6xl
              font-light
              tracking-[0.3em]
              text-white
            "
          >
            MEMORY REEL
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}