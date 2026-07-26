"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import HeroSequence from "./HeroSequence";
import FloatingParticles from "./FloatingParticles";
import FilmGrain from "./FilmGrain";

interface MarineDriveHeroProps {
  onComplete: () => void;
}

export default function MarineDriveHero({ onComplete }: MarineDriveHeroProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [celebrationStarted, setCelebrationStarted] = useState(false);

  useEffect(() => {
    if (!celebrationStarted) return;

    const timer = window.setTimeout(onComplete, 5200);
    return () => window.clearTimeout(timer);
  }, [celebrationStarted, onComplete]);

  const startCelebration = () => {
    // Change the screen during the trusted button event. Audio playback can
    // resolve later (or be rejected by a browser) and must not block the story.
    setCelebrationStarted(true);

    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.volume = 0.7;
      void audio.play().catch(() => {
        // The visual celebration still proceeds if a browser denies audio.
      });
    }
  };

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

      <audio
        ref={audioRef}
        src="/audio/fireworks-grand-finale.mp3"
        preload="auto"
        playsInline
      />

      {!celebrationStarted && (
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center px-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="relative max-w-3xl rounded-[2rem] border border-white/15 bg-black/20 px-8 py-12 shadow-[0_0_100px_rgba(1,12,24,.65)] backdrop-blur-[3px] md:px-16 md:py-16">
            <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#e6c67a]/80 to-transparent" />
            <p className="font-serif text-4xl leading-tight text-white md:text-6xl">Some sunsets are remembered.</p>
            <p className="mt-5 font-serif text-2xl leading-tight text-[#f1d99c] md:text-4xl">Some places are never forgotten.</p>
            <p className="mt-5 font-serif text-2xl leading-tight text-white/90 md:text-4xl">And some surprises are worth waiting for.</p>
            <motion.button
              type="button"
              onClick={startCelebration}
              className="mt-12 rounded-full border border-[#e6c67a]/65 bg-[#e6c67a]/10 px-8 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#ffe6a8] shadow-[0_0_35px_rgba(230,198,122,.22)]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              Press to Continue →
            </motion.button>
            <div className="absolute inset-x-12 bottom-0 h-px bg-gradient-to-r from-transparent via-[#e6c67a]/45 to-transparent" />
          </div>
        </motion.div>
      )}

      {celebrationStarted && <HeroSequence />}
    </motion.section>
  );
}
