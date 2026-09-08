"use client";

import { type CSSProperties, type PointerEvent, type ReactNode, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { SPRING, canHover } from "@/lib/motion";

/** 3D tilt for a card: the surface turns toward the pointer (≤ `max` degrees)
 *  with a soft glare that follows it. Perspective sits on the element itself so
 *  the parent layout needs nothing. Hover devices only. The wrapper owns the
 *  transform, so never put a GSAP transform on the same node — float/parallax
 *  goes on a parent slot. */
export function Tilt({
  children,
  max = 6,
  glare = 0.16,
  className,
  style,
}: {
  children: ReactNode;
  max?: number;
  glare?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const go = useMotionValue(0);
  const srx = useSpring(rx, SPRING.soft);
  const sry = useSpring(ry, SPRING.soft);
  const sgo = useSpring(go, SPRING.soft);
  const sheen = useMotionTemplate`radial-gradient(260px circle at ${gx}% ${gy}%, rgba(255,255,255,${glare}), transparent 62%)`;

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (!canHover()) return;
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 2 * max);
    rx.set(-(py - 0.5) * 2 * max);
    gx.set(px * 100);
    gy.set(py * 100);
    go.set(1);
  };
  const leave = () => {
    rx.set(0);
    ry.set(0);
    go.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, rotateX: srx, rotateY: sry, transformPerspective: 900, transformStyle: "preserve-3d" }}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      {children}
      {glare > 0 && (
        <motion.span
          aria-hidden
          style={{ position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none", background: sheen, opacity: sgo, mixBlendMode: "screen" }}
        />
      )}
    </motion.div>
  );
}
