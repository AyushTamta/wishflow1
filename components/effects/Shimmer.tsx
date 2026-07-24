"use client";

import { motion } from "framer-motion";

interface ShimmerProps {
  delay?: number;
}

export default function Shimmer({
  delay = 2,
}: ShimmerProps) {
  return (
    <motion.div
      initial={{ x: "-120%" }}
      animate={{ x: "220%" }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 6,
        ease: "easeInOut",
      }}
      className="
        pointer-events-none
        absolute
        inset-y-0
        w-32
        -skew-x-12
        bg-gradient-to-r
        from-transparent
        via-white/20
        to-transparent
        blur-md
      "
    />
  );
}