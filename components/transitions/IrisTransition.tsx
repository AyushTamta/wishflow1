"use client";

import { AnimatePresence, motion } from "framer-motion";

interface Props {
  show: boolean;
}

export default function IrisTransition({ show }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[9999] bg-black"
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      )}
    </AnimatePresence>
  );
}
