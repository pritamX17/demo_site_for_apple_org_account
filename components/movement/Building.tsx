import { Jarvis } from "@/components/home/Jarvis";
import { Products } from "@/components/home/Products";

/** Round 3 (2026-10-06): the Jarvis panel is the compact variant (one clean card, no floating cards or bubbles);
 *  the columns come from the shared Products component (Jarvis · Health · Education with icons), plus this page's
 *  fourth "What else?" column through the `extra` slot. The local NEXT map is gone. */
/** 02 · What we are building — before "Why a movement" (team lead, 2026-10-01): the products first,
 *  with a heavy dose of Jarvis (the homepage Jarvis panel, approved copy, links to /jarvis),
 *  then health and education as open columns on one hairline. */
export function Building() {
  return (
    <>
      <section id="building" className="sheet build-sec">
        <div className="build-head">
          <p className="k2" data-r>What we are building</p>
          <h2 className="hh" data-r>AI for the most valuable decisions in your life.</h2>
          <p className="bd lg" data-r>
            We build products that put AI to work where a decision matters most. Money came first. Health and education are next. You help decide the rest.
          </p>
        </div>
      </section>
      <Jarvis compact />
      <section className="sheet next-sec">
        <Products
          extra={
            <div className="col" data-r>
              <p className="tag">Your call</p>
              <p className="t">What else?</p>
              <p className="s">Work, family, the big purchase. Tell us where AI on your side would matter most to you.</p>
              <a className="go" href="#door" data-to>Tell us →</a>
            </div>
          }
        />
      </section>
    </>
  );
}
