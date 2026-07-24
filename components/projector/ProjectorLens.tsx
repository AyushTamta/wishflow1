"use client";

import { motion } from "framer-motion";

const spokes = [0, 60, 120, 180, 240, 300];

export default function ProjectorLens() {
  return (
    <motion.div
      initial={{
        x: -60,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      className="absolute left-12 top-1/2 -translate-y-1/2"
    >
      <div className="relative">

        {/* Rear Reel */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "linear",
          }}
          className="absolute -top-20 left-8 h-36 w-36 rounded-full border-[8px] border-zinc-600 bg-zinc-900"
        >
          <div className="absolute inset-4 rounded-full border border-zinc-700" />

          {spokes.map((angle) => (
            <div
              key={angle}
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              }}
              className="absolute left-1/2 top-1/2 h-[2px] w-14 origin-left bg-zinc-500"
            />
          ))}

          <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-300" />
        </motion.div>

        {/* Front Reel */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          }}
          className="absolute -bottom-20 left-8 h-36 w-36 rounded-full border-[8px] border-zinc-600 bg-zinc-900"
        >
          <div className="absolute inset-4 rounded-full border border-zinc-700" />

          {spokes.map((angle) => (
            <div
              key={angle}
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              }}
              className="absolute left-1/2 top-1/2 h-[2px] w-14 origin-left bg-zinc-500"
            />
          ))}

          <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-300" />
        </motion.div>

        {/* Main Body */}
        <div className="relative h-56 w-80 rounded-3xl border border-zinc-700 bg-gradient-to-b from-zinc-800 via-zinc-900 to-black shadow-[0_30px_80px_rgba(0,0,0,.6)]">

          {/* Top Panel */}
          <div className="absolute left-8 right-8 top-6 h-2 rounded-full bg-zinc-700" />

          {/* Control Knobs */}
          <div className="absolute bottom-8 left-8 flex gap-3">
            <div className="h-4 w-4 rounded-full bg-zinc-500" />
            <div className="h-4 w-4 rounded-full bg-zinc-500" />
            <div className="h-4 w-4 rounded-full bg-zinc-500" />
          </div>

          {/* Power LED */}
          <motion.div
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute bottom-8 right-8 h-3 w-3 rounded-full bg-green-400 shadow-lg shadow-green-400/50"
          />

          {/* Lens Housing */}
          <div className="absolute right-0 top-1/2 flex h-24 w-24 translate-x-10 -translate-y-1/2 items-center justify-center rounded-full border-4 border-zinc-700 bg-black">

            {/* Outer Glow */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute h-24 w-24 rounded-full bg-yellow-200/20 blur-xl"
            />

            {/* Lens */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(255,240,180,.3)",
                  "0 0 50px rgba(255,240,180,.9)",
                  "0 0 20px rgba(255,240,180,.3)",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
              className="relative flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100"
            >
              <div className="h-4 w-4 rounded-full bg-white" />
            </motion.div>
          </div>

          {/* Feet */}
          <div className="absolute -bottom-4 left-12 h-4 w-8 rounded bg-zinc-700" />
          <div className="absolute -bottom-4 right-12 h-4 w-8 rounded bg-zinc-700" />
        </div>
      </div>
    </motion.div>
  );
}