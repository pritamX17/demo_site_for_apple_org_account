import Link from "next/link";
import { Magnetic } from "@/components/motion/Magnetic";

/** 07 · Close — one typographic line on the sheet plus the primary CTA.
 *  The Figma footer below carries the tagline (2 of 2), the email field and the disclaimer. */
export function CloseLine() {
  return (
    <section id="close" className="sheet pad close14">
      <h2 className="hh" data-r>Your life doesn’t need another app. It needs someone on its side.</h2>
      <div className="ctas" data-r>
        <Magnetic><Link className="cta2" href="/jarvis">Try Jarvis — Live now</Link></Magnetic>
        <a className="lnk" href="#next" data-to>Get notified about what’s next →</a>
      </div>
    </section>
  );
}
