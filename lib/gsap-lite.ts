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
