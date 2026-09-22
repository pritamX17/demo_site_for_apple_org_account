import Link from "next/link";
import { Magnetic } from "@/components/motion/Magnetic";

/** 06b · Build it with us — the door to the movement page.
 *  The form itself moved to /movement#door (team call, week of 2026-09-15: the movement is a campaign
 *  and needs its own page; inside the homepage it got lost). This panel only points there. */
export function Ideas() {
  return (
    <section id="ideas" className="sheet gut" style={{ paddingTop: "var(--gutter)" }}>
      <div className="p56 ideas-panel">
        <div className="grain2" />
        <div className="grd pad ideas-grid ideas-door">
          <div>
            <p className="k2" data-r>Build it with us</p>
            <h2 className="hh" data-r>Made with the people it answers to.</h2>
            <p className="bd" style={{ marginTop: 24, maxWidth: 480 }} data-r>
              A movement is not a user base. If OneStop answers to you, you get a say in what it becomes. Send an idea, a problem, or a concern. We read every one.
            </p>
          </div>
          <div className="ideas-cta" data-r>
            <Magnetic><Link className="cta2" href="/movement">The movement →</Link></Magnetic>
            <p className="fine">Ideas, problems, concerns. Not a mailing list.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
