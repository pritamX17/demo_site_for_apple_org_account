"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Screen } from "./Screen";

/** 07 · A quiet panel before the gate: the wide sky photograph, the calm Home screen, one line, the CTA. */
export function Quiet() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(ref.current!.querySelector(".hero-photo"), { scale: 1.1 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 0.8 } });
    },
    { scope: ref },
  );
  return (
    <section ref={ref} id="quiet" className="sheet gut" style={{ paddingBottom: "var(--gutter)" }}>
      <div className="p56 on-dark quietp photo-panel">
        {/* brand book p03 · a couple walking side by side under 70% sky — "quietly beside you". Copy sits top-left in the sky, the phone top-right; the couple stays uncovered in the lower centre. */}
        <div className="hero-photo" style={{ zIndex: -2 }} />
        <div className="scrim2" style={{ background: "linear-gradient(180deg,rgba(0,21,38,.45),rgba(0,21,38,.05) 45%,rgba(0,21,38,.35))", zIndex: -1 }} />
        <div className="grain2" />
        <div className="quietg">
          <div>
            <p className="st2" style={{ color: "#fff", fontSize: 30, maxWidth: 420 }} data-r>A second mind, quietly beside you.</p>
            <a className="cta2 light" href="#gate" data-to style={{ marginTop: 32 }} data-r>Request access</a>
          </div>
          <div className="phone-slot"><Screen name="quiet" /></div>
        </div>
      </div>
    </section>
  );
}
