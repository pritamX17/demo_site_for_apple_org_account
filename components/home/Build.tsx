"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { DotForms } from "@/lib/dotfield";
import { useDotField } from "./useDotField";

/** 03 · What we build — open water at dawn. Scattered dots arrive and arrange
 *  into the orbit mark above the horizon as the panel scrolls into view. */
export function Build() {
  const ref = useRef<HTMLElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useDotField(
    cv,
    ref,
    { n: 1300, color: "0,253,255", radius: 1.9, alpha: 0.95, wander: 0.5 },
    (f) => {
      const W = f.W, H = f.H;
      return [
        DotForms.scatter(f.n, { x: -W * 0.1, y: -H * 0.2, w: W * 1.2, h: H * 1.1 }, 17),
        DotForms.mark(f.n, W / 2, H * 0.3, H * 0.62, 19, 0),
      ];
    },
    { to: 1, start: "top 92%", end: "top 22%" },
  );

  useGSAP(
    (_, contextSafe) => {
      const sec = ref.current;
      if (!sec) return;
      const photo = sec.querySelector<HTMLElement>(".hero-photo");
      const h = sec.querySelector<HTMLElement>(".build-h");
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(sec.querySelectorAll("[data-v]"), { opacity: 1 });
        return;
      }
      gsap.fromTo(photo, { scale: 1.1 }, { scale: 1, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: 0.8 } });
      const run = contextSafe?.(() => {
        const sv = SplitText.create(h, { type: "lines", mask: "lines" });
        gsap
          .timeline({ scrollTrigger: { trigger: sec, start: "top 50%", once: true } })
          .from(sv.lines, { yPercent: 110, duration: 1.1, stagger: 0.14, ease: "expo.out" })
          .fromTo(sec.querySelectorAll("[data-v]"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 0.3);
      });
      Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]).then(() => run?.());
    },
    { scope: ref },
  );

  return (
    <section id="vision" ref={ref} className="sheet gut">
      <div className="p56 on-dark build-panel">
        <div className="hero-photo thesis-img" style={{ zIndex: -2 }} />
        <div className="scrim2" style={{ background: "linear-gradient(180deg,rgba(0,21,38,.62) 0%,rgba(0,46,81,.5) 45%,rgba(0,21,38,.88) 100%)", zIndex: -1 }} />
        <canvas className="dots" ref={cv} aria-hidden="true" />
        <div className="grain2" />
        <div style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}>
          <p className="k2 aqua" data-v>What we build</p>
          <h2 className="hh build-h">Not another app. A companion.</h2>
          <p className="bd lg" style={{ margin: "24px auto 0", maxWidth: 680 }} data-v>
            One stop, with a team behind it. The name is the idea: one place that knows your goals, your constraints and your history, so you stop being the integration layer. Behind it, one companion per domain, working as one. It remembers you, reads your real context, and answers only to you.
          </p>
        </div>
      </div>
    </section>
  );
}
