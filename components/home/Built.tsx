"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { DotForms } from "@/lib/dotfield";
import { useDotField } from "./useDotField";

const RULES = [
  "Loyalty to you, never a platform.",
  "Proactive, not noisy.",
  "Clear about what’s advice, guidance, or automation.",
  "Your data is protected. Never exploited.",
];

/** 06 · How we're built — dusk. Four plain rows on the left; on the right the
 *  orbit mark sharpens from a haze of dots as the panel scrolls in. */
export function Built() {
  const ref = useRef<HTMLElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useDotField(
    cv,
    ref,
    { n: 1000, color: "0,253,255", radius: 1.6, alpha: 0.85, wander: 0.5 },
    (f) => {
      const W = f.W, H = f.H;
      const mobile = W < 900;
      const cx = mobile ? W * 0.5 : W * 0.74, cy = mobile ? H * 0.5 : H * 0.5;
      const R = mobile ? Math.min(W * 0.9, H * 0.9) : Math.min(W * 0.42, H * 0.8);
      return [DotForms.mark(f.n, cx, cy, R, 23, 0.7), DotForms.mark(f.n, cx, cy, R, 23, 0)];
    },
    { to: 1, start: "top 88%", end: "top 28%" },
  );

  useGSAP(
    () => {
      const sec = ref.current;
      if (!sec) return;
      const rules = sec.querySelectorAll("[data-rule]");
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(rules, { opacity: 1 });
        return;
      }
      gsap.fromTo(rules, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.18, ease: "power3.out", scrollTrigger: { trigger: sec, start: "top 55%", once: true } });
    },
    { scope: ref },
  );

  return (
    <section id="rules" ref={ref} className="sheet gut">
      <div className="p56 on-dark rules-panel">
        <div className="bg sky-dusk" />
        <div className="grain2" />
        <canvas className="dots" ref={cv} aria-hidden="true" />
        <div className="grd pad rules-grid">
          <div>
            <p className="k2" data-r>How we’re built</p>
            <h2 className="hh" data-r>Not built to please a platform. Built for you.</h2>
            <p className="bd" style={{ marginTop: 24, maxWidth: 480, marginBottom: 40 }} data-r>
              No data sold. No products pushed. No commissions. The company is bootstrapped and angel-backed, with no institutional funding, so decisions answer to the people who use it, not to outside shareholders.
            </p>
            {RULES.map((t, i) => (
              <div className={`rule${i === RULES.length - 1 ? " last" : ""}`} data-rule key={t}>
                <p className="n">0{i + 1}</p>
                <div><p className="t">{t}</p></div>
              </div>
            ))}
            {/* TODO(counsel): review before publish, even in this soft form (team doc, July 2026). */}
            <p className="bd" style={{ marginTop: 28, maxWidth: 460, fontSize: 15, lineHeight: "24px", opacity: 0.7 }} data-r>
              If OneStop succeeds, we want that success to reach the people who helped build it, not just outside investors.
            </p>
          </div>
          <div />
        </div>
      </div>
    </section>
  );
}
