"use client";

import { motion } from "framer-motion";

import Sky from "./Sky";
import Stars from "./Stars";
import Moon from "./Moon";
import MoonReflection from "./MoonReflection";
import Ocean from "./Ocean";
import Waves from "./Waves";
import Skyline from "./Skyline";
import HeroTitle from "./HeroTitle";
import Glow from "../ui/Glow";
import useParallax from "@/hooks/useParallax";

export default function MarineDriveHero() {
  const { x, y } = useParallax(20);

  return (
    <section className="absolute inset-0 overflow-hidden bg-[#050814]">

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

      <HeroTitle />
    </section>
  );
}