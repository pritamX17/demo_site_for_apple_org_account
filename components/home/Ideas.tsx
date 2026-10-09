import Link from "next/link";
import { Magnetic } from "@/components/motion/Magnetic";

/** Round 3c (2026-10-06, Saurabh): the ending is ONE card for people to answer: "Build it with us" → "Be part of the movement."
 *  with a single button line. The separate "Someone on your side. / Try Jarvis" close section is gone (CloseLine.tsx deleted).
 *  06b · Build it with us — the door to the movement page. The form itself lives at /movement#door. */
export function Ideas() {
  return (
    <section id="ideas" className="sheet gut ideas-open">
      <div className="p56 ideas-panel ideas-card">
        <p className="k2" data-r>Build it with us</p>
        <h2 className="hh" data-r>Be part of the movement.</h2>
        <p className="bd" data-r>
          A movement is not a user base. If OneStop answers to you, you get a say in what it becomes. Tell us what matters to you. It shapes what we build next.
        </p>
        <div className="ideas-cta" data-r>
          <Magnetic><Link className="cta2" href="/movement">Join the movement →</Link></Magnetic>
          <p className="fine">Ideas, problems, concerns. Not a mailing list.</p>
        </div>
      </div>
    </section>
  );
}
