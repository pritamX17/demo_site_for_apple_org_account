"use client";

import type { RefObject } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { DotField, type DotFieldOptions, type Pt } from "@/lib/dotfield";

type Scrub = { to: number; start: string; end: string };

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
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Fewer dots on small screens: the canvas is the biggest CPU cost on the page.
      const n = Math.min(opts.n ?? 1200, window.innerWidth < 700 ? 480 : 4000);
      const f = new DotField(cv, { ...opts, n });
      f.setForms(build(f));

      if (reduced) {
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
