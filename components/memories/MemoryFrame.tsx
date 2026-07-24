"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MemoryFrameProps } from "@/types/memory";

export default function MemoryFrame({
  image,
  alt,
}: MemoryFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-black shadow-2xl"
    >
      {/* 16:9 Frame */}
      <div className="relative aspect-video">
        <Image
          src={image}
          alt={alt}
          fill
          priority
          className="object-cover"
        />

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent_55%,rgba(0,0,0,0.7)_100%)]" />

        {/* Projector glow */}
        <div className="pointer-events-none absolute inset-0 bg-yellow-100/5" />

        {/* Border */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
      </div>
    </motion.div>
  );
}