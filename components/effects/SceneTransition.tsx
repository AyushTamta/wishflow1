"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import FilmBurn from "./FilmBurn";
import ProjectorFlash from "./ProjectorFlash";
import Vignette from "./Vignette";

type TransitionType =
  | "fade"
  | "flash"
  | "film"
  | "black";

interface Props {
  trigger: any;
  type?: TransitionType;
  duration?: number;
}

export default function SceneTransition({
  trigger,
  type = "fade",
  duration = 800,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [trigger, duration]);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {type === "flash" && (
            <ProjectorFlash active />
          )}

          {type === "film" && (
            <FilmBurn active />
          )}

          {type === "fade" && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: duration / 1000,
              }}
              className="
                fixed
                inset-0
                z-[999]
                bg-black
              "
            />
          )}

          {type === "black" && (
            <motion.div
              initial={{
                opacity: 1,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: duration / 1000,
              }}
              className="
                fixed
                inset-0
                z-[999]
                bg-black
              "
            />
          )}

          <Vignette />
        </>
      )}
    </AnimatePresence>
  );
}