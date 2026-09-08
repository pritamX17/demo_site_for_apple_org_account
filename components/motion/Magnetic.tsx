"use client";

import { type PointerEvent, type ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { SPRING, canHover } from "@/lib/motion";

/** Magnetic wrapper for one CTA. The sensing area is `reach`px larger than the
 *  button on every side (padding + negative margin, so layout is untouched).
 *  Inside it the button leans toward the pointer by `strength`, on a spring;
 *  release snaps it home. Press = 3% scale. Hover devices only; touch is a no-op. */
export function Magnetic({
  children,
  strength = 0.28,
  reach = 28,
  className,
  block = false,
}: {
  children: ReactNode;
  strength?: number;
  reach?: number;
  className?: string;
  /** display:block wrapper for full-width buttons (phone). */
  block?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING.soft);
  const sy = useSpring(y, SPRING.soft);

  const move = (e: PointerEvent<HTMLSpanElement>) => {
    if (!canHover()) return;
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={className ? `mag ${className}` : "mag"}
      style={{ display: block ? "block" : "inline-block", padding: reach, margin: -reach, x: sx, y: sy }}
      onPointerMove={move}
      onPointerLeave={leave}
      whileTap={{ scale: 0.97 }}
      transition={SPRING.press}
    >
      {children}
    </motion.span>
  );
}
