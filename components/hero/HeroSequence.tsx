"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const ROCKETS = [
  { left: "12%", endX: 50, endY: -390, color: "#ffd166", delay: 0 },
  { left: "32%", endX: -35, endY: -470, color: "#ff6b9a", delay: 0.55 },
  { left: "52%", endX: 20, endY: -430, color: "#8ec5ff", delay: 1.05 },
  { left: "72%", endX: -55, endY: -455, color: "#a6ffcb", delay: 1.5 },
  { left: "88%", endX: -70, endY: -370, color: "#fff1a8", delay: 2.05 },
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
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,rgba(255,184,80,.16),transparent)]" />

      {ROCKETS.map((rocket, rocketIndex) => (
        <motion.div
          key={rocket.left}
          className="absolute bottom-[-40px] h-3 w-3 rounded-full"
          style={{
            left: rocket.left,
            background: rocket.color,
            boxShadow: `0 0 24px ${rocket.color}`,
          }}
          animate={{
            x: [0, rocket.endX, rocket.endX],
            y: [0, rocket.endY, rocket.endY],
            opacity: [0, 1, 0],
            scale: [0.7, 1, 0.2],
          }}
          transition={{
            duration: 2.8,
            delay: rocket.delay,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: "easeOut",
          }}
        >
          <motion.span
            className="absolute left-1/2 top-3 h-36 w-px -translate-x-1/2 rounded-full"
            style={{
              background: `linear-gradient(180deg, ${rocket.color}, transparent)`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scaleY: [0.2, 1, 0.4],
            }}
            transition={{
              duration: 2.8,
              delay: rocket.delay,
              repeat: Infinity,
              repeatDelay: 1.2,
            }}
          />

          <span className="absolute left-1/2 top-1/2">
          {Array.from({ length: 22 }).map((_, index) => (
            <motion.span
              key={index}
              className="absolute h-1.5 w-16 origin-left rounded-full"
              style={{
                background: `linear-gradient(90deg, ${rocket.color}, transparent)`,
                rotate: `${index * (360 / 22)}deg`,
              }}
              animate={{
                scaleX: [0, 0, 1.15, 0],
                opacity: [0, 0, 1, 0],
              }}
              transition={{
                duration: 2.8,
                delay: rocket.delay + 0.9 + rocketIndex * 0.03,
                repeat: Infinity,
                repeatDelay: 1.2,
                ease: "easeOut",
              }}
            />
          ))}
          </span>
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
              className="absolute -inset-x-14 -inset-y-10 rounded-[44px] border border-yellow-200/30 bg-[linear-gradient(135deg,rgba(30,12,12,.55),rgba(255,210,120,.12),rgba(20,10,18,.55))] shadow-[0_0_110px_rgba(255,193,90,.34)] backdrop-blur-[3px]"
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
          <motion.p
            className="relative mb-4 text-xs uppercase tracking-[0.55em] text-yellow-100/80"
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
            }}
          >
            A little film under the fireworks
          </motion.p>
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
