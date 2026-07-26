"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ProjectorLens from "./ProjectorLens";
import ProjectorBeam from "./ProjectorBeam";
import DustParticles from "./DustParticles";
import Countdown from "./Countdown";

import { ActiveStorySceneProps } from "@/types/scene";
import { useScene } from "@/hooks/useScene";

const POWER_ON_DELAY = 500;
const COUNTDOWN_DELAY = 2200;
// Give each leader frame a full beat on screen: 3, then 2, then 1.
const FLASH_DELAY = 5750;

export default function ProjectorScene({
  active,
  onComplete,
}: ActiveStorySceneProps) {
  useScene("projector", active);

  const [powerOn, setPowerOn] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (!active) return;

    setPowerOn(false);
    setShowCountdown(false);
    setTransitioning(false);

    const timers: number[] = [];

    timers.push(
      window.setTimeout(() => {
        setPowerOn(true);
      }, POWER_ON_DELAY)
    );

    timers.push(
      window.setTimeout(() => {
        setShowCountdown(true);
      }, COUNTDOWN_DELAY)
    );

    timers.push(
      window.setTimeout(() => {
        setTransitioning(true);
      }, FLASH_DELAY)
    );

    // Advance to the next scene after the flash animation
    timers.push(
      window.setTimeout(() => {
        onComplete();
      }, FLASH_DELAY + 700)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <motion.section
      className="absolute inset-0 overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.8,
        },
      }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          background: powerOn
            ? [
                "radial-gradient(circle at center,#111,#000)",
                "radial-gradient(circle at center,#1a1a1a,#000)",
                "radial-gradient(circle at center,#111,#000)",
              ]
            : "radial-gradient(circle at center,#050505,#000)",
          filter: powerOn
            ? "brightness(1)"
            : "brightness(.3)",
        }}
        transition={{
          duration: 2,
          repeat: powerOn ? Infinity : 0,
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          opacity: powerOn ? [0.08, 0.18, 0.1] : 0,
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        style={{
          background:
            "radial-gradient(circle at 25% 50%,rgba(255,210,120,.18),transparent 55%)",
        }}
      />

      <AnimatePresence>
        {powerOn && (
          <motion.div
            className="absolute inset-0"
            initial={{
              opacity: 0,
              scaleY: 0.9,
            }}
            animate={{
              opacity: transitioning ? 0 : 1,
              scaleY: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <ProjectorBeam />
            <DustParticles />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          opacity: transitioning ? 0 : 1,
          scale: transitioning ? 0.98 : powerOn ? [1, 1.01, 1] : 1,
          y: powerOn ? [0, -2, 0] : 0,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ProjectorLens />
      </motion.div>

      {powerOn && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-white mix-blend-overlay"
          animate={{
            opacity: transitioning
              ? 0
              : [0.01, 0.05, 0.02, 0.04, 0.01],
          }}
          transition={{
            duration: 0.14,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {powerOn && (
        <motion.div
          className="pointer-events-none absolute left-[28%] top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-3xl"
          animate={{
            opacity: [0.15, 0.28, 0.18],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          style={{
            background:
              "radial-gradient(circle,rgba(255,245,180,.35),transparent 70%)",
          }}
        />
      )}

      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent_42%,rgba(0,0,0,.88)_100%)]"
        animate={{
          opacity: transitioning ? 1 : powerOn ? 0.55 : 0.85,
        }}
      />

      <AnimatePresence mode="wait">
        {showCountdown && !transitioning && <Countdown />}
      </AnimatePresence>

      <AnimatePresence>
        {transitioning && (
          <motion.div
            className="absolute inset-0 z-50 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}
