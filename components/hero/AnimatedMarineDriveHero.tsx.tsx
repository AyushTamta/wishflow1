"use client";

import { motion } from "framer-motion";

import Sky from "./Sky";
import Stars from "./Stars";
import Moon from "./Moon";
import MoonReflection from "./MoonReflection";
import Ocean from "./Ocean";
import Waves from "./Waves";
import Skyline from "./Skyline";
import HeroSequence from "./HeroSequence";
import Glow from "../ui/Glow";
import useParallax from "@/hooks/useParallax";
import FilmGrain from "./FilmGrain";

export default function MarineDriveHero() {
  const { x, y } = useParallax(20);

  return (
    <motion.section
      className="absolute inset-0 overflow-hidden bg-[#050814]"
      initial={{ scale: 1 }}
      animate={{ scale: 1.08 }}
      transition={{
        duration: 24,
        ease: "linear",
      }}
    >
      {/* Sky */}
      <Sky />

      {/* Stars */}
      <motion.div
        style={{
          x,
          y,
        }}
      >
        <Stars />
      </motion.div>

      {/* Moon */}
      <motion.div
        style={{
          x: x.get() * 0.4,
          y: y.get() * 0.4,
        }}
      >
        <Moon />
      </motion.div>

      <Glow className="left-1/2 top-20 h-72 w-72 -translate-x-1/2 bg-sky-300/20" />

      {/* Skyline */}
      <motion.div
        style={{
          x: x.get() * 0.2,
        }}
      >
        <Skyline />
      </motion.div>

      {/* Ocean */}
      <motion.div
        style={{
          x: x.get() * 0.1,
        }}
      >
        <Ocean />
      </motion.div>

      <MoonReflection />

      <Waves />

      {/* Cinematic intro sequence */}
      {/* Cinematic vignette */}
<div
  className="pointer-events-none absolute inset-0 z-30"
  style={{
    background:
      "radial-gradient(circle at center, transparent 25%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.7) 100%)",
  }}
/>

{/* Soft top gradient */}
<div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-1/2 bg-gradient-to-b from-black/35 to-transparent" />

{/* Soft bottom gradient */}
<div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
<FilmGrain />

      <HeroSequence />
    </motion.section>
  );
}