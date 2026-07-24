export type RuntimeStatus =
  | "idle"
  | "playing"
  | "paused"
  | "finished";

export interface SceneStep {
  id: string;
  duration: number;
  transition?: string | null;
}

export interface RuntimeState {
  scene: string | null;
  status: RuntimeStatus;
  progress: number;
}