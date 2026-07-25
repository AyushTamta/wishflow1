import type { ComponentType } from "react";
export type SceneId =
  | "invitation"
  | "projector"
  | "memoryReel"
  | "constellation"
  | "letter"
  | "credits";

export interface SceneDefinition {
  id: SceneId;
  component: ComponentType<any>;
}