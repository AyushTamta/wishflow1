"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  image: string;
  title: string;
  date: string;
  caption: string;
};

export default function MemoryCard({
  image,
  title,
  date,
  caption,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -12,
        rotate: -2,
        scale: 1.02,
      }}
      transition={{ duration: 0.3 }}
      className="relative w-[340px] flex-shrink-0"
    >
      {/* Film Frame */}
      <div className="rounded-2xl border border-white/10 bg-zinc-900 p-3 shadow-2xl">
        <Image
          src={image}
          alt={title}
          width={600}
          height={800}
          className="h-[430px] w-full rounded-xl object-cover"
        />

        <div className="mt-5">
          <p className="text-sm text-yellow-300">{date}</p>

          <h3 className="mt-1 text-2xl font-bold">
            {title}
          </h3>

          <p className="mt-3 text-white/70">
            {caption}
          </p>
        </div>
      </div>
    </motion.div>
  );
}