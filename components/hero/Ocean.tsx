"use client";

import { motion } from "framer-motion";

export default function Ocean() {
  return (
    <motion.div
      className="absolute bottom-0 h-[40%] w-full"
      animate={{
        backgroundPositionX: ["0px", "600px"],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        background: `
          linear-gradient(
            to bottom,
            rgba(15,40,70,.2),
            #04111d
          )
        `,
      }}
    />
  );
}