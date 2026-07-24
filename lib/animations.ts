import { Variants } from "framer-motion";

export const easing: [number, number, number, number] = [
  0.22,
  1,
  0.36,
  1,
];

export const fade: Variants = {
  initial: {
    opacity: 0,
  },

  animate: {
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: easing,
    },
  },

  exit: {
    opacity: 0,
    transition: {
      duration: 0.45,
      ease: easing,
    },
  },
};

export const slideUp: Variants = {
  initial: {
    opacity: 0,
    y: 40,
  },

  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easing,
    },
  },

  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.45,
      ease: easing,
    },
  },
};

export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.96,
  },

  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easing,
    },
  },

  exit: {
    opacity: 0,
    scale: 1.02,
    transition: {
      duration: 0.45,
      ease: easing,
    },
  },
};