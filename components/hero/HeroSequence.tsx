"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

const FIREWORKS = [
  { x: "14%", y: "20%", color: "#ffd166", delay: 0 },
  { x: "82%", y: "18%", color: "#ff6b9a", delay: 0.6 },
  { x: "28%", y: "34%", color: "#8ec5ff", delay: 1.1 },
  { x: "70%", y: "36%", color: "#a6ffcb", delay: 1.7 },
  { x: "50%", y: "14%", color: "#fff1a8", delay: 0.25 },
  { x: "10%", y: "48%", color: "#f7a8ff", delay: 1.3 },
  { x: "90%", y: "50%", color: "#ffd6a5", delay: 1.9 },
];

const FLOWERS = [
  "✦",
  "✧",
  "✺",
  "✹",
  "✸",
  "✷",
  "✦",
  "✧",
  "✺",
  "✹",
  "✸",
  "✷",
];

function FirecrackerSound() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.55;

    const play = async () => {
      audio.currentTime = 0;
      try {
        await audio.play();
      } catch {
        // Browsers may block autoplay until the first user gesture.
      }
    };

    void play();

    window.addEventListener("pointerdown", play, { once: true });
    window.addEventListener("keydown", play, { once: true });

    return () => {
      window.removeEventListener("pointerdown", play);
      window.removeEventListener("keydown", play);
      audio.pause();
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/audio/fireworks-grand-finale.mp3"
      preload="auto"
      autoPlay
    />
  );
}

export default function HeroSequence() {
  const petals = useMemo(
    () =>
      FLOWERS.map((flower, index) => ({
        flower,
        left: `${8 + ((index * 7) % 84)}%`,
        delay: index * 0.35,
        duration: 7 + (index % 4),
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-[999] overflow-hidden px-6">
      <FirecrackerSound />

      {FIREWORKS.map((firework) => (
        <motion.div
          key={`${firework.x}-${firework.y}`}
          className="absolute h-44 w-44 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: firework.x,
            top: firework.y,
          }}
        >
          {Array.from({ length: 18 }).map((_, index) => (
            <motion.span
              key={index}
              className="absolute left-1/2 top-1/2 h-1.5 w-12 origin-left rounded-full"
              style={{
                background: `linear-gradient(90deg, ${firework.color}, transparent)`,
                rotate: `${index * 20}deg`,
              }}
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.45,
                delay: firework.delay,
                repeat: Infinity,
                repeatDelay: 1.4,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      ))}

      {petals.map((petal, index) => (
        <motion.span
          key={index}
          className="absolute top-[-10%] text-2xl text-pink-200/80 drop-shadow-[0_0_18px_rgba(255,190,210,.6)]"
          style={{
            left: petal.left,
          }}
          animate={{
            y: ["0vh", "112vh"],
            x: [0, index % 2 === 0 ? 34 : -28, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {petal.flower}
        </motion.span>
      ))}

      <div className="absolute inset-0 flex items-center justify-center text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 28,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 1.1,
            ease: "easeOut",
          }}
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-x-10 -inset-y-8 rounded-[32px] border border-yellow-200/25 bg-black/20 shadow-[0_0_90px_rgba(255,193,90,.28)] backdrop-blur-[2px]"
              animate={{
                opacity: [0.55, 0.9, 0.55],
                scale: [1, 1.025, 1],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -left-12 -top-10 text-5xl text-pink-200 drop-shadow-[0_0_24px_rgba(255,180,210,.8)]"
              animate={{
                rotate: [-8, 8, -8],
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ✺
            </motion.div>
            <motion.div
              className="absolute -bottom-12 -right-10 text-5xl text-yellow-100 drop-shadow-[0_0_24px_rgba(255,230,140,.8)]"
              animate={{
                rotate: [8, -8, 8],
                y: [0, 8, 0],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ✹
            </motion.div>
          <motion.h1
            animate={{
              textShadow: [
                "0 0 24px rgba(255,210,110,.55)",
                "0 0 48px rgba(255,118,160,.7)",
                "0 0 24px rgba(255,210,110,.55)",
              ],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative bg-gradient-to-r from-yellow-200 via-white to-pink-200 bg-clip-text text-6xl font-black leading-tight tracking-[0.08em] text-transparent md:text-8xl"
          >
            Happy Birthday Ambay
          </motion.h1>
          <motion.div
            className="relative mx-auto mt-5 h-px w-3/4 bg-gradient-to-r from-transparent via-yellow-200 to-transparent"
            animate={{
              opacity: [0.35, 1, 0.35],
              scaleX: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
