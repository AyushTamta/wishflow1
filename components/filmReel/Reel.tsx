"use client";

import Image from "next/image";
import { motion, MotionValue, useTransform } from "framer-motion";

interface ReelProps {
  side: "left" | "right";
  progress: MotionValue<number>;
}

const REEL_SIZE = 1130;

// Smaller value = faster rotation
const PIXELS_PER_REVOLUTION = 420;

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
      }}
      className="relative pointer-events-none select-none"
    >
      {/* Warm cinematic glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,215,140,.14) 0%, transparent 72%)",
          filter: "blur(60px)",
        }}
      />

      {/* Reel Image */}
      <Image
        src="/images/reel.png"
        alt="Film Reel"
        fill
        priority
        draggable={false}
        className="object-contain"
      />

      {/* Metallic highlight */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,.18), transparent 30%, transparent 70%, rgba(255,255,255,.05))",
          mixBlendMode: "screen",
        }}
      />
    </motion.div>
  );
}