"use client";

import { useEffect, useState } from "react";

type Star = {
  width: number;
  height: number;
  left: number;
  top: number;
  opacity: number;
  delay: number;
};

export default function Stars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 140 }, () => ({
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 55,
      opacity: Math.random(),
      delay: Math.random() * 4,
    }));

    setStars(generated);
  }, []);

  return (
    <>
      {stars.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            width: `${star.width}px`,
            height: `${star.height}px`,
            left: `${star.left}%`,
            top: `${star.top}%`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </>
  );
}