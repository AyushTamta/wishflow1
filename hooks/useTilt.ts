"use client";

import { useCallback, useRef, useState } from "react";

export function useTilt(maxRotation = 10) {
  const ref = useRef<HTMLDivElement>(null);

  const [transform, setTransform] = useState(
    "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY =
        ((x - rect.width / 2) / rect.width) * maxRotation;

      const rotateX =
        -((y - rect.height / 2) / rect.height) * maxRotation;

      setTransform(
        `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.015,1.015,1.015)
      `
      );
    },
    [maxRotation]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform(
      "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
    );
  }, []);

  return {
    ref,
    transform,
    handleMouseMove,
    handleMouseLeave,
  };
}