"use client";

import { AnimatePresence, motion } from "framer-motion";

import { Card, Button, Eyebrow, Display, Body } from "@/components/ui";
import { Shimmer } from "@/components/effects";
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
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          className="absolute inset-0 z-30 flex items-center justify-center px-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Card
              interactive
              className="
                relative
                w-full
                max-w-2xl
                overflow-hidden
                px-10
                py-12
                text-center
                md:px-16
                md:py-16
              "
            >
              {/* Shimmer */}
              <Shimmer />

              {/* Ambient Background */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-[radial-gradient(circle_at_top,rgba(230,198,122,0.10),transparent_65%)]
                "
              />

              {/* Decorative Border */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-3
                  rounded-[inherit]
                  border
                  border-white/10
                "
              />

              {/* Bottom Glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-0
                  left-1/2
                  h-36
                  w-72
                  -translate-x-1/2
                  rounded-full
                  bg-[#E6C67A]/10
                  blur-3xl
                "
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Eyebrow className="mb-4">
                    ✦ TONIGHT'S FEATURE ✦
                  </Eyebrow>
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.35,
                    duration: 0.8,
                  }}
                >
                  <Display>WISHFLOW</Display>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                >
                  <Body className="mt-6 text-white/70">
                    A cinematic journey crafted exclusively for you.
                  </Body>
                </motion.div>

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: 1,
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    scaleX: {
                      delay: 0.8,
                      duration: 0.8,
                    },
                    opacity: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="
                    mx-auto
                    my-10
                    h-px
                    w-40
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
                  not simply remembered.
                </motion.p>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="mt-14 flex flex-col items-center gap-4"
                >
                  <Button onClick={onBegin}>
                    Begin the Story
                  </Button>

                  <motion.p
                    animate={{
                      opacity: [0.45, 0.8, 0.45],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                    className="text-sm tracking-widest uppercase text-white/40"
                  >
                    Approx. Experience · 3–4 Minutes
                  </motion.p>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}