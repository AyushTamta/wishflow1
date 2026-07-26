"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card, Button, Eyebrow, Display, Body } from "@/components/ui";
import { Shimmer } from "@/components/effects";
import { fadeUp } from "@/lib/motion";

import TheatreCurtains from "@/components/theatre/TheatreCurtains";

interface InvitationCardProps {
  visible: boolean;
  onBegin: () => void;
}

export default function InvitationCard({
  visible,
  onBegin,
}: InvitationCardProps) {
      const [curtainsOpen, setCurtainsOpen] = useState(false);

  useEffect(() => {
    if (!visible) {
      setCurtainsOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurtainsOpen(true);
    }, 700);

    return () => clearTimeout(timer);
  }, [visible]);
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          className="absolute inset-0 z-30 flex items-center justify-center overflow-hidden px-4 py-5 sm:px-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* ========================= */}
          {/* Theatre Curtains */}
          {/* ========================= */}

          <TheatreCurtains open={curtainsOpen} />

          {/* ========================= */}
          {/* Spotlight */}
          {/* ========================= */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              h-[750px]
              w-[750px]
              -translate-x-1/2
              rounded-full
              bg-[radial-gradient(circle,rgba(255,223,160,0.22),transparent_70%)]
              blur-3xl
            "
          />

          {/* ========================= */}
          {/* Floating Golden Dust */}
          {/* ========================= */}

          {[...Array(20)].map((_, i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute h-1 w-1 rounded-full bg-[#E6C67A]"
              style={{
                left: `${5 + Math.random() * 90}%`,
                top: `${5 + Math.random() * 90}%`,
              }}
              animate={{
                y: [-18, 18, -18],
                opacity: [0.15, 0.9, 0.15],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* ========================= */}
          {/* Floating Card */}
          {/* ========================= */}

          {curtainsOpen && (
  <motion.div
    className="relative z-50"
    initial={{
      opacity: 0,
      y: 60,
      scale: 0.96,
    }}
    animate={{
      opacity: 1,
      y: [0, -10, 0],
      rotate: [0, -0.4, 0.4, 0],
      scale: 1,
    }}
    transition={{
      opacity: {
        duration: 0.8,
      },
      y: {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      },
      rotate: {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      },
      scale: {
        duration: 0.8,
      },
    }}
          >
            <Card
              interactive
              className="
                relative
                w-full
                max-w-2xl
                overflow-hidden
                w-[min(100%,42rem)]
                px-6
                py-8
                text-center
                backdrop-blur-xl
                sm:px-10
                sm:py-10
                md:px-14
                md:py-12
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
                  bg-[radial-gradient(circle_at_top,rgba(230,198,122,0.12),transparent_65%)]
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
                  h-40
                  w-80
                  -translate-x-1/2
                  rounded-full
                  bg-[#E6C67A]/15
                  blur-3xl
                "
              />

              {/* Content */}

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Eyebrow className="mb-4">
                    ✦ TONIGHT'S FEATURE ✦
                  </Eyebrow>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.35,
                    duration: 0.8,
                  }}
                >
                  <Display>Ammu_Batashaa</Display>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                >
                  <Body className="mt-5 text-base text-white/75 sm:mt-6 sm:text-lg">
                    Your seat is reserved.
                    <br />
                    Tonight, every memory returns to the big screen.
                  </Body>
                </motion.div>

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
                    },
                  }}
                  className="
                    mx-auto
                    my-6
                    h-px
                    w-40
                    origin-center
                    bg-gradient-to-r
                    from-transparent
                    via-[#E6C67A]
                    to-transparent
                  "
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="
                    mx-auto
                    max-w-lg
                    text-base
                    italic
                    leading-relaxed
                    text-white/80
                  "
                >
                  Every great story deserves
                  <br />
                  one more showing.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="mt-8 flex flex-col items-center gap-3 sm:mt-12 sm:gap-4"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                  >
                    <Button onClick={onBegin}>
                      🎬 Begin the Story
                    </Button>
                  </motion.div>

                  <motion.p
                    animate={{
                      opacity: [0.45, 0.8, 0.45],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                    className="text-[10px] uppercase tracking-[0.15em] text-white/40 sm:text-sm sm:tracking-widest"
                  >
                    Approx. Experience · 3–4 Minutes
                  </motion.p>
                </motion.div>
              </div>
            </Card>
          </motion.div>
)}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
