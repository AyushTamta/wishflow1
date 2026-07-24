"use client";

import { motion, AnimatePresence } from "framer-motion";

import Card from "@/components/ui/Card";
import { fadeUp } from "@/lib/motion";

interface InvitationCardProps {
  visible: boolean;
  onBegin: () => void;
}

export default function InvitationCard({
  visible,
  onBegin,
}: InvitationCardProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute inset-0 z-30 flex items-center justify-center px-6"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeUp}
        >
          <Card
            interactive
            className="
              w-full
              max-w-2xl
              px-10
              py-12
              md:px-16
              md:py-16
              text-center
            "
          >
            {/* Header */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="
                mb-4
                text-xs
                uppercase
                tracking-[0.5em]
                text-[#E6C67A]
              "
            >
              ✦ Tonight's Feature ✦
            </motion.p>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="
                text-5xl
                font-serif
                tracking-[0.15em]
                text-white
                md:text-7xl
              "
            >
              WISHFLOW
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="
                mt-6
                text-lg
                text-white/70
              "
            >
              A story made only for you.
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="
                mx-auto
                my-10
                h-px
                w-32
                origin-center
                bg-gradient-to-r
                from-transparent
                via-[#E6C67A]
                to-transparent
              "
            />

            {/* Quote */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="
                mx-auto
                max-w-lg
                text-lg
                italic
                leading-relaxed
                text-white/80
              "
            >
              Some memories deserve to be experienced...
              <br />
              not just remembered.
            </motion.p>

            {/* CTA */}
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                duration: 0.2,
              }}
              onClick={onBegin}
              className="
                group
                mt-14
                inline-flex
                items-center
                gap-3
                text-lg
                font-medium
                text-[#E6C67A]
                transition-colors
                hover:text-white
              "
            >
              Begin the Story

              <motion.span
                className="inline-block"
                animate={{
                  x: [0, 6, 0],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                }}
              >
                →
              </motion.span>
            </motion.button>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}