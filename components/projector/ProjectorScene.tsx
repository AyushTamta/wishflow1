"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ProjectorLens from "./ProjectorLens";
import ProjectorBeam from "./ProjectorBeam";
import DustParticles from "./DustParticles";
import Countdown from "./Countdown";

interface ProjectorSceneProps {
  active: boolean;
  onComplete: () => void;
}

export default function ProjectorScene({
  active,
  onComplete,
}: ProjectorSceneProps) {
  const [powerOn, setPowerOn] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (!active) return;

    setPowerOn(false);
    setShowCountdown(false);
    setTransitioning(false);

    const powerTimer = setTimeout(() => {
      setPowerOn(true);
    }, 500);

    const countdownTimer = setTimeout(() => {
      setShowCountdown(true);
    }, 2200);

    const transitionTimer = setTimeout(() => {
      setTransitioning(true);

      setTimeout(() => {
        onComplete();
      }, 700);
    }, 5200);

    return () => {
      clearTimeout(powerTimer);
      clearTimeout(countdownTimer);
      clearTimeout(transitionTimer);
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
        className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-900"
        animate={{
          filter: powerOn
            ? "brightness(1)"
            : "brightness(.35)",
        }}
        transition={{
          duration: 1,
        }}
      />

      {/* Beam */}
      <AnimatePresence>
        {powerOn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: transitioning ? 0 : 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
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
            animate={{
              opacity: transitioning ? 0 : 1,
            }}
            transition={{
              delay: .3,
              duration: .8,
            }}
          >
            <DustParticles />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projector */}
      <motion.div
        animate={{
          opacity: transitioning ? 0 : 1,
          scale: transitioning ? .98 : 1,
        }}
        transition={{
          duration: .7,
        }}
      >
        <ProjectorLens />
      </motion.div>

      {/* Ambient Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(255,220,120,.12),transparent_65%)]"
        animate={{
          opacity: powerOn
            ? transitioning
              ? 0
              : [0.08, 0.15, 0.08]
            : 0,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />

      {/* Film Flicker */}
      {powerOn && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-white mix-blend-overlay"
          animate={{
            opacity: transitioning
              ? 0
              : [0, .03, .06, .02, 0],
          }}
          transition={{
            duration: .12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* Vignette */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent_45%,rgba(0,0,0,.85)_100%)]"
        animate={{
          opacity: transitioning
            ? 1
            : powerOn
            ? .55
            : .85,
        }}
        transition={{
          duration: .7,
        }}
      />

      {/* Countdown */}
      <AnimatePresence mode="wait">
        {showCountdown && !transitioning && (
          <Countdown />
        )}
      </AnimatePresence>

      {/* Final Flash */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
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
              duration: .7,
            }}
            className="absolute inset-0 z-50 bg-white"
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}