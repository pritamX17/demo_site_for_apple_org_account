import type { Metadata } from "next";
import "../../home.css";
import "../../motion.css";
import "../../mobile.css";
import "../lab.css";
import "./glass.css";
import { HomeMotion } from "@/components/home/HomeMotion";
import { HomeNav } from "@/components/home/HomeNav";
import { GlassLab } from "@/components/lab/GlassLab";

export const metadata: Metadata = {
  title: "Liquid glass prototype",
  robots: { index: false, follow: false },
};

const LINKS: [string, string, string?][] = [
  ["Homepage", "/"],
  ["Jarvis", "/jarvis", "Live now"],
  ["Motion lab", "/lab"],
  ["Liquid glass", "/lab/glass"],
];

/** /lab/glass — the one prototype of liquid-glass-react (rdev) requested before it touches `/` or `/jarvis`. */
export default function GlassPage() {
  return (
    <div className="hp lab">
      <HomeMotion />
      <HomeNav cta="Back to site" ctaHref="/" links={LINKS} />
      <main>
        <div className="lab-hero">
          <p className="k2" style={{ color: "var(--tide)" }}>Prototype · liquid-glass-react 1.1.1</p>
          <h1 className="hh">Apple’s liquid glass, on our own surfaces.</h1>
          <p className="bd">
            Every slab below is the library’s <code>LiquidGlass</code> component wrapped around copy that is already live on the site.
            Move the mouse over a scene: the slabs refract the sky, the clouds and the photo behind them, and they stretch toward the cursor.
            The sliders drive all of them at once. Chrome and Edge render the refraction. Safari and Firefox, including Safari on iPhone,
            render a plain frosted blur instead — that is a limit of the library, not of our build.
          </p>
        </div>
        <GlassLab />
      </main>
    </div>
  );
}
