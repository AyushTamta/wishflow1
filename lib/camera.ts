export interface CameraAnimation {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
}

export const cameraAnimations: CameraAnimation[] = [
  {
    from: {
      scale: 1,
      x: -18,
      y: 8,
      rotation: -0.4,
    },
    to: {
      scale: 1.12,
      x: 18,
      y: -8,
      rotation: 0.4,
      duration: 10,
      ease: "power1.inOut",
    },
  },

  {
    from: {
      scale: 1.08,
      x: 20,
      y: 0,
      rotation: 0.5,
    },
    to: {
      scale: 1,
      x: -20,
      y: 8,
      rotation: -0.3,
      duration: 11,
      ease: "power1.inOut",
    },
  },

  {
    from: {
      scale: 1,
      x: 0,
      y: 12,
      rotation: -0.2,
    },
    to: {
      scale: 1.15,
      x: 0,
      y: -12,
      rotation: 0.2,
      duration: 12,
      ease: "power1.inOut",
    },
  },

  {
    from: {
      scale: 1.05,
      x: -12,
      y: -10,
      rotation: 0.3,
    },
    to: {
      scale: 1.12,
      x: 12,
      y: 10,
      rotation: -0.2,
      duration: 10,
      ease: "power1.inOut",
    },
  },
];