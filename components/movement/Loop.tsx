"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const STEPS: [string, string][] = [
  ["Read", "A person reads it. Not a queue, not a model."],
  ["Reply", "You hear back when there is something real to say."],
  ["Build", "The ones that fit the companion get built."],
  ["Credit", "Ship it with your name on it, if you want that."],
];

/** 05 · What happens next — four steps on one line. The line draws through the four points
 *  as the section scrolls in (DrawSVG), the steps land one after another. */
export function Loop() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const sec = ref.current;
      if (!sec) return;
      // Only the visible line (the horizontal one on desktop, the vertical one on phones): DrawSVG cannot measure display:none.
      const line = sec.querySelector<SVGPathElement>(window.innerWidth > 900 ? ".loop-svg.h .loop-line" : ".loop-svg.v .loop-line");
      const steps = sec.querySelectorAll("[data-step]");
      const nodes = sec.querySelectorAll(".loop-dot");
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([steps, nodes], { opacity: 1 });
        return;
      }
      gsap
        .timeline({ scrollTrigger: { trigger: sec, start: "top 60%", once: true } })
        .fromTo(line, { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.6, ease: "power2.inOut" }, 0)
        .fromTo(nodes, { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.38, ease: "back.out(2)" }, 0.1)
        .fromTo(steps, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.38, ease: "power3.out" }, 0.25);
    },
    { scope: ref },
  );

  return (
    <section id="loop" ref={ref} className="sheet gut loop-sec">
      <div className="loop-head">
        <p className="k2" data-r>What happens next</p>
        <h2 className="hh" data-r>Every idea gets read by a person.</h2>
      </div>
      <div className="loop">
        <svg className="loop-svg h" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">
          <path className="loop-track" d="M20 20 H1180" />
          <path className="loop-line" d="M20 20 H1180" />
        </svg>
        <svg className="loop-svg v" viewBox="0 0 40 1200" preserveAspectRatio="none" aria-hidden="true">
          <path className="loop-track" d="M20 20 V1180" />
          <path className="loop-line" d="M20 20 V1180" />
        </svg>
        <div className="loop-steps">
          {STEPS.map(([t, s], i) => (
            <div className="step" key={t}>
              <svg className="loop-dot" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="6" /></svg>
              <div data-step>
                <p className="n">0{i + 1}</p>
                <p className="t">{t}</p>
                <p className="s">{s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* TODO(team): "with your name on it" is a promise — confirm before publish (PLAN.md §4·05). */}
    </section>
  );
}
