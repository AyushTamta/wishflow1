"use client";

import { AnimatePresence, motion } from "framer-motion";

interface Props {
  show: boolean;
}

export default function LensFlash({ show }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[9999] bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.85, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      )}
    </AnimatePresence>
  );
}
