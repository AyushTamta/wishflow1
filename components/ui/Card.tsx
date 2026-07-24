"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  shimmer?: boolean;
  spotlight?: boolean;
}

export default function Card({
  children,
  className,
  interactive = false,
  shimmer = false,
  spotlight = false,
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        interactive
          ? {
              y: -6,
              scale: 1.015,
            }
          : undefined
      }
      className={cn(
        "relative overflow-hidden rounded-[32px]",
        "border border-white/10",
        "bg-white/[0.05]",
        "backdrop-blur-2xl",
        "shadow-[0_20px_80px_rgba(0,0,0,.35)]",
        "transition-all duration-500",
        className
      )}
    >
      {/* Spotlight */}
      {spotlight && (
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-40
          "
        >
          <div
            className="
              animate-spotlight
              absolute
              -left-1/2
              top-0
              h-full
              w-1/2
              bg-gradient-to-r
              from-transparent
              via-white/10
              to-transparent
              blur-3xl
            "
          />
        </div>
      )}

      {/* Gold Shimmer */}
      {shimmer && (
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            overflow-hidden
          "
        >
          <div
            className="
              animate-shimmer
              absolute
              -left-full
              top-0
              h-full
              w-1/3
              rotate-12
              bg-gradient-to-r
              from-transparent
              via-[#E6C67A]/25
              to-transparent
            "
          />
        </div>
      )}

      {/* Inner Glow */}
      <div
        className="
          absolute
          inset-0
          rounded-[32px]
          ring-1
          ring-white/5
          pointer-events-none
        "
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}