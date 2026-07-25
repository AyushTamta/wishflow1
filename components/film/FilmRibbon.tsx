"use client";

import { ReactNode } from "react";

interface FilmRibbonProps {
  children: ReactNode;
}

export default function FilmRibbon({
  children,
}: FilmRibbonProps) {
  return (
    <div className="relative">

      {/* Metallic Top Edge */}
      <div
        className="absolute inset-x-0 top-0 z-40 h-[4px]"
        style={{
          background:
            "linear-gradient(180deg,#ffffff,#d6d6d6,#767676,#1b1b1b)",
          boxShadow:
            "0 1px 2px rgba(255,255,255,.25)",
        }}
      />

      {/* Metallic Bottom Edge */}
      <div
        className="absolute inset-x-0 bottom-0 z-40 h-[4px]"
        style={{
          background:
            "linear-gradient(180deg,#111,#444,#a9a9a9,#ececec)",
          boxShadow:
            "0 -1px 2px rgba(0,0,0,.45)",
        }}
      />

      <div
        className="relative h-[450px] overflow-hidden rounded-[4px]"
        style={{
          background: `
            linear-gradient(
              180deg,
              #453a2d 0%,
              #2b241d 10%,
              #141313 50%,
              #2b241d 90%,
              #453a2d 100%
            )
          `,
          borderTop: "1px solid rgba(255,255,255,.12)",
          borderBottom: "1px solid rgba(0,0,0,.82)",
          boxShadow: `
            inset 0 3px 5px rgba(255,255,255,.08),
            inset 0 -10px 18px rgba(0,0,0,.72),
            0 25px 70px rgba(0,0,0,.55)
          `,
        }}
      >

        {/* Kodak warm glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,226,165,.05), transparent 72%)",
          }}
        />

        {/* Metallic sweep */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 18%, rgba(255,255,255,.07) 48%, transparent 76%)",
          }}
        />

        {/* Fine film grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,.08) 1px, transparent 0)",
            backgroundSize: "9px 9px",
          }}
        />

        {/* Top shadow */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-14"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,.45), transparent)",
          }}
        />

        {/* Bottom shadow */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-14"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,.52), transparent)",
          }}
        />

        {/* Soft centre glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,.03), transparent 70%)",
          }}
        />

        {children}

      </div>
    </div>
  );
}