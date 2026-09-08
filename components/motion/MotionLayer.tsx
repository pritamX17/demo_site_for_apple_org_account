"use client";

import { useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { SmoothScroll } from "./SmoothScroll";

/** Page-wide micro-motion, mounted once per page (both routes + the lab):
 *  1. Lenis inertia scroll (SmoothScroll).
 *  2. Scroll-progress hairline — 2px, Tide→Aqua, springs after the scroll.
 *  3. Press ripple on every CTA (.cta2 .pill .cta .subscribe), delegated.
 *  4. Cursor spotlight on dark panels (.p56.on-dark) via --mx/--my + .lit.
 *  The CSS for 2–4 lives in app/motion.css. Reduced motion: 1 is off, 3–4 are
 *  guarded in CSS, 2 has no motion of its own (it just tracks the scroll). */
export function MotionLayer({ smooth = true }: { smooth?: boolean }) {
  const { scrollYProgress } = useScroll();
  const sx = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 3 · press ripple
    const onDown = (e: PointerEvent) => {
      if (reduced) return;
      const el = (e.target as HTMLElement).closest<HTMLElement>(".hp :is(.cta2, .pill, .cta, .subscribe, .mcta a)");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const s = document.createElement("span");
      s.className = "ripple";
      const d = Math.max(r.width, r.height) * 2.2;
      s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
      el.appendChild(s);
      s.addEventListener("animationend", () => s.remove(), { once: true });
    };

    // 4 · spotlight
    let lit: HTMLElement | null = null;
    const onMove = (e: PointerEvent) => {
      const p = (e.target as HTMLElement).closest<HTMLElement>(".hp .p56.on-dark");
      if (p !== lit) {
        lit?.classList.remove("lit");
        lit = p;
        lit?.classList.add("lit");
      }
      if (!p) return;
      const r = p.getBoundingClientRect();
      p.style.setProperty("--mx", `${e.clientX - r.left}px`);
      p.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    document.addEventListener("pointerdown", onDown);
    if (fine) document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointermove", onMove);
      lit?.classList.remove("lit");
    };
  }, []);

  return (
    <>
      {smooth && <SmoothScroll />}
      <motion.div className="sprog" style={{ scaleX: sx }} aria-hidden />
    </>
  );
}
