"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
} from "framer-motion";
import { FastForward, Pause, Play, Rabbit, Snail } from "lucide-react";

import {
  useCallback,
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

const FRAME_WIDTH = 430;
const FRAME_HEIGHT = 580;
const GAP = 8;

// Three copies are sufficient for seamless looping and avoid rendering dozens
// of duplicate, high-resolution image frames on mobile and deployed builds.
const COPIES = 3;

const DEFAULT_SPEED = 0.5;

export default function FilmStrip({
  photos,
  onComplete,
}: FilmStripProps) {

  const containerRef =
    useRef<HTMLDivElement>(null);

  const autoScroll =
    useRef(true);

  const lastFrameTime =
    useRef<number | null>(null);

  const [speed, setSpeed] =
    useState(DEFAULT_SPEED);

  const [playing, setPlaying] =
    useState(true);

  const [sealing, setSealing] =
    useState(false);

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

  // Keep the visible strip inside the middle and final copies. As those
  // copies are identical, resetting its position is visually seamless.
  const wrapPosition = useCallback(
    (value: number) => {
      const loopStart = -SINGLE_LOOP * (COPIES - 1);
      const offset = value - loopStart;

      return (
        ((offset % SINGLE_LOOP) + SINGLE_LOOP) % SINGLE_LOOP +
        loopStart
      );
    },
    [SINGLE_LOOP]
  );

  useEffect(() => {
    if (!sealing || !onComplete) return;

    autoScroll.current = false;

    const timer = window.setTimeout(() => {
      onComplete();
    }, 950);

    return () => window.clearTimeout(timer);
  }, [sealing, onComplete]);

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
        wrapPosition(
          x.get() -
            (e.deltaY + e.deltaX) * 0.65
        )
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

  }, [x, wrapPosition]);

  useEffect(() => {

    let frame = 0;

    const animateStrip =
      () => {
        const now = performance.now();
        const delta =
          lastFrameTime.current === null
            ? 16.67
            : Math.min(now - lastFrameTime.current, 34);

        lastFrameTime.current = now;

        if (
          autoScroll.current &&
          playing
        ) {

          x.set(
            wrapPosition(
              x.get() -
                speed * delta * 0.18
            )
          );

        }

        frame =
          requestAnimationFrame(
            animateStrip
          );

      };

    lastFrameTime.current = null;
    animateStrip();

    return () => {
      lastFrameTime.current = null;
      cancelAnimationFrame(
        frame
      );
    };

  }, [
    speed,
    x,
    playing,
    wrapPosition,
  ]);

    return (
    <div
      ref={containerRef}
      className="relative h-[100dvh] w-full overflow-hidden bg-[#050505]"
    >

      {/* Projector */}
      <Projector />

      <motion.div
        className="landscape-reel-title pointer-events-none absolute left-1/2 top-6 z-[125] -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.8 }}
      >
        <p className="text-[10px] uppercase tracking-[0.55em] text-[#E6C67A]/70">
          Memory Reel
        </p>
        <h2 className="mt-2 font-serif text-2xl text-white drop-shadow-[0_0_28px_rgba(230,198,122,.24)] md:text-4xl">
          Ambay&apos;s journey of spreading happiness
        </h2>
      </motion.div>

      {/* Left Reel */}
      <div
        className="pointer-events-none absolute top-1/2 z-50 -translate-y-1/2"
        style={{
          left: -500,
        }}
      >
        <Reel
          side="left"
          progress={x}
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
          progress={x}
        />
      </div>

      {/* Side Fade */}
      <div className="pointer-events-none absolute inset-0 z-40">

        <div
          className="absolute left-0 top-1/2 h-[700px] w-[300px] -translate-y-1/2"
          style={{
            background:
              "linear-gradient(to right,#050505 68%,transparent)",
          }}
        />

        <div
          className="absolute right-0 top-1/2 h-[700px] w-[300px] -translate-y-1/2"
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
        className="landscape-reel absolute left-1/2 top-[46%] z-30 flex -translate-x-1/2 -translate-y-1/2 scale-[0.56] sm:scale-[0.72] lg:top-1/2 lg:scale-100"
        style={{
          x,
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
          autoScroll.current = playing;

          // Framer's inertia animation can continue past every duplicated
          // copy on touch devices, leaving an empty strip after the last
          // photo. Put the drag position back inside the identical copies;
          // the next animation frame then continues the reel seamlessly.
          x.set(
            wrapPosition(
              x.get() + info.velocity.x * 0.12
            )
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

              <FilmHoleRow />

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
                      index={index % photos.length}
                    />

                  </div>

                )
              )}


                          </div>

            {/* Bottom Perforations */}

            <div className="pb-3">

              <FilmHoleRow />

            </div>

          </FilmRibbon>

        </div>

      </motion.div>

            {/* Speed Controller */}

      <div
        className="landscape-reel-controls
          absolute
          left-1/2
          bottom-[calc(env(safe-area-inset-bottom)+0.75rem)]
          z-[120]
          -translate-x-1/2
          flex
          w-[calc(100%-1rem)]
          max-w-xl
          flex-wrap
          justify-center
          items-center
          gap-2
          rounded-full
          border
          border-white/10
          bg-black/75
          px-3
          py-2
          backdrop-blur-xl
          shadow-[0_20px_60px_rgba(0,0,0,.45)]
        "
      >
        <div className="flex items-center gap-2 sm:gap-4">

          <span className="text-xs text-neutral-500">
            <Snail size={16} />
          </span>

          <input
            type="range"
            min={0.5}
            max={6}
            step={0.25}
            value={speed}
            onChange={(e) =>
              setSpeed(
                Number(e.target.value)
              )
            }
            className="
              w-24
              sm:w-44
              md:w-72
              cursor-pointer
              accent-yellow-400
            "
          />

          <span className="flex items-center gap-2 text-xs text-neutral-400">
            <Rabbit size={16} />
          </span>

        </div>

        <button
          type="button"
          onClick={() => {
            const nextPlaying = !playing;
            setPlaying(nextPlaying);
            autoScroll.current = nextPlaying;
          }}
          className="
            flex
            h-10
            w-10
            sm:h-12
            sm:w-12
            items-center
            justify-center
            rounded-full
            border
            border-[#E6C67A]/40
            bg-[#E6C67A]/10
            text-[#E6C67A]
            transition
            hover:border-[#E6C67A]/80
            hover:bg-[#E6C67A]/20
          "
          aria-label={playing ? "Pause reel" : "Play reel"}
        >
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.18em] text-neutral-300">
          <FastForward className="hidden sm:block" size={14} />
          <span className="text-[10px] sm:text-xs">{speed.toFixed(2)}x</span>
        </div>

        {onComplete && (
          <motion.button
            type="button"
            onClick={() => setSealing(true)}
            disabled={sealing}
            className="
              rounded-full
              border
              border-[#E6C67A]/40
              bg-[linear-gradient(135deg,rgba(230,198,122,.18),rgba(255,255,255,.04))]
              px-4
              py-2.5
              text-[10px]
              font-medium
              uppercase
              tracking-[0.22em]
              text-[#E6C67A]
              shadow-[0_0_30px_rgba(230,198,122,.14)]
              transition
              hover:border-[#E6C67A]/80
              hover:bg-[#E6C67A]/15
              disabled:cursor-wait
              disabled:opacity-80
            "
            whileHover={{
              scale: 1.04,
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            {sealing ? "Opening..." : "Seal The Reel"}
          </motion.button>
        )}

      </div>

      <AnimatePresence>
        {sealing && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[180] flex items-center justify-center bg-black/20 backdrop-blur-[1px]"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <motion.div
              className="relative flex h-44 w-72 items-center justify-center rounded-[6px] border border-[#E6C67A]/50 bg-[linear-gradient(145deg,#f7ddb0,#b98342_48%,#4a2310)] shadow-[0_0_90px_rgba(230,198,122,.45)]"
              initial={{
                scale: 0.65,
                rotate: -8,
                y: 80,
              }}
              animate={{
                scale: [0.65, 1.05, 0.92],
                rotate: [-8, 3, 0],
                y: [80, 0, -12],
              }}
              transition={{
                duration: 0.9,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-x-0 top-1/2 h-px bg-black/25" />
              <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(32deg,transparent_49%,rgba(255,255,255,.35)_50%,transparent_51%)]" />
              <span className="relative rounded-full border border-[#3b1608]/30 bg-[#8f1d16] px-5 py-3 text-xs uppercase tracking-[0.28em] text-yellow-100 shadow-[0_0_30px_rgba(143,29,22,.55)]">
                For Ambay
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


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







          
  
