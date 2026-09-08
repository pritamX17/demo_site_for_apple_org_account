import type { Metadata } from "next";
import "../home.css";
import "../motion.css";
import "../mobile.css";
import "./lab.css";
import { HomeMotion } from "@/components/home/HomeMotion";
import { HomeNav } from "@/components/home/HomeNav";
import { MotionLayer } from "@/components/motion/MotionLayer";
import { Lab } from "@/components/lab/Lab";

export const metadata: Metadata = {
  title: "Motion lab",
  robots: { index: false, follow: false },
};

const LINKS: [string, string, string?][] = [
  ["Homepage", "/"],
  ["Jarvis", "/jarvis", "Live now"],
  ["Lab", "/lab"],
];

/** Branch explore/motion only. A catalogue of the micro-motion candidates:
 *  each one live, with the library, where it would sit, and why. */
export default function LabPage() {
  return (
    <div className="hp lab">
      <HomeMotion />
      <MotionLayer />
      <HomeNav cta="Back to site" ctaHref="/" links={LINKS} />
      <main>
        <div className="lab-hero">
          <p className="k2" style={{ color: "var(--tide)" }}>Motion lab · explore/motion</p>
          <h1 className="hh">Sixteen small moves. Ten are live on this branch.</h1>
          <p className="bd">
            GSAP keeps the choreography it already owns: scroll scrubs, pins, SplitText, ScrambleText, the dot fields.
            Three additions handle what GSAP is not built for. Each item below is live in its box. “Applied” means it is
            already on <code>/</code> and <code>/jarvis</code> on this branch; “Lab only” means it waits for a call.
          </p>
        </div>

        <div className="stack">
          <div><p className="k2">Added · 32 KB gz</p><h3>Motion 13</h3><p>Springs, gestures, layout animation, whileInView. Owns anything the pointer drives and every state change: magnetic, tilt, press, chat pops, route transition.</p></div>
          <div><p className="k2">Added · 5 KB gz</p><h3>Lenis 1.3</h3><p>Inertia scroll on wheel and trackpad, ticked by GSAP so ScrollTrigger reads one clock. Touch stays native. Off under reduced motion.</p></div>
          <div><p className="k2">Added · 7 KB gz</p><h3>NumberFlow</h3><p>Odometer digits with correct width transitions and locale formatting. One job, done properly: the $5,000 on the receipt.</p></div>
        </div>

        <ul className="rules">
          <li><b>Restraint is the brand.</b> One ambient move per screen at most; everything else waits for the pointer.</li>
          <li><b>Springs for pointer, curves for scroll.</b> Pointer-driven motion uses springs (it changes its mind); scroll-driven motion uses the brand curve.</li>
          <li><b>Never two engines on one node.</b> A Motion transform and a GSAP transform on the same element fight. Parents float; children tilt.</li>
          <li><b>Phones get the confirmations, not the flourishes.</b> Ripple and lift yes; magnetic, tilt, spotlight and cursor no (they need a hover pointer).</li>
          <li><b>Reduced motion turns every item off</b> except the progress hairline, which only mirrors the scroll.</li>
        </ul>

        <Lab />
      </main>
    </div>
  );
}
