"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Kind } from "./Door";

export const DOORS: { kind: Kind; n: string; title: string; line: string; cta: string }[] = [
  { kind: "idea", n: "01", title: "An idea", line: "Something a companion on your side should handle next.", cta: "Send an idea" },
  { kind: "problem", n: "02", title: "A problem", line: "Something in your money life that nobody has solved for you.", cta: "Send a problem" },
  { kind: "concern", n: "03", title: "A concern", line: "Something it must never do.", cta: "Raise a concern" },
];

/** 03 · How it works — three doors on the white sheet. Each one pre-selects its kind in the form below and scrolls there. */
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
    <section id="doors" ref={ref} className="sheet gut doors-sec">
      <div className="doors-head">
        <p className="k2" data-r>How it works</p>
        <h2 className="hh" data-r>You bring the problem. We bring the build.</h2>
        <p className="bd" data-r>Three doors. Pick the one that fits, write it in your own words, and send. That is the whole thing.</p>
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
