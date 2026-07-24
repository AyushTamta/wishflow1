"use client";

import { motion } from "framer-motion";
import { MemoryCaptionProps } from "@/types/memory";

export default function MemoryCaption({
  caption,
  location,
  date,
}: MemoryCaptionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-8 text-center"
    >
      <p className="text-xl font-light tracking-wide text-white md:text-2xl">
        {caption}
      </p>

      {(location || date) && (
        <div className="mt-3 flex items-center justify-center gap-3 text-sm text-white/60">
          {location && <span>{location}</span>}
          {location && date && <span>•</span>}
          {date && <span>{date}</span>}
        </div>
      )}
    </motion.div>
  );
}