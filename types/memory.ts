// types/memory.ts

export interface Memory {
  id: number;
  image: string;
  caption: string;
  location?: string;
  date?: string;

  /**
   * Duration in milliseconds.
   * Defaults to 4500 if omitted.
   */
  duration?: number;
}

export interface MemoryFrameProps {
  image: string;
  alt: string;
}

export interface MemoryCaptionProps {
  caption: string;
  location?: string;
  date?: string;
}

export interface ProgressDotsProps {
  total: number;
  current: number;
}

export interface MemoryReelProps {
  active: boolean;
  onComplete: () => void;
}