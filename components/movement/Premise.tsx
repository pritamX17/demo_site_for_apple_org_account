"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { DotForms } from "@/lib/dotfield";
import { useDotField } from "@/components/home/useDotField";

const BEATS: [string, string][] = [
  ["No data sold.", "What you tell a companion stays between you and it."],
  ["No products pushed.", "Nothing here earns a commission when you act on it."],
  ["Answers to you.", "Decisions here answer to you, not to outside shareholders."],
  // TODO(counsel): a promise about shares. The wording is the team lead's (2026-10-01); get the approved text before publish.
  ["Owned by you.", "From the start, OneStop is setting aside half its value as shares for the people who use it."],
];

/** 03 · Why a movement — on the white sheet, not a second box under the hero (Saurabh, 2026-09-22).
 *  Copy left; on the right, scattered dots gather into the orbit mark as the section scrolls in.
 *  The four beats sit on one hairline row below: the three approved "How we're built" lines plus
 *  "Owned by you" (team lead, 2026-10-01). The second paragraph is the chatbot-incentive point from the same note. */
export function Premise() {
  const ref = useRef<HTMLElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useDotField(
    cv,
    ref,
    { n: 1300, color: "0,160,204", radius: 1.9, alpha: 0.9, wander: 0.5 },
    (f) => {
      const W = f.W, H = f.H;
      const sec = ref.current, slot = sec?.querySelector<HTMLElement>(".why-mark");
      // The mark lands in the spacer column; everything else on the section is the scatter.
      let cx = W * 0.74, cy = H * 0.3, R = Math.min(W * 0.4, 560);
      if (sec && slot) {
        const s = slot.getBoundingClientRect(), c = sec.getBoundingClientRect();
        cx = s.left - c.left + s.width / 2;
        cy = s.top - c.top + s.height / 2;
        R = Math.min(s.width, s.height) * 1.25;
      }
      return [
        DotForms.scatter(f.n, { x: -W * 0.05, y: -H * 0.1, w: W * 1.1, h: H * 1.2 }, 29),
        DotForms.mark(f.n, cx, cy, R, 31, 0),
      ];
    },
    { to: 1, start: "top 85%", end: "top 25%" },
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
          .timeline({ scrollTrigger: { trigger: sec, start: "top 60%", once: true } })
          .from(sv.lines, { yPercent: 110, duration: 1.1, stagger: 0.14, ease: "expo.out" })
          .fromTo(sec.querySelectorAll("[data-v]"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" }, 0.3);
      });
      Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]).then(() => run?.());
    },
    { scope: ref },
  );

  return (
    <section id="why" ref={ref} className="sheet why-sec">
      <canvas className="dots" ref={cv} aria-hidden="true" />
      <div className="why-grid">
        <div className="why-copy">
          <p className="k2" data-v>Why a movement</p>
          <h2 className="hh why-h">The value AI creates should reach the people who use it.</h2>
          <p className="bd lg" data-v>
            Not just the corporations spending billions to build it. That is the whole idea, and it changes how the company is run.
          </p>
          <p className="bd" data-v>
            Even a general AI chatbot has an incentive. Its business grows the more you use it, so agreeing with you pays better than correcting you. We would rather be honest with you than pleasant.
          </p>
        </div>
        <div className="why-mark" aria-hidden="true" />
      </div>
      <div className="beats">
        {BEATS.map(([t, s]) => (
          <div className="beat" key={t} data-v>
            <p className="t">{t}</p>
            <p className="s">{s}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
