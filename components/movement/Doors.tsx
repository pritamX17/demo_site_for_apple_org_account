"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Kind } from "./Door";

export const DOORS: { kind: Kind; n: string; title: string; line: string; cta: string }[] = [
  { kind: "idea", n: "01", title: "An idea", line: "Something a companion on your side should handle next.", cta: "Send an idea" },
  { kind: "problem", n: "02", title: "A problem", line: "Something in your life that nobody has solved for you.", cta: "Send a problem" },
  { kind: "concern", n: "03", title: "A concern", line: "Something it must never do.", cta: "Raise a concern" },
];

/** 05 · How to take part — three doors on the white sheet, open columns on one hairline (no tiles).
 *  Each one pre-selects its kind in the form below and scrolls there. */
export function Doors() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const sec = ref.current;
      if (!sec) return;
      const doors = sec.querySelectorAll("[data-door]");
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(doors, { opacity: 1 });
        return;
      }
      gsap.fromTo(doors, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.14, ease: "power3.out", scrollTrigger: { trigger: sec, start: "top 62%", once: true } });
    },
    { scope: ref },
  );

  const pick = (kind: Kind) => window.dispatchEvent(new CustomEvent<Kind>("movement:kind", { detail: kind }));

  return (
    <section id="doors" ref={ref} className="sheet doors-sec">
      <div className="doors-head">
        <p className="k2" data-r>How to take part</p>
        <h2 className="hh" data-r>Tell us what matters to you.</h2>
        <p className="bd" data-r>What you send shapes what we build next. Pick the door that fits and write it in your own words.</p>
      </div>
      <div className="doors">
        {DOORS.map((d) => (
          <a key={d.kind} className="door" href="#door" data-to data-door onClick={() => pick(d.kind)}>
            <p className="n">{d.n}</p>
            <p className="t">{d.title}</p>
            <p className="s">{d.line}</p>
            <span className="go">{d.cta} →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
