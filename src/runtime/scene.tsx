import type { ComponentType } from "react";
import type { ActiveStorySceneProps } from "@/types/scene";

export type SceneId =
  | "invitation"
  | "projector"
  | "memoryReel"
  | "constellation"
  | "letter"
  | "credits";

export interface SceneDefinition {
  id: SceneId;
  component: ComponentType<ActiveStorySceneProps>;
}