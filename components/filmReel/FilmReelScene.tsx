"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!active) return;

    setBeamOn(false);
    setShowStrip(false);

    const beam = window.setTimeout(() => {
      setBeamOn(true);
    }, 400);

    const strip = window.setTimeout(() => {
      setShowStrip(true);
    }, 800);

    return () => {
      clearTimeout(beam);
      clearTimeout(strip);
    };
  }, [active]);

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
          className="relative h-[100dvh] w-screen overflow-hidden bg-[#050505]"
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

        </motion.section>
      )}
    </AnimatePresence>
  );
}
