"use client";

import type { RefObject } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { DotField, type DotFieldOptions, type Pt, isLowPower } from "@/lib/dotfield";

type Scrub = { to: number; start: string; end: string };

/** Round 3 (2026-10-06): dot count by screen width (<700: 260 · 700–1100: 700 · else the existing 4000 cap);
 *  weak devices (≤4 cores) and reduced motion get one still frame and never start the loop. */
/** Mounts a DotField on a canvas, keeps it alive only while its section is on screen,
 *  scrubs its progress with scroll, and rebuilds formations on resize. */
export function useDotField(
  canvas: RefObject<HTMLCanvasElement | null>,
  section: RefObject<HTMLElement | null>,
  opts: DotFieldOptions,
  build: (f: DotField) => Pt[][],
  scrub: Scrub,
) {
  useGSAP(
    () => {
      const cv = canvas.current,
        sec = section.current;
      if (!cv || !sec) return;
      // Fewer dots on small screens: the canvas is the biggest CPU cost on the page.
      const w = window.innerWidth;
      const cap = w < 700 ? 260 : w <= 1100 ? 700 : 4000;
      const n = Math.min(opts.n ?? 1200, cap);
      const f = new DotField(cv, { ...opts, n });
      f.setForms(build(f));

      if (isLowPower()) {
        f.progress(scrub.to).still();
      } else {
        ScrollTrigger.create({
          trigger: sec,
          start: "top bottom",
          end: "bottom top",
          onToggle: (s) => (s.isActive ? f.start() : f.stop()),
        });
        const st = { p: f.p };
        gsap.to(st, {
          p: scrub.to,
          ease: "none",
          onUpdate: () => f.progress(st.p),
          scrollTrigger: { trigger: sec, start: scrub.start, end: scrub.end, scrub: 0.25 },
        });
      }

      let rt = 0;
      const onResize = () => {
        clearTimeout(rt);
        rt = window.setTimeout(() => {
          f.resize();
          f.setForms(build(f));
          f.still();
        }, 150);
      };
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        clearTimeout(rt);
        f.destroy();
      };
    },
    { scope: section },
  );
}
