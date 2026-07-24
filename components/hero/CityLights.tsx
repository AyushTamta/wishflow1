"use client";

import { motion } from "framer-motion";

export default function CityLights() {
  return (
    <div className="absolute bottom-[37%] left-0 w-full h-28 overflow-hidden">
      {/* Buildings */}
      <div className="absolute bottom-0 flex w-full items-end justify-around">
        {Array.from({ length: 45 }).map((_, i) => {
          const height = 30 + Math.random() * 90;

          return (
            <div
              key={i}
              style={{
                height,
                width: 20 + Math.random() * 18,
              }}
              className="bg-black"
            />
          );
        })}
      </div>

      {/* Queen's Necklace */}
      {Array.from({ length: 160 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[4px] w-[4px] rounded-full bg-yellow-200"
          style={{
            left: `${(i / 160) * 100}%`,
            bottom: `${10 + Math.sin(i / 14) * 14}px`,
          }}
          animate={{
            opacity: [0.3, 1, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 2 + Math.random() * 4,
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );
}