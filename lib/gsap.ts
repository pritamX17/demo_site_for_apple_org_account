// Single GSAP registration point.
// Imported only by client components, so plugins register once on the client.
// registerPlugin is SSR-safe; ScrollTrigger/SplitText only touch the DOM inside
// useGSAP callbacks (client-only), never during render.
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { Observer } from "gsap/Observer";
import { CustomEase } from "gsap/CustomEase";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin, Observer, CustomEase, ScrollToPlugin, DrawSVGPlugin);

// Dev-only: expose gsap so headless preview tooling can force-render the
// resting state (the preview tab is "hidden", so GSAP's rAF ticker is paused).
if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
  const w = window as unknown as {
    gsap?: typeof gsap;
    ScrollTrigger?: typeof ScrollTrigger;
  };
  w.gsap = gsap;
  w.ScrollTrigger = ScrollTrigger;
}

// Brand motion model (OneStop guidelines p24 "Motion that helps"):
//   context gathers -> focus clarifies -> action resolves.
// Timing ladder: micro 120-180ms | productive reveal 200-320ms | ambient 500-900ms.
// Eases: power3.out / expo.out on UI; never an .in ease. Scrub for cinematic beats.
export const EASE = "power3.out";
export const EASE_EXPO = "expo.out";

export { gsap, useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin, Observer, CustomEase, ScrollToPlugin, DrawSVGPlugin };
