export const AUDIO = {
  projectorStart: "/audio/projector-start.mp3",
  projectorLoop: "/audio/projector-loop.mp3",
  filmBurn: "/audio/film-burn.mp3",
  paperOpen: "/audio/paper-open.mp3",
  penWriting: "/audio/pen-writing.mp3",
  ambience: "/audio/ambience.mp3",
  credits: "/audio/credits.mp3",
} as const;

export type AudioKey = keyof typeof AUDIO;