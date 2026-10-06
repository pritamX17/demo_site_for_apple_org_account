"use client";

import { useRef } from "react";
/* Round 3b (2026-10-06): the Handled-card mark is the inline CardIcon (no image fetch). */
import Link from "next/link";
import { CardIcon } from "@/components/jarvis/PhoneIcons";
import { gsap, useGSAP, reveal } from "@/lib/gsap";
import { Phone } from "./Phone";
import { Tilt } from "@/components/motion/Tilt";

/** Round 3 (2026-10-06): `compact` prop for /movement — one clean card, copy left and phone right, without the two
 *  floating "Handled by Jarvis" cards and the two chat bubbles (and without their float / pop setup). The homepage keeps the full panel. */
/** 04 · Proof: Jarvis — morning panel. The phone rises into frame, the two chat
 *  bubbles pop, the handled cards drift in parallax. */
export function Jarvis({ compact = false }: { compact?: boolean } = {}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const jv = ref.current;
      if (!jv) return;
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const bubs = jv.querySelectorAll("[data-bub]"),
        copy = jv.querySelectorAll("[data-j]");
      if (reduced) {
        gsap.set([bubs, copy], { opacity: 1 });
        return;
      }
      gsap.fromTo(".phone11", { y: 160 }, { y: 0, ease: "none", scrollTrigger: { trigger: jv, start: "top 85%", end: "top 15%", scrub: 0.6 } });
      // 2026-10-06: each copy line (and the CTA row) reveals on its own edge, 280 ms — the one section-level tween
      // (800 ms + stagger, from "top 85%") left "Try Jarvis →" at ~30% while a phone scrolled it into view.
      reveal(copy);
      if (compact) return;
      // the two chat bubbles keep their beat (you, then Jarvis), but start when the first bubble is in view
      gsap.fromTo(bubs, { opacity: 0, y: 14, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.32, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: bubs[0] ?? jv, start: "top bottom+=40", once: true } });
      jv.querySelectorAll<HTMLElement>("[data-float]").forEach((c) => {
        const k = Number(c.dataset.float);
        gsap.fromTo(c, { y: 60 * k }, { y: -60 * k, ease: "none", scrollTrigger: { trigger: jv, start: "top bottom", end: "bottom top", scrub: 0.6 } });
      });
    },
    { scope: ref, dependencies: [compact] },
  );

  return (
    <section id="jarvis" ref={ref} className="sheet gut" style={{ paddingTop: "var(--gutter)" }}>
      <div className={`p56 jarvis-panel${compact ? " compact" : ""}`}>
        <div className="dm" style={{ top: 380, opacity: 0.45 }} />
        {!compact && (
          <>
            <div className="hslot" style={{ position: "absolute", right: "2%", top: 120, zIndex: 3 }} data-float="1"><Tilt className="hcard flow tilt" style={{ position: "relative", right: "auto", top: "auto" }}>
              <CardIcon className="mk" />
              <div><p>A cash crunch is coming on the 24th. Here is the fix.</p><small>Handled by Jarvis</small></div>
            </Tilt></div>
            {/* Sits under the chat and left of the phone (16px clear), with a short drift: at right 30% / top 620 it covered the bubble and the tickers. */}
            <div className="hslot" style={{ position: "absolute", right: "calc(6% + 429px)", top: 720, zIndex: 3 }} data-float="1"><Tilt className="hcard flow tilt" style={{ position: "relative", right: "auto", top: "auto" }}>
              <CardIcon className="mk" />
              <div><p>Three holdings moved more than usual today. Nothing needs you.</p><small>Handled by Jarvis</small></div>
            </Tilt></div>
          </>
        )}
        <div className="pad jarvis-copy">
          <p className="k2" style={{ color: "var(--tide)" }} data-j>Live now · the first companion</p>
          <h2 className="hh" data-j>Meet Jarvis. Your money, finally on your side.</h2>
          <p className="bd" style={{ marginTop: 24, maxWidth: 520 }} data-j>
            The wealthy have always had someone in their corner for money. Jarvis brings that to everyone. It remembers your goals, reads your real portfolio, and hands the decision back to you.
          </p>
          <div style={{ display: "flex", gap: 28, alignItems: "center", marginTop: 32, flexWrap: "wrap" }} data-j>
            <Link className="cta2" href="/jarvis">Try Jarvis →</Link>
            <Link className="lnk" href="/jarvis">Visit the Jarvis page →</Link>
          </div>
        </div>
        <div className="phone11">
          <Phone />
          {!compact && (
            <>
              <div className="bub you" style={{ left: -260, top: 120, maxWidth: 280 }} data-bub>Market’s down 3% today. Thinking about selling.</div>
              <div className="bub os" style={{ left: -300, top: 210, maxWidth: 330 }} data-bub>
                Has anything changed about why you bought it — or just today’s price? You told me this was for 2040. A bad Tuesday doesn’t have an opinion on 2040.<small>Jarvis</small>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
