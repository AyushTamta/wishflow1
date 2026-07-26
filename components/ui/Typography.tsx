import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        "text-[10px] uppercase tracking-[0.28em] text-[#E6C67A] sm:text-xs sm:tracking-[0.5em]",
        className
      )}
    >
      {children}
    </p>
  );
}

export function Display({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "font-serif text-[clamp(2.25rem,11vw,4.5rem)] tracking-[0.07em] text-white sm:tracking-[0.15em]",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function Body({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        "text-lg leading-relaxed text-white/75",
        className
      )}
    >
      {children}
    </p>
  );
}
