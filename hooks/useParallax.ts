"use client";

import { useEffect } from "react";
import { useMotionValue } from "framer-motion";

export default function useParallax(strength = 20) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * strength;
      const ny = (e.clientY / window.innerHeight - 0.5) * strength;

      x.set(nx);
      y.set(ny);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, [strength, x, y]);

  return { x, y };
}