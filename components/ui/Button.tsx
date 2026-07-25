"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: Variant;
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{
        scale: disabled ? 1 : 1.03,
        y: disabled ? 0 : -2,
      }}
      whileTap={{
        scale: disabled ? 1 : 0.97,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 24,
      }}
      disabled={disabled || loading}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4",
        "transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-[#E6C67A]/50",
        disabled && "cursor-not-allowed opacity-60",

        variant === "primary" &&
          "border border-[#E6C67A]/30 bg-white/5 text-[#E6C67A] backdrop-blur-xl hover:border-[#E6C67A]/60 hover:bg-white/10",

        variant === "ghost" &&
          "text-white/80 hover:text-white",

        className
      )}
      {...props}
    >
      {/* Background Glow */}
      <span
        className="
          absolute inset-0
          opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
          bg-gradient-to-r
          from-transparent
          via-[#E6C67A]/10
          to-transparent
        "
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-3 font-medium tracking-wide">
        {loading ? "Loading..." : children}

        {!loading && (
          <motion.span
            animate={{
              x: [0, 4, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: "easeInOut",
            }}
          >
            →
          </motion.span>
        )}
      </span>
    </motion.button>
  );
}