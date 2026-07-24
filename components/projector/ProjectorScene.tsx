"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ProjectorLens from "./ProjectorLens";
import ProjectorBeam from "./ProjectorBeam";
import DustParticles from "./DustParticles";
import Countdown from "./Countdown";

import { ActiveStorySceneProps } from "@/types/scene";

const POWER_ON_DELAY = 500;
const COUNTDOWN_DELAY = 2200;
const TRANSITION_DELAY = 5200;
const FLASH_DURATION = 700;

export default function ProjectorScene({
  active,
  onComplete,
}: ActiveStorySceneProps) {
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

        window.setTimeout(() => {
          onComplete();
        }, FLASH_DURATION);
      }, TRANSITION_DELAY)
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
      {/* Background */}
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

      {/* Ambient projector glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          opacity: powerOn
            ? [0.08, 0.18, 0.1]
            : 0,
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

      {/* Beam */}
      <AnimatePresence>
        {powerOn && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.9 }}
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
            className="absolute inset-0"
          >
            <ProjectorBeam />
            <DustParticles />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projector */}
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

      {/* Flicker */}
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

      {/* Lens bloom */}
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

      {/* Vignette */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent_42%,rgba(0,0,0,.88)_100%)]"
        animate={{
          opacity: transitioning
            ? 1
            : powerOn
            ? 0.55
            : 0.85,
        }}
      />

      {/* Countdown */}
      <AnimatePresence mode="wait">
        {showCountdown && !transitioning && <Countdown />}
      </AnimatePresence>

      {/* Final projector flash */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            className="absolute inset-0 z-50 bg-white"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: [0, 1, 1],
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: FLASH_DURATION / 1000,
            }}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}