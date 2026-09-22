import Link from "next/link";
import { Magnetic } from "@/components/motion/Magnetic";

/** 06 · Close — one line on the sheet plus the door CTA. The Figma footer below carries the tagline. */
export function MoveClose() {
  return (
    <section id="close" className="sheet pad close14">
      <h2 className="hh" data-r>This is your platform. Say what it should do.</h2>
      <div className="ctas" data-r>
        <Magnetic><a className="cta2" href="#door" data-to>Send an idea</a></Magnetic>
        <Link className="lnk" href="/jarvis">See Jarvis, the first companion →</Link>
      </div>
    </section>
  );
}
