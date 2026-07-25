"use client";

import Image from "next/image";

import type { FilmFrameProps } from "./types";

export default function FilmFrame({
  src,
  index,
  active,
}: FilmFrameProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_18px_40px_rgba(0,0,0,.45)] transition-transform duration-500 ${
        active ? "scale-100" : "scale-95 opacity-80"
      }`}
      aria-label={`Film frame ${index + 1}`}
    >
      <Image
        src={src}
        alt={`Memory frame ${index + 1}`}
        width={190}
        height={300}
        className="h-full w-full object-cover"
        sizes="190px"
        priority={index < 2}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,.16),transparent_36%,rgba(0,0,0,.28)_100%)]" />
    </div>
  );
}
