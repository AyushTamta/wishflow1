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

export default function MemoryReel({
  active,
  onComplete,
}: ActiveStorySceneProps) {
  useScene("memoryReel", active);

  const slides = useMemo(() => memories, []);

  const [current, setCurrent] = useState(0);
  const [burn, setBurn] = useState(false);
  const [showFilmReel, setShowFilmReel] = useState(false);

  const completedRef = useRef(false);

  /*
   * Reset whenever scene starts
   */
  useEffect(() => {
    if (!active) return;

    completedRef.current = false;

    setCurrent(0);
    setBurn(false);
    setShowFilmReel(false);
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
    if (!slides.length) return;
    if (showFilmReel) return;

    const memory = slides[current];
    const duration = memory.duration ?? DEFAULT_DURATION;

    const slideshowTimer = window.setTimeout(() => {
      setBurn(true);

      const burnTimer = window.setTimeout(() => {
        setBurn(false);

        // Last slide -> show interactive film reel
        if (current >= slides.length - 1) {
          completedRef.current = true;
          setShowFilmReel(true);
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
    slides,
    onComplete,
    showFilmReel,
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
        photos={slides.map((memory) => memory.image)}
        onComplete={onComplete}
      />
    );
  }

  const memory = slides[current];

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
            total={slides.length}
            current={current}
          />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}