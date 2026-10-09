// The small GSAP registration for pages that only need ScrollTrigger (/start, the Instagram-ads landing page).
// lib/gsap.ts registers every plugin the site uses (SplitText, ScrambleText, Observer, CustomEase, ScrollTo, DrawSVG);
// a client component that imports it pulls all of them into that route's bundle. /start reveals and toggles only,
// so it imports from here and ships gsap core + ScrollTrigger + useGSAP (≈ 100 KB less JS on a phone).
// Registering twice is harmless if both modules ever meet on one page.
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export { gsap, useGSAP, ScrollTrigger };

/** Scroll-reveal config (2026-10-06, from Saurabh's phone recording: buttons and lines sat half-transparent while he
 *  scrolled). Before: start "top 85%", 800 ms. Now: an element starts as its first pixel reaches the viewport edge
 *  (the +40px margin covers the 14px rest offset ScrollTrigger measures and a fast flick) and is fully opaque 280 ms
 *  later (the "productive reveal" band), once. */
export const REVEAL = { start: "top bottom+=40", duration: 0.28, y: 14 } as const;

type RevealOpts = { stagger?: number; y?: number; scale?: number; start?: string };

/** Reveal guarded elements (CSS holds [data-r] and friends at opacity 0 — home.css "reveal guards").
 *  - reduced motion: final state, no tween;
 *  - anything already inside the first viewport reveals at once (60 ms stagger), so a phone's first screen never waits;
 *  - everything else gets its own trigger at REVEAL.start and runs REVEAL.duration, once.
 *  `stagger` (for rows of rules / beats) is a per-item delay capped at 4 × stagger; CTAs should pass 0. */
export function reveal(targets: gsap.DOMTarget, opts: RevealOpts = {}) {
  const els = gsap.utils.toArray<HTMLElement>(targets);
  if (!els.length) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(els, { opacity: 1, clearProps: "transform" });
    return;
  }
  const { stagger = 0, y = REVEAL.y, start = REVEAL.start, scale } = opts;
  const vh = window.innerHeight;
  const now = els.filter((el) => el.getBoundingClientRect().top < vh);
  const later = els.filter((el) => !now.includes(el));
  const from: gsap.TweenVars = scale ? { y, opacity: 0, scale } : { y, opacity: 0 };
  const to: gsap.TweenVars = scale
    ? { y: 0, opacity: 1, scale: 1, duration: REVEAL.duration, ease: "power3.out" }
    : { y: 0, opacity: 1, duration: REVEAL.duration, ease: "power3.out" };
  if (now.length) gsap.fromTo(now, from, { ...to, stagger: Math.min(stagger || 0.06, 0.06) });
  later.forEach((el, i) =>
    gsap.fromTo(el, from, { ...to, delay: Math.min(i, 4) * stagger, scrollTrigger: { trigger: el, start, once: true } }),
  );
}
