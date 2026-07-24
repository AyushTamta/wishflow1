export type TimelineStatus =
  | "idle"
  | "playing"
  | "paused"
  | "completed";

export interface TimelineStep {
  id: string;
  duration: number;
    onStart?: () => void;
    onComplete?: () => void;
}

export interface TimelineController {
  play(): void;
  pause(): void;
  resume(): void;
  stop(): void;
  next(): void;
  currentStep: string | null;
  status: TimelineStatus;
}