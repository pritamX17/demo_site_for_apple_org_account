"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { DotForms } from "@/lib/dotfield";
import { useDotField } from "@/components/home/useDotField";

const BEATS: [string, string][] = [
  ["No data sold.", "What you tell a companion stays between you and it."],
  ["No products pushed.", "Nothing here earns a commission when you act on it."],
  ["Answers to you.", "Decisions here answer to you, not to outside shareholders."],
];

/** 02 · Why a movement — night sky. Scattered dots (people) gather into the orbit mark
 *  above the headline as the panel scrolls in. The three beats are the approved "How we're built" lines. */
export function Premise() {
  const ref = useRef<HTMLElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useDotField(
    cv,
    ref,
    { n: 1300, color: "0,253,255", radius: 1.9, alpha: 0.95, wander: 0.5 },
    (f) => {
      const W = f.W, H = f.H;
      const mobile = W < 900;
      const R = mobile ? Math.min(W * 0.8, 420) : Math.min(W * 0.34, 520);
      return [
        DotForms.scatter(f.n, { x: -W * 0.1, y: -H * 0.2, w: W * 1.2, h: H * 1.1 }, 29),
        DotForms.mark(f.n, W / 2, mobile ? 150 : 190, R, 31, 0),
      ];
    },
    { to: 1, start: "top 90%", end: "top 15%" },
  );

  useGSAP(
    (_, contextSafe) => {
      const sec = ref.current;
      if (!sec) return;
      const h = sec.querySelector<HTMLElement>(".why-h");
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(sec.querySelectorAll("[data-v]"), { opacity: 1 });
        return;
      }
      const run = contextSafe?.(() => {
        const sv = SplitText.create(h, { type: "lines", mask: "lines" });
        gsap
          .timeline({ scrollTrigger: { trigger: sec, start: "top 45%", once: true } })
          .from(sv.lines, { yPercent: 110, duration: 1.1, stagger: 0.14, ease: "expo.out" })
          .fromTo(sec.querySelectorAll("[data-v]"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" }, 0.3);
      });
      Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]).then(() => run?.());
    },
    { scope: ref },
  );

  return (
    <section id="why" ref={ref} className="sheet gut">
      <div className="p56 on-dark why-panel">
        <div className="bg sky-night" />
        <canvas className="dots" ref={cv} aria-hidden="true" />
        <div className="grain2" />
        <div className="why-in">
          <p className="k2 aqua" data-v>Why a movement</p>
          <h2 className="hh why-h">The value AI creates should reach the people who use it.</h2>
          <p className="bd lg" data-v>
            Not just the corporations spending billions to build it. That is the whole idea, and it changes how the company is run.
          </p>
          <div className="beats">
            {BEATS.map(([t, s]) => (
              <div className="beat" key={t} data-v>
                <p className="t">{t}</p>
                <p className="s">{s}</p>
              </div>
            ))}
          </div>
          {/* TODO(counsel): review before publish, even in this soft form (team doc, July 2026). */}
          <p className="bd soft" data-v>
            If OneStop succeeds, we want that success to reach the people who helped build it, not just outside investors.
          </p>
        </div>
      </div>
    </section>
  );
}
