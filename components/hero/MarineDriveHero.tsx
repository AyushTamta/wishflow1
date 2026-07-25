"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import HeroSequence from "./HeroSequence";
import FloatingParticles from "./FloatingParticles";
import FilmGrain from "./FilmGrain";

export default function MarineDriveHero() {
  return (
    <motion.section
      className="absolute inset-0 overflow-hidden bg-black"
      initial={{ scale: 1 }}
      animate={{
        scale: 1.08,
        x: -20,
        y: -10,
      }}
      transition={{
        duration: 28,
        ease: "linear",
      }}
    >
      {/* Background Image */}
      <Image
        src="/images/marine-drive-hero.png"
        alt="Moonlit Marine Drive"
        fill
        priority
        className="object-cover object-center select-none"
      />

      {/* Ocean glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#02111d]/60 via-transparent to-[#04101d]/20" />

      {/* Moon glow */}
      <div className="absolute left-16 top-10 h-80 w-80 rounded-full bg-sky-300/10 blur-3xl" />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 28%, rgba(0,0,0,.25) 60%, rgba(0,0,0,.82) 100%)",
        }}
      />

      {/* Top shadow */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/45 to-transparent" />

      {/* Bottom shadow */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

      <FloatingParticles />

      <FilmGrain />

      <HeroSequence />
    </motion.section>
  );
}