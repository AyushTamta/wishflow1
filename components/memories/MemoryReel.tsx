"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { memories } from "@/lib/memories";
import { MemoryReelProps } from "@/types/memory";

import MemoryFrame from "./MemoryFrame";
import MemoryCaption from "./MemoryCaption";
import ProgressDots from "./ProgressDots";
import FilmOverlay from "./FilmOverlay";
import FilmBurn from "./FilmBurn";

export default function MemoryReel({
  active,
  onComplete,
}: MemoryReelProps) {
  const slides = useMemo(() => memories, []);

  const [current, setCurrent] = useState(0);
  const [burn, setBurn] = useState(false);

  useEffect(() => {
    if (!active) return;

    setCurrent(0);
    setBurn(false);
  }, [active]);

  useEffect(() => {
    if (!active) return;

    if (current >= slides.length) return;

    const currentMemory = slides[current];

    const duration = currentMemory.duration ?? 4500;

    const timer = setTimeout(() => {
      setBurn(true);

      setTimeout(() => {
        setBurn(false);

        if (current === slides.length - 1) {
          onComplete();
        } else {
          setCurrent((prev) => prev + 1);
        }
      }, 850);
    }, duration);

    return () => clearTimeout(timer);
  }, [active, current, slides, onComplete]);

  if (!active) return null;

  const memory = slides[current];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">
      <FilmBurn show={burn} />

      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      <AnimatePresence mode="wait">
        <div
          key={memory.id}
          className="relative flex w-full max-w-6xl flex-col items-center"
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
        </div>
      </AnimatePresence>
    </section>
  );
}