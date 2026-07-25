"use client";

import { motion } from "framer-motion";

export default function Projector() {
  return (
    <div className="pointer-events-none absolute left-[-170px] top-1/2 z-10 -translate-y-1/2 select-none">

      {/* Main Beam */}
      <motion.div
        animate={{
          opacity: [0.18, 0.34, 0.18],
          scaleY: [1, 1.02, 1],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
        }}
        className="absolute left-[345px] top-[118px] h-[320px] w-[1150px]"
        style={{
          clipPath: "polygon(0 50%,100% 0,100% 100%)",
          background:
            "linear-gradient(90deg, rgba(255,248,220,.42), rgba(255,240,180,.12), transparent)",
          filter: "blur(24px)",
        }}
      />

      {/* Hot Beam Core */}
      <motion.div
        animate={{
          opacity: [0.15, 0.28, 0.15],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
        }}
        className="absolute left-[350px] top-[165px] h-[120px] w-[950px]"
        style={{
          clipPath: "polygon(0 50%,100% 0,100% 100%)",
          background:
            "linear-gradient(90deg, rgba(255,255,240,.45), transparent)",
          filter: "blur(14px)",
        }}
      />

      {/* Body */}
      <div className="relative h-[270px] w-[360px] rounded-[30px] border border-neutral-700 bg-gradient-to-br from-neutral-700 via-neutral-900 to-black shadow-[0_40px_90px_rgba(0,0,0,.7)] overflow-hidden">

        {/* Metal highlight */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,.08), transparent 25%)",
          }}
        />

        {/* Cooling vents */}
        <div className="absolute left-14 top-12 space-y-[7px]">
          {Array.from({ length: 11 }).map((_, i) => (
            <div
              key={i}
              className="h-[2px] w-40 rounded-full bg-neutral-700"
            />
          ))}
        </div>

        {/* Control panel */}
        <div className="absolute left-14 bottom-10 flex items-center gap-5">
          <motion.div
            animate={{
              opacity: [0.35, 1, 0.35],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,.9)]"
          />

          <div className="h-4 w-4 rounded-full border border-neutral-500 bg-neutral-700" />
          <div className="h-4 w-4 rounded-full border border-neutral-500 bg-neutral-700" />
        </div>

        {/* Lens Housing */}
        <div className="absolute right-[-34px] top-[92px] flex h-[86px] w-[86px] items-center justify-center rounded-full border-[6px] border-neutral-600 bg-gradient-to-br from-neutral-700 to-neutral-900 shadow-[0_10px_35px_rgba(0,0,0,.6)]">

          <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full border-4 border-neutral-500 bg-black">

            <motion.div
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="h-8 w-8 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, #fffdf4 0%, #ffe8a3 55%, #f7c84b 100%)",
                boxShadow:
                  "0 0 40px rgba(255,235,170,.95)",
              }}
            />

          </div>

        </div>

        {/* Feet */}
        <div className="absolute bottom-[-8px] left-10 h-4 w-10 rounded-full bg-neutral-900" />
        <div className="absolute bottom-[-8px] right-10 h-4 w-10 rounded-full bg-neutral-900" />
      </div>
    </div>
  );
}