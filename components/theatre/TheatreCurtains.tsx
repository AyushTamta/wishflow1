"use client";

import { motion } from "framer-motion";

interface TheatreCurtainsProps {
  open: boolean;
}

export default function TheatreCurtains({
  open,
}: TheatreCurtainsProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
      <div className="absolute inset-x-0 top-0 z-30 h-24 bg-[linear-gradient(180deg,#130404_0%,#2a0505_42%,#070101_100%)] shadow-[0_18px_50px_rgba(0,0,0,.75)]" />
      <div className="absolute inset-x-0 top-20 z-30 h-3 bg-[linear-gradient(90deg,transparent,#c79b45_18%,#ffe0a0_50%,#c79b45_82%,transparent)] opacity-80" />

      {/* Left Curtain */}
      <motion.div
        initial={false}
        animate={{
          x: open ? "-108%" : "0%",
          rotateY: open ? -8 : 0,
        }}
        transition={{
          duration: 1.8,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="
          absolute
          left-0
          top-0
          h-full
          w-[54%]
          origin-left
          bg-[linear-gradient(90deg,#170202_0%,#470707_12%,#8d1111_27%,#4f0707_43%,#9e1515_58%,#5e0808_76%,#1f0303_100%)]
          shadow-[34px_0_90px_rgba(0,0,0,.72),inset_-28px_0_55px_rgba(0,0,0,.45)]
        "
      >
        <div
          className="
            absolute
            inset-0
            opacity-45
            bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.06)_0px,transparent_9px,rgba(0,0,0,.24)_22px,transparent_36px)]
          "
        />
        <div className="absolute inset-y-0 right-0 w-10 bg-[linear-gradient(90deg,transparent,rgba(0,0,0,.7))]" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.58))]" />
      </motion.div>

      {/* Right Curtain */}
      <motion.div
        initial={false}
        animate={{
          x: open ? "108%" : "0%",
          rotateY: open ? 8 : 0,
        }}
        transition={{
          duration: 1.8,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="
          absolute
          right-0
          top-0
          h-full
          w-[54%]
          origin-right
          bg-[linear-gradient(270deg,#170202_0%,#470707_12%,#8d1111_27%,#4f0707_43%,#9e1515_58%,#5e0808_76%,#1f0303_100%)]
          shadow-[-34px_0_90px_rgba(0,0,0,.72),inset_28px_0_55px_rgba(0,0,0,.45)]
        "
      >
        <div
          className="
            absolute
            inset-0
            opacity-45
            bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.06)_0px,transparent_9px,rgba(0,0,0,.24)_22px,transparent_36px)]
          "
        />
        <div className="absolute inset-y-0 left-0 w-10 bg-[linear-gradient(270deg,transparent,rgba(0,0,0,.7))]" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.58))]" />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-20 h-24 bg-[linear-gradient(0deg,rgba(0,0,0,.85),transparent)]" />
    </div>
  );
}
