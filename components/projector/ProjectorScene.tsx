"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ProjectorLens from "./ProjectorLens";
import ProjectorBeam from "./ProjectorBeam";
import DustParticles from "./DustParticles";
import Countdown from "./Countdown";

export default function ProjectorScene() {
  const [countdown, setCountdown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-40 overflow-hidden bg-black"
    >
      <ProjectorBeam />

      <DustParticles />

      <ProjectorLens />

      <AnimatePresence>
        {countdown && <Countdown />}
      </AnimatePresence>
    </motion.div>
  );
}