"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { NumberRoll } from "@/components/motion/NumberRoll";

/** 02 · The idea: the headline rises line by line, the receipt fades in.
 *  The sky photo settles from a slow zoom on scroll. */
export function Idea() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const sec = ref.current!;
      const photo = sec.querySelector(".hero-photo")!;
      const h = sec.querySelector<HTMLElement>(".hh")!;
      const rest = Array.from(sec.querySelectorAll<HTMLElement>("[data-x]")).filter((e) => e !== h);
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([h, ...rest], { opacity: 1 });
        return;
      }
      gsap.fromTo(photo, { scale: 1.1 }, { scale: 1, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: 0.8 } });
      const split = SplitText.create(h, { type: "lines", mask: "lines" });
      gsap.set(h, { opacity: 1 });
      gsap.timeline({ scrollTrigger: { trigger: sec, start: "top 65%", once: true } })
        .from(split.lines, { yPercent: 110, duration: 1, stagger: 0.12, ease: "expo.out" })
        .fromTo(rest, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 0.3);
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="idea" className="sheet gut" style={{ paddingTop: 150, paddingBottom: 150 }}>
      <div className="p56 on-dark photo-panel idea-panel" style={{ isolation: "isolate", overflow: "hidden" }}>
        {/* brand book p36 · two friends in conversation under open sky — the "conversation" the copy describes. Subject stays in the left half. */}
        <div className="hero-photo" style={{ zIndex: -2 }} />
        <div className="scrim2" style={{ background: "linear-gradient(90deg,rgba(0,21,38,.10),rgba(0,21,38,0) 40%,rgba(0,46,81,.42) 100%), linear-gradient(180deg,rgba(0,46,81,.12),rgba(0,21,38,0) 30%,rgba(0,21,38,.22))", zIndex: -1 }} />
        <div className="grain2" />
        <div className="idea3">
          <div className="spacer" aria-hidden="true" />
          <div className="stack">
            <div>
              <p className="k2" data-x>The idea</p>
              <h2 className="hh" data-x>The rich pay $5,000 a month for someone in their corner. Yours costs less than a coffee.</h2>
              <p className="bd" style={{ marginTop: 28, maxWidth: 480 }} data-x>Private bankers sell conversations — unhurried, informed, loyal only to their client. Jarvis brings that conversation to your portfolio.</p>
            </div>
            <div className="glass" data-x>
              <div className="li hd"><span className="k">Private banking · Monthly</span><span className="k">Jarvis</span></div>
              <div className="li"><span>Unhurried conversation</span><b>✓ &nbsp;·&nbsp; ✓</b></div>
              <div className="li"><span>Informed, on your whole picture</span><b>✓ &nbsp;·&nbsp; ✓</b></div>
              <div className="li"><span>Loyal only to you</span><b>✓ &nbsp;·&nbsp; ✓</b></div>
              <div className="tot"><span>Total</span><strong><NumberRoll value={5000} prefix="$" /> <span>/ month</span> &nbsp;·&nbsp; <span>less than a coffee</span></strong></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
