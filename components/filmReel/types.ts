export interface FilmReelSceneProps {
  active: boolean;
  photos: string[];
  onComplete: () => void;
}

export interface FilmStripProps {
  photos: string[];
  onComplete?: () => void;
}

export interface FilmFrameProps {
  src: string;
  index: number;
  active: boolean;
}
