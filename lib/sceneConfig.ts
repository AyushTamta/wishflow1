export const SCENES = [
  {
    id: "invitation",
    duration: 5000,
    transition: "curtain",
  },
  {
    id: "projector",
    duration: 7000,
    transition: "flash",
  },
  {
    id: "memoryReel",
    duration: 30000,
    transition: "filmBurn",
  },
  {
    id: "constellation",
    duration: 8000,
    transition: "iris",
  },
  {
    id: "letter",
    duration: 18000,
    transition: "fade",
  },
  {
    id: "credits",
    duration: 10000,
    transition: null,
  },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];