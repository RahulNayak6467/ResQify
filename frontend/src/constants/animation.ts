import type { Variants } from "motion";

export const fadeOut: Variants = {
  //   initial: {
  //     y: 30,
  //     opacity: 0,
  //   },
  //   final: {
  //     y: 0,
  //     opacity: 1,
  //     transition: {
  //       staggerChilren: 0.1,
  //       delay: 1,
  //       duration: 1,
  //       stagger: 0.1,
  //     },
  //     ease: "easeIn",
  //   },
  initial: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 3,
      staggerChildren: 0.6,
    },
  },
};

export const children: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
    },
  },
};
