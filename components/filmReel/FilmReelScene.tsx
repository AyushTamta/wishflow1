"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import FilmStrip from "./FilmStrip";

interface FilmReelSceneProps {
  active: boolean;
  photos: string[];
  onComplete: () => void;
}

export default function FilmReelScene({
  active,
  photos,
  onComplete,
}: FilmReelSceneProps) {
  const [showStrip, setShowStrip] = useState(false);
  const [beamOn, setBeamOn] = useState(false);
  const [reelSpin, setReelSpin] = useState(false);

  useEffect(() => {
    if (!active) return;

    setBeamOn(false);
    setShowStrip(false);
    setReelSpin(false);

    const beam = window.setTimeout(() => {
      setBeamOn(true);
    }, 400);

    const reel = window.setTimeout(() => {
      setReelSpin(true);
    }, 700);

    const strip = window.setTimeout(() => {
      setShowStrip(true);
    }, 1100);

    return () => {
      clearTimeout(beam);
      clearTimeout(reel);
      clearTimeout(strip);
    };
  }, [active]);

  const leftMarks = useMemo(
    () => Array.from({ length: 24 }),
    []
  );

  const rightMarks = useMemo(
    () => Array.from({ length: 24 }),
    []
  );

  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.section
          key="film-reel"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="relative h-screen w-screen overflow-hidden bg-[#050505]"
        >
          {/* theatre background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center,#171717 0%,#050505 70%,#000 100%)",
            }}
          />

          {/* projector beam */}

          <AnimatePresence>
            {beamOn && (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: [0.12, 0.28, 0.18],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="pointer-events-none absolute left-0 top-1/2 h-[650px] w-[60vw] -translate-y-1/2"
                style={{
                  clipPath:
                    "polygon(0 48%,100% 0,100% 100%)",
                  background:
                    "linear-gradient(90deg,rgba(255,240,180,.45),rgba(255,240,180,.06),transparent)",
                  filter: "blur(20px)",
                }}
              />
            )}
          </AnimatePresence>

          {/* left reel */}

          <motion.div
            animate={
              reelSpin
                ? {
                    rotate: 360,
                  }
                : {}
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-10 top-1/2 z-30 flex h-44 w-44 -translate-y-1/2 items-center justify-center rounded-full border-[10px] border-neutral-700"
          >
            <div className="absolute h-8 w-8 rounded-full bg-neutral-500" />

            {leftMarks.map((_, i) => (
              <div
                key={i}
                className="absolute h-2 w-16 origin-left rounded bg-neutral-600"
                style={{
                  transform: `rotate(${i * 15}deg)`,
                }}
              />
            ))}
          </motion.div>

          {/* right reel */}
                    <motion.div
            animate={
              reelSpin
                ? {
                    rotate: -360,
                  }
                : {}
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute right-10 top-1/2 z-30 flex h-44 w-44 -translate-y-1/2 items-center justify-center rounded-full border-[10px] border-neutral-700"
          >
            <div className="absolute h-8 w-8 rounded-full bg-neutral-500" />

            {rightMarks.map((_, i) => (
              <div
                key={i}
                className="absolute h-2 w-16 origin-left rounded bg-neutral-600"
                style={{
                  transform: `rotate(${i * 15}deg)`,
                }}
              />
            ))}
          </motion.div>

          {/* beam glow */}

          <motion.div
            animate={{
              opacity: [0.15, 0.28, 0.15],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle,rgba(255,230,150,.18),transparent 72%)",
              filter: "blur(60px)",
            }}
          />

          {/* dust */}

          <motion.div
            className="pointer-events-none absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: [
                "0px 0px",
                "90px 70px",
                "-80px 120px",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.35,
              ease: "linear",
            }}
            style={{
              backgroundImage:
                "url('/images/noise.png')",
            }}
          />

          {/* film strip */}

          <AnimatePresence>
            {showStrip && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.9,
                }}
                className="absolute inset-0 z-20"
              >
                <FilmStrip
                  photos={photos}
                  onComplete={onComplete}
                />
              </motion.div>
            )}
          </AnimatePresence>

                    {/* vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle, transparent 48%, rgba(0,0,0,.72) 100%)",
            }}
          />

          {/* cinema frame */}
          <div className="pointer-events-none absolute inset-0 border-[14px] border-black shadow-[0_0_120px_black_inset]" />

          {/* title */}
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: showStrip ? 1 : 0,
              y: showStrip ? 0 : -20,
            }}
            transition={{
              delay: 0.3,
              duration: 0.8,
            }}
            className="absolute left-1/2 top-10 z-40 -translate-x-1/2"
          >
            <p className="text-xs uppercase tracking-[0.8em] text-neutral-400">
              Kodak Memory Reel
            </p>

            <h2 className="mt-3 text-center text-3xl font-semibold text-white">
              Every Frame Has A Story
            </h2>
          </motion.div>

          {/* footer hint */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: showStrip ? 1 : 0,
            }}
            transition={{
              delay: 1,
            }}
            className="pointer-events-none absolute bottom-8 left-1/2 z-40 -translate-x-1/2 rounded-full border border-neutral-700 bg-black/40 px-5 py-2 backdrop-blur-md"
          >
            <span className="text-[10px] uppercase tracking-[0.45em] text-neutral-300">
              Drag • Scroll • Swipe
            </span>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}