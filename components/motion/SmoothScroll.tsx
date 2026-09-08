"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Inertia scroll (Lenis) driven by the GSAP ticker so ScrollTrigger and the
 *  scrub tweens read one clock. Wheel + trackpad only — touch keeps native
 *  scrolling (syncTouch: false), so phones lose nothing. Reduced motion: off.
 *  HomeMotion / HomeNav pick the instance up from window.__lenis. */
export function SmoothScroll({ lerp = 0.085 }: { lerp?: number }) {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp, smoothWheel: true, syncTouch: false, autoRaf: false });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [lerp]);
  return null;
}
