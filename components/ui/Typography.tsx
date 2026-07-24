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
        "text-xs uppercase tracking-[0.5em] text-[#E6C67A]",
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
        "font-serif text-5xl tracking-[0.15em] text-white md:text-7xl",
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