"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface FilmWindowProps {
  image: string;
  index: number;
}

export default function FilmWindow({
  image,
  index,
}: FilmWindowProps) {
  return (
    <motion.div
      className="relative h-[580px] w-[430px] flex-shrink-0"
      whileHover={{
        scale: 1.12,
        y: -18,
        zIndex: 80,
      }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 18,
      }}
    >
      {/* Film Frame */}
      <div
        className="absolute inset-0 rounded-[2px]"
        style={{
          background:
            "linear-gradient(180deg,#1b1a18,#0d0d0d 18%,#080808 50%,#0d0d0d 82%,#1b1a18)",
          border: "1px solid #332d25",
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,.05),
            inset 0 -2px 4px rgba(0,0,0,.75)
          `,
        }}
      />

      {/* Top metal edge */}
      <div className="absolute left-0 right-0 top-0 h-[1px] bg-white/10" />

      {/* Bottom metal edge */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/70" />

      {/* Picture Gate */}
      <div className="absolute bottom-7 left-5 right-5 top-7 overflow-hidden rounded-[1px] bg-black">

        {/* Image */}
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: .45 }}
        >
          <Image
            src={image}
            alt={`Memory ${index + 1}`}
            fill
            sizes="430px"
            className="object-cover"
          />
        </motion.div>

        {/* Film colour tint */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,185,120,.08), transparent 40%, rgba(80,120,255,.05))",
          }}
        />

        {/* Soft bloom */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 45%, rgba(255,255,255,.04) 70%, rgba(0,0,0,.18) 100%)",
          }}
        />

        {/* Reflection sweep */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ x: "-130%" }}
          whileHover={{ x: "130%" }}
          transition={{
            duration: .85,
          }}
          style={{
            background:
              "linear-gradient(105deg, transparent 25%, rgba(255,255,255,.16) 50%, transparent 75%)",
          }}
        />

        {/* Fine grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,.5) .6px, transparent 0)",
            backgroundSize: "6px 6px",
          }}
        />

        {/* Vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle, transparent 58%, rgba(0,0,0,.18) 82%, rgba(0,0,0,.45) 100%)",
          }}
        />

        {/* Film gate shadow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow: "inset 0 0 10px rgba(0,0,0,.55)",
          }}
        />
      </div>

      {/* Frame Number */}
      <div
        className="absolute bottom-[8px] right-[10px]"
        style={{
          fontSize: 9,
          fontFamily: "ui-monospace, monospace",
          letterSpacing: ".28em",
          color: "#847967",
          textShadow:
            "0 1px 0 rgba(255,255,255,.04),0 -1px 0 rgba(0,0,0,.65)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
    </motion.div>
  );
}
