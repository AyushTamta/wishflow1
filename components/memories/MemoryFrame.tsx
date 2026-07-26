"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";

import { MemoryFrameProps } from "@/types/memory";
import { cameraAnimations } from "@/lib/camera";
import LightLeak from "./LightLeak";

export default function MemoryFrame({
  image,
  alt,
}: MemoryFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);

  /**
   * Pick a deterministic camera animation
   * based on the image path.
   */
  const animation = useMemo(() => {
    let hash = 0;

    for (let i = 0; i < image.length; i++) {
      hash += image.charCodeAt(i);
    }

    return cameraAnimations[
      hash % cameraAnimations.length
    ];
  }, [image]);

  useLayoutEffect(() => {
    if (!imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        animation.from,
        {
          ...animation.to,
          repeat: -1,
          yoyo: true,
        }
      );

      gsap.fromTo(
        reflectionRef.current,
        {
          xPercent: -180,
          opacity: 0,
        },
        {
          xPercent: 180,
          opacity: 0.7,
          duration: 6,
          ease: "power1.inOut",
          repeat: -1,
          repeatDelay: 3,
        }
      );

      gsap.to(containerRef.current, {
        y: 4,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [animation]);

  return (
    <motion.div
      ref={containerRef}
      initial={{
        opacity: 0,
        scale: 0.97,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 1.03,
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="relative mx-auto w-full max-w-5xl"
    >
      {/* Background glow */}
      <div className="absolute -inset-8 rounded-[40px] bg-amber-300/10 blur-3xl" />

      {/* Soft shadow */}
      <div className="absolute inset-0 translate-y-6 rounded-[36px] bg-black/60 blur-3xl" />

      {/* Frame */}
      <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-neutral-950 shadow-[0_30px_90px_rgba(0,0,0,0.75)]">
        <div className="relative aspect-video overflow-hidden">
          {/* Animated Image */}
          <div
            ref={imageRef}
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src={image}
              alt={alt}
              fill
              priority
              draggable={false}
              sizes="(max-width:768px)100vw,1024px"
              className="select-none object-cover"
            />
          </div>

          {/* Light leak */}
          <LightLeak />

          {/* Glass reflection */}
          <div
            ref={reflectionRef}
            className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl"
          />

          {/* Warm projector tint */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-100/10 via-transparent to-orange-400/10" />

          {/* Film bloom */}
          <div className="pointer-events-none absolute inset-0 bg-white/5 mix-blend-soft-light" />

          {/* Cinematic vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent_42%,rgba(0,0,0,0.78)_100%)]" />

          {/* Inner shadow */}
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.45)]" />

          {/* Border highlight */}
          <div className="pointer-events-none absolute inset-0 rounded-[34px] ring-1 ring-white/10 ring-inset" />
        </div>
      </div>
    </motion.div>
  );
}
