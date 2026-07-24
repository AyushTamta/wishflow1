"use client";

import { motion } from "framer-motion";

export default function Curtains({
  open,
}: {
  open: boolean;
}) {
  return (
    <>
      {/* Left curtain */}
      <motion.div
        className="absolute left-0 top-0 z-30 h-full w-1/2"
        animate={{
          x: open ? "-100%" : "0%",
        }}
        transition={{
          duration: 1.6,
          ease: [0.77, 0, 0.175, 1],
        }}
        style={{
          background:
            "linear-gradient(90deg,#4b0000,#7b0000,#4b0000)",
          boxShadow: "inset -10px 0 40px rgba(0,0,0,.4)",
        }}
      />

      {/* Right curtain */}
      <motion.div
        className="absolute right-0 top-0 z-30 h-full w-1/2"
        animate={{
          x: open ? "100%" : "0%",
        }}
        transition={{
          duration: 1.6,
          ease: [0.77, 0, 0.175, 1],
        }}
        style={{
          background:
            "linear-gradient(-90deg,#4b0000,#7b0000,#4b0000)",
          boxShadow: "inset 10px 0 40px rgba(0,0,0,.4)",
        }}
      />
    </>
  );
}