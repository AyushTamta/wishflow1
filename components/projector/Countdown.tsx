"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const numbers = ["3", "2", "1"];

export default function Countdown() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((v) => v + 1);
    }, 900);

    return () => clearInterval(interval);
  }, []);

  if (index >= numbers.length) return null;

  return (
    <motion.div
      key={numbers[index]}
      initial={{
        scale: 0.5,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="
        absolute
        inset-0
        flex
        items-center
        justify-center
        text-[10rem]
        font-black
        text-white
      "
    >
      {numbers[index]}
    </motion.div>
  );
}