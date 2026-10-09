"use client";

import { useEffect } from "react";
import { gsap, useGSAP, ScrollTrigger, reveal } from "@/lib/gsap";

/** Page-level motion: the generic [data-r] reveals, in-page anchor scrolling,
 *  and one ScrollTrigger refresh once fonts have loaded (SplitText line breaks).
 *  2026-10-06: the reveals use lib/gsap `reveal()` — start "top 95%", 280 ms, first viewport at once (was "top 85%", 800 ms). */
export function HomeMotion() {
  useGSAP(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
    reveal(".hp [data-r]");
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  });

  // Smooth in-page anchors (nav + CTAs) via ScrollToPlugin.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        ".hp a[data-to]",
      );
      const href = a?.getAttribute("href");
      if (!a || !href || href[0] !== "#") return;
      e.preventDefault();
      // Lenis owns the scroll when it is mounted (components/motion/SmoothScroll).
      const lenis = window.__lenis;
      if (lenis) {
        lenis.scrollTo(href, { duration: 1.1, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
        return;
      }
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: href, offsetY: 0 },
        ease: "power2.inOut",
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
