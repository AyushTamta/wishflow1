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
      scale: 1.045,
      x: 8,
      y: -4,
      rotation: 0.15,
      duration: 10,
      ease: "power1.inOut",
    },
  },

  {
    from: {
      scale: 1.035,
      x: 8,
      y: 0,
      rotation: 0.5,
    },
    to: {
      scale: 1,
      x: -8,
      y: 4,
      rotation: -0.15,
      duration: 11,
      ease: "power1.inOut",
    },
  },

  {
    from: {
      scale: 1,
      x: 0,
      y: 5,
      rotation: -0.1,
    },
    to: {
      scale: 1.05,
      x: 0,
      y: -5,
      rotation: 0.1,
      duration: 12,
      ease: "power1.inOut",
    },
  },

  {
    from: {
      scale: 1.025,
      x: -5,
      y: -4,
      rotation: 0.1,
    },
    to: {
      scale: 1.05,
      x: 5,
      y: 4,
      rotation: -0.1,
      duration: 10,
      ease: "power1.inOut",
    },
  },
];
