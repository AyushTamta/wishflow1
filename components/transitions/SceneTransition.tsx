"use client";

import { AnimatePresence } from "framer-motion";

import FilmBurnTransition from "./FilmBurnTransition";
import CurtainTransition from "./CurtainTransition";
import IrisTransition from "./IrisTransition";
import LensFlash from "./LensFlash";

import { TransitionType } from "@/lib/transition";

interface Props {
  type: TransitionType;
  show: boolean;
}

export default function SceneTransition({
  type,
  show,
}: Props) {
  return (
    <AnimatePresence mode="wait">
      {type === "filmBurn" && (
        <FilmBurnTransition show={show} />
      )}

      {type === "curtain" && (
        <CurtainTransition show={show} />
      )}

      {type === "iris" && (
        <IrisTransition show={show} />
      )}

      {type === "flash" && (
        <LensFlash show={show} />
      )}
    </AnimatePresence>
  );
}