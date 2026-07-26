"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { memories } from "@/lib/memories";
import { ActiveStorySceneProps } from "@/types/scene";

import { useScene } from "@/hooks/useScene";

import MemoryFrame from "./MemoryFrame";
import MemoryCaption from "./MemoryCaption";
import ProgressDots from "./ProgressDots";
import FilmOverlay from "./FilmOverlay";
import FilmBurn from "./FilmBurn";
import CinematicBackground from "./CinematicBackground";

import FilmReelScene from "@/components/filmReel/FilmReelScene";

const DEFAULT_DURATION = 4500;
const FILM_BURN_DURATION = 850;
const MOVIE_MOMENTS = ["🎬 Director's Cut", "🎞 35mm Memories", "🍿 Interval Over"];
const REEL_GUEST_PHOTOS = Array.from(
  { length: 8 },
  (_, index) => `/images/reel-${String(index + 1).padStart(2, "0")}.jpg`
);

export default function MemoryReel({
  active,
  onComplete,
}: ActiveStorySceneProps) {
  useScene("memoryReel", active);

  const slides = useMemo(() => memories, []);
  const previewSlides = useMemo(() => slides.slice(0, 6), [slides]);
  const reelPhotos = useMemo(
    () => [...slides.slice(previewSlides.length).map((memory) => memory.image), ...REEL_GUEST_PHOTOS],
    [previewSlides.length, slides]
  );

  const [current, setCurrent] = useState(0);
  const [burn, setBurn] = useState(false);
  const [showReelPrompt, setShowReelPrompt] = useState(false);
  const [showFilmReel, setShowFilmReel] = useState(false);
  const [movieMoment, setMovieMoment] = useState(MOVIE_MOMENTS[0]);

  const completedRef = useRef(false);

  /*
   * Reset whenever scene starts
   */
  useEffect(() => {
    if (!active) return;

    completedRef.current = false;

    setCurrent(0);
    setBurn(false);
    setShowReelPrompt(false);
    setShowFilmReel(false);
    setMovieMoment(MOVIE_MOMENTS[0]);
  }, [active]);

  /*
   * Preload images
   */
  useEffect(() => {
    slides.forEach((memory) => {
      const img = new Image();
      img.src = memory.image;
    });
  }, [slides]);

  /*
   * Slideshow
   */
  useEffect(() => {
    if (!active) return;
    if (completedRef.current) return;
    if (!previewSlides.length) return;
    if (showFilmReel || showReelPrompt) return;

    const memory = previewSlides[current];
    const duration = memory.duration ?? DEFAULT_DURATION;

    const slideshowTimer = window.setTimeout(() => {
      setBurn(true);

      const burnTimer = window.setTimeout(() => {
        setBurn(false);

        // Last slide -> show interactive film reel
        if (current >= previewSlides.length - 1) {
          completedRef.current = true;
          setShowReelPrompt(true);
          return;
        }

        setCurrent((prev) => prev + 1);
      }, FILM_BURN_DURATION);

      return () => clearTimeout(burnTimer);
    }, duration);

    return () => clearTimeout(slideshowTimer);
  }, [
    active,
    current,
    previewSlides,
    onComplete,
    showFilmReel,
    showReelPrompt,
  ]);

  if (!active) return null;

  if (!slides.length) {
    return (
      <section className="flex h-screen items-center justify-center bg-black text-white">
        No memories found.
      </section>
    );
  }

  if (showFilmReel) {
    return (
      <FilmReelScene
        active
        photos={reelPhotos}
        onComplete={onComplete}
      />
    );
  }

  if (showReelPrompt) {
    return (
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080604] px-6 py-10 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,213,126,.18),transparent_28%),linear-gradient(135deg,#020202,#211208_52%,#020202)]" />
        <div className="pointer-events-none absolute left-0 top-1/2 h-[70vh] w-[52vw] -translate-y-1/2 bg-[linear-gradient(90deg,rgba(255,235,174,.18),transparent)] [clip-path:polygon(0_42%,100%_0,100%_100%,0_58%)] blur-xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-[repeating-linear-gradient(90deg,#3d1510_0_42px,#7b2a1e_42px_84px)] opacity-35" />

        <motion.div
          className="pointer-events-none absolute left-[8%] top-[17%] text-7xl text-[#e6c67a]/30 md:text-9xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        >
          ◉
        </motion.div>
        <motion.div
          className="pointer-events-none absolute bottom-[14%] right-[8%] text-7xl text-[#e6c67a]/25 md:text-9xl"
          animate={{ rotate: -360 }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        >
          ◉
        </motion.div>

        <motion.div
          className="relative z-10 max-w-2xl"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div className="mx-auto mb-5 w-48 -rotate-3 rounded-md border-4 border-[#e5c279] bg-[linear-gradient(145deg,#f1dfa7,#bd8441)] px-5 py-3 text-left text-[#251008] shadow-[0_0_0_7px_rgba(0,0,0,.7),0_0_70px_rgba(230,198,122,.3)] md:w-60" whileHover={{ rotate: 0, scale: 1.04 }}>
            <div className="mb-2 flex items-center justify-between border-b border-[#5a2c14]/40 pb-1 text-[8px] font-bold tracking-[0.2em] md:text-[10px]"><span>FEATURE PRESENTATION</span><span>TAKE 06</span></div>
            <div className="flex items-end gap-2"><span className="text-3xl font-black">🎬</span><span className="text-xs font-bold tracking-[0.15em] md:text-sm">DIRECTOR&apos;S<br />CUT</span></div>
          </motion.div>
          <p className="text-[10px] uppercase tracking-[0.46em] text-[#e6c67a]/75">🎞 Feature Presentation</p>
          <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/55">A private screening for</p>
          <h2 className="mt-2 font-serif text-2xl tracking-[0.34em] text-[#ffe4a0] md:text-4xl">AMMU-BATASHAA</h2>
          <div className="mx-auto mt-6 h-px w-full max-w-xl bg-gradient-to-r from-transparent via-[#e6c67a]/70 to-transparent" />
          <h3 className="mt-6 font-serif text-3xl text-white md:text-5xl">Lights. Camera. Memories.</h3>
          <p className="mt-4 text-base leading-7 text-white/75 md:text-lg">Tonight&apos;s feature isn&apos;t fiction.</p>
          <p className="mt-3 text-base leading-7 text-white/60">It&apos;s made of smiles, laughter,<br />and moments worth replaying.</p>
          <p className="mt-6 font-serif text-xl italic text-[#ffe7a7] md:text-2xl">&quot;Picture abhi baaki hai,<br />mere dost.&quot;</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {MOVIE_MOMENTS.map((moment) => (
              <button
                key={moment}
                type="button"
                onClick={() => setMovieMoment(moment)}
                className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.16em] transition ${movieMoment === moment ? "border-[#e6c67a]/80 bg-[#e6c67a]/20 text-[#ffe7a7]" : "border-white/15 bg-black/20 text-white/50 hover:border-white/40"}`}
              >
                {moment}
              </button>
            ))}
          </div>
          <motion.p key={movieMoment} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-[10px] uppercase tracking-[0.28em] text-white/45">Selected: {movieMoment}</motion.p>
          <div className="mx-auto mt-6 h-px w-full max-w-xl bg-gradient-to-r from-transparent via-[#e6c67a]/55 to-transparent" />
          <p className="mt-5 text-[10px] uppercase tracking-[0.36em] text-[#e6c67a]/70">Now showing</p>
          <p className="mt-2 font-serif text-2xl tracking-[0.2em] text-white md:text-3xl">THE STORY OF YOU</p>
          <p className="mt-3 text-xs leading-5 text-white/55">Runtime: Too Short.<br />Memories: Countless.</p>
          <div className="mx-auto mt-5 h-px w-full max-w-xl bg-gradient-to-r from-transparent via-[#e6c67a]/55 to-transparent" />
          <motion.button
            type="button"
            onClick={() => setShowFilmReel(true)}
            className="mt-8 rounded-full border border-[#e6c67a]/70 bg-[linear-gradient(135deg,#b56f27,#f0d185,#a75c1d)] px-9 py-4 text-sm font-black uppercase tracking-[0.18em] text-[#281006] shadow-[0_0_40px_rgba(230,198,122,.35)]"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            ▶ Enter the Cinema
          </motion.button>
        </motion.div>
      </section>
    );
  }

  const memory = previewSlides[current];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-10">
      <CinematicBackground />

      <FilmBurn show={burn} />

      <AnimatePresence mode="wait">
        <motion.div
          key={memory.id}
          className="relative z-20 flex w-full max-w-6xl flex-col items-center"
          initial={{
            opacity: 0,
            y: 24,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -24,
            scale: 1.02,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <div className="relative w-full">
            <MemoryFrame
              image={memory.image}
              alt={memory.caption}
            />

            <FilmOverlay />
          </div>

          <MemoryCaption
            caption={memory.caption}
            location={memory.location}
            date={memory.date}
          />

          <ProgressDots
            total={previewSlides.length}
            current={current}
          />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
