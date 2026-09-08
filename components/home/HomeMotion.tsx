"use client";

import { useEffect } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

/** Page-level motion: the generic [data-r] reveals, in-page anchor scrolling,
 *  and one ScrollTrigger refresh once fonts have loaded (SplitText line breaks). */
export function HomeMotion() {
  useGSAP(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = gsap.utils.toArray<HTMLElement>(".hp [data-r]");
    if (reduced) {
      gsap.set(items, { opacity: 1 });
    } else {
      items.forEach((el) =>
        // fromTo, never from(): the CSS guard already holds these at opacity 0.
        gsap.fromTo(el, { y: 22, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }),
      );
    }
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
