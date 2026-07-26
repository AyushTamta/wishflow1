"use client";

import Image from "next/image";
import { motion, MotionValue, useTransform } from "framer-motion";

interface ReelProps {
  side: "left" | "right";
  progress: MotionValue<number>;
}

const REEL_SIZE = 980;

// Smaller value = faster rotation
const PIXELS_PER_REVOLUTION = 620;

export default function Reel({
  side,
  progress,
}: ReelProps) {
  const rotate = useTransform(progress, (value) => {
    const rotation =
      Math.abs(value / PIXELS_PER_REVOLUTION) * 360;

    // Left reel clockwise
    // Right reel anti-clockwise
    return side === "left"
      ? -rotation
      : -rotation;
  });

  return (
    <motion.div
      style={{
        rotate,
        width: REEL_SIZE,
        height: REEL_SIZE,
        willChange: "transform",
      }}
      className="relative pointer-events-none select-none"
    >
      {/* Reel Image */}
      <Image
        src="/images/reel.png"
        alt="Film Reel"
        fill
        priority
        draggable={false}
        sizes="980px"
        className="object-contain"
      />
    </motion.div>
  );
}
