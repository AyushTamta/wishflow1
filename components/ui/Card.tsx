"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useTilt } from "@/hooks/useTilt";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children?: ReactNode;
  interactive?: boolean;
}

export default function Card({
  interactive = false,
  className,
  children,
  ...props
}: CardProps) {
  const tilt = useTilt(10);

  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={interactive ? tilt.handleMouseMove : undefined}
      onMouseLeave={interactive ? tilt.handleMouseLeave : undefined}
      animate={{
        transform: interactive ? tilt.transform : undefined,
      }}
      transition={{
        type: "spring",
        stiffness: 160,
        damping: 18,
      }}
      className={cn(
        "relative rounded-[32px]",

        "border border-white/10",

        "bg-white/[0.05]",

        "backdrop-blur-3xl",

        "shadow-[0_20px_80px_rgba(0,0,0,0.45)]",

        className
      )}
      {...props}
    >
      {/* Glass Reflection */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[inherit]
          bg-gradient-to-br
          from-white/10
          via-transparent
          to-transparent
        "
      />

      {children}
    </motion.div>
  );
}