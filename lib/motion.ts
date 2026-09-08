// Motion (motion/react) presets shared by the micro-interactions.
// Springs, never durations, for anything the pointer drives — a spring keeps
// momentum when the pointer changes its mind mid-move; a tween restarts.
// Ladder: soft = pointer-follow (magnetic, tilt) · snappy = state changes ·
// press = the 120–180ms "micro" band from the brand motion model (lib/gsap.ts).
import type { Transition } from "motion/react";

export const SPRING = {
  soft: { type: "spring", stiffness: 170, damping: 26, mass: 1 } as Transition,
  snappy: { type: "spring", stiffness: 420, damping: 30 } as Transition,
  press: { type: "spring", stiffness: 640, damping: 34 } as Transition,
  pop: { type: "spring", stiffness: 380, damping: 24, mass: 0.9 } as Transition,
};

// Brand curve (matches CustomEase usage on the GSAP side): fast out, long settle.
export const EASE_OUT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

export const canHover = () =>
  typeof window !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches;

export const reducedMotion = () =>
  typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
