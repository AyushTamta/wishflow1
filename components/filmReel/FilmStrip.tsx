"use client";

import {
  animate,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import FilmRibbon from "../film/FilmRibbon";
import FilmHoleRow from "../film/FilmHoleRow";
import FilmWindow from "../film/FilmWindow";
import FilmEdgeText from "../film/FilmEdgeText";

import Projector from "./Projector";
import Reel from "./Reel";

interface FilmStripProps {
  photos: string[];
  onComplete?: () => void;
}

const FRAME_WIDTH = 360;
const FRAME_HEIGHT = 500;
const GAP = 8;

const COPIES = 11;

const DEFAULT_SPEED = 3;

export default function FilmStrip({
  photos,
}: FilmStripProps) {

  const containerRef =
    useRef<HTMLDivElement>(null);

  const autoScroll =
    useRef(true);

  const [speed, setSpeed] =
    useState(DEFAULT_SPEED);

  const loopPhotos = useMemo(
    () =>
      Array.from(
        {
          length: COPIES,
        },
        () => photos
      ).flat(),
    [photos]
  );

  const SINGLE_LOOP =
    photos.length *
    (FRAME_WIDTH + GAP);

  const LOOP_WIDTH =
    loopPhotos.length *
    (FRAME_WIDTH + GAP);

  const x =
    useMotionValue(
      -SINGLE_LOOP
    );

  const springX =
    useSpring(x, {
      stiffness: 120,
      damping: 22,
      mass: 0.9,
    });

      useEffect(() => {

    return springX.on(
      "change",
      (value) => {

        if (
          value <=
          -SINGLE_LOOP *
            (COPIES - 1)
        ) {

          x.set(
            value +
              SINGLE_LOOP
          );

        }

        if (
          value >
          -SINGLE_LOOP
        ) {

          x.set(
            value -
              SINGLE_LOOP
          );

        }

      }
    );

  }, [
    springX,
    x,
    SINGLE_LOOP,
  ]);

  useEffect(() => {

    const node =
      containerRef.current;

    if (!node)
      return;

    const wheel = (
      e: WheelEvent
    ) => {

      e.preventDefault();

      x.set(
        x.get()
          - e.deltaY
          - e.deltaX
      );

    };

    node.addEventListener(
      "wheel",
      wheel,
      {
        passive: false,
      }
    );

    return () =>

      node.removeEventListener(
        "wheel",
        wheel
      );

  }, [x]);

  useEffect(() => {

    let frame = 0;

    const animateStrip =
      () => {

        if (
          autoScroll.current
        ) {

          x.set(
            x.get() -
              speed * 4
          );

        }

        frame =
          requestAnimationFrame(
            animateStrip
          );

      };

    animateStrip();

    return () =>
      cancelAnimationFrame(
        frame
      );

  }, [
    speed,
    x,
  ]);

    return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#050505]"
    >

      {/* Projector */}
      <Projector />

      {/* Left Reel */}
      <div
        className="pointer-events-none absolute top-1/2 z-50 -translate-y-1/2"
        style={{
          left: -500,
        }}
      >
        <Reel
          side="left"
          progress={springX}
        />
      </div>

      {/* Right Reel */}
      <div
        className="pointer-events-none absolute top-1/2 z-50 -translate-y-1/2"
        style={{
          right: -500,
        }}
      >
        <Reel
          side="right"
          progress={springX}
        />
      </div>

      {/* Side Fade */}
      <div className="pointer-events-none absolute inset-0 z-40">

        <div
          className="absolute left-0 top-1/2 h-[560px] w-[300px] -translate-y-1/2"
          style={{
            background:
              "linear-gradient(to right,#050505 68%,transparent)",
          }}
        />

        <div
          className="absolute right-0 top-1/2 h-[560px] w-[300px] -translate-y-1/2"
          style={{
            background:
              "linear-gradient(to left,#050505 68%,transparent)",
          }}
        />

      </div>

      {/* Film Strip */}
      <motion.div
        drag="x"
        dragElastic={0.04}
        dragMomentum
        className="absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2"
        style={{
          x: springX,
          filter:
            "drop-shadow(0 25px 45px rgba(0,0,0,.65))",
        }}
        whileDrag={{
          cursor: "grabbing",
          scale: 1.01,
        }}
        onDragStart={() => {
          autoScroll.current = false;
        }}
        onDragEnd={(_, info) => {

          autoScroll.current = true;

          animate(
            x,
            x.get() +
              info.velocity.x * 1.2,
            {
              type: "inertia",
              velocity: info.velocity.x,
              power: 1,
              bounceStiffness: 0,
              bounceDamping: 0,
            }
          );

        }}
      >

                <div
          style={{
            width: LOOP_WIDTH,
            overflow: "visible",
            maskImage:
              "linear-gradient(to right, transparent 0px, black 180px, black calc(100% - 180px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0px, black 180px, black calc(100% - 180px), transparent 100%)",
          }}
        >

          <FilmRibbon>

            {/* Top Edge */}

            <div className="pt-3">

              <FilmEdgeText
                width={SINGLE_LOOP}
              />

              <FilmHoleRow
                count={1200}
              />

            </div>

            {/* Frames */}

            <div
              className="flex items-center"
              style={{
                gap: GAP,
                paddingLeft: 18,
                paddingRight: 18,
                minHeight: FRAME_HEIGHT,
              }}
            >


                            {loopPhotos.map(
                (photo, index) => (

                  <div
                    key={`${photo}-${index}`}
                    className="relative flex-shrink-0"
                    style={{
                      width: FRAME_WIDTH,
                      height: FRAME_HEIGHT,
                    }}
                  >

                    {/* Soft glow behind frame */}

                    <div
                      className="absolute inset-0 rounded-xl blur-2xl"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(255,210,120,.18) 0%, transparent 72%)",
                        transform: "scale(1.08)",
                      }}
                    />

                    {/* Actual Film Window */}

                    <FilmWindow
                      image={photo}
                      index={index}
                    />

                  </div>

                )
              )}


                          </div>

            {/* Bottom Perforations */}

            <div className="pb-3">

              <FilmHoleRow
                count={1200}
              />

            </div>

          </FilmRibbon>

        </div>

      </motion.div>

            {/* Speed Controller */}

      <div
        className="
          absolute
          left-1/2
          bottom-12
          z-[120]
          -translate-x-1/2
          rounded-2xl
          border
          border-white/10
          bg-black/75
          px-6
          py-4
          backdrop-blur-xl
          shadow-[0_20px_60px_rgba(0,0,0,.45)]
        "
      >

        <div
          className="
            mb-3
            text-center
            text-[10px]
            uppercase
            tracking-[0.45em]
            text-neutral-300
          "
        >
          Reel Speed
        </div>

        <div className="flex items-center gap-4">

          <span className="text-xs text-neutral-500">
            Slow
          </span>

          <input
            type="range"
            min={0}
            max={10}
            step={0.25}
            value={speed}
            onChange={(e) =>
              setSpeed(
                Number(e.target.value)
              )
            }
            className="
              w-72
              cursor-pointer
              accent-yellow-400
            "
          />

          <span className="text-xs text-neutral-500">
            Fast
          </span>

        </div>

      </div>


            {/* Cinematic Overlay */}

      <div className="pointer-events-none absolute inset-0 z-[90]">

        {/* Vignette */}

        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse at center,
                transparent 45%,
                rgba(0,0,0,.12) 68%,
                rgba(0,0,0,.45) 100%
              )
            `,
          }}
        />

        {/* Projector Light */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[700px]
            w-[1200px]
            -translate-x-1/2
            -translate-y-1/2
            blur-3xl
          "
          style={{
            background:
              "radial-gradient(circle, rgba(255,230,170,.08) 0%, rgba(255,215,120,.03) 40%, transparent 75%)",
          }}
        />

        {/* Film Grain */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            mix-blend-overlay
          "
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, white 0.8px, transparent 1px),
              radial-gradient(circle at 80% 70%, white 0.8px, transparent 1px),
              radial-gradient(circle at 50% 50%, white 0.8px, transparent 1px)
            `,
            backgroundSize: "18px 18px",
          }}
        />

      </div>

            {/* Auto-scroll pause on hover */}

      <div
        className="absolute inset-0 z-[80]"
        onMouseEnter={() => {
          autoScroll.current = false;
        }}
        onMouseLeave={() => {
          autoScroll.current = true;
        }}
      />

      {/* Ambient Glow */}

      <div className="pointer-events-none absolute inset-0 z-[70] overflow-hidden">

        <div
          className="absolute left-1/2 top-1/2 h-[900px] w-[1600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,185,80,.07) 0%, rgba(255,185,80,.03) 45%, transparent 80%)",
          }}
        />

      </div>

      {/* Bottom Reflection */}

      <div className="pointer-events-none absolute bottom-0 left-1/2 z-[60] h-32 w-[900px] -translate-x-1/2">

        <div
          className="h-full w-full blur-3xl"
          style={{
            background:
              "linear-gradient(to top, rgba(255,210,120,.08), transparent)",
          }}
        />

      </div>

          </div>
  );
}







          
  