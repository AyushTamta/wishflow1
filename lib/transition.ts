export const TRANSITIONS = {
  filmBurn: {
    duration: 900,
  },

  flash: {
    duration: 700,
  },

  curtain: {
    duration: 1200,
  },

  iris: {
    duration: 1000,
  },
} as const;

export type TransitionType =
  keyof typeof TRANSITIONS;