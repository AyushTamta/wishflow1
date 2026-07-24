"use client";

import { motion } from "framer-motion";

export default function ProjectorBeam() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2,
      }}
      className="
        absolute
        left-32
        top-1/2
        h-[420px]
        w-[900px]
        -translate-y-1/2

        bg-gradient-to-r

        from-yellow-100/30

        via-yellow-100/8

        to-transparent

        [clip-path:polygon(0_48%,100%_0,100%_100%,0_52%)]

        blur-2xl
      "
    />
  );
}