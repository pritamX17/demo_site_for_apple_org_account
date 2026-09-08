"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/* Purpose-cut 810×880 derivatives of the brand-book photos (boulder p04 · pottery p26 · window p29): faces sit in the upper half, above the glass card. */
const MOMENTS: [string, string, string][] = [
  ["/img/jarvis/moment-rest.jpg", "Then your reason still stands. Close the app, go for a walk.", "Fewer tabs open."],
  ["/img/jarvis/moment-hands.jpg", "Did the company get worse today, or just the price?", "A clearer head."],
  ["/img/jarvis/moment-window.jpg", "Want to see which names overlap, or leave it for the weekend?", "Decisions, not doubt."],
];

/** 06 · Moments. Treatment "Pop · Ken Burns": each photo drifts in scale on scroll; the glass bubble pops up with an elastic ease. */
export function Moments() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const cards = Array.from(ref.current!.querySelectorAll<HTMLElement>(".moment"));
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(ref.current!.querySelectorAll("[data-x]"), { opacity: 1 });
        return;
      }
      cards.forEach((c, i) => {
        gsap.set(c, { opacity: 1 });
        gsap.fromTo(c.querySelector(".img"), { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: c, start: "top bottom", end: "bottom top", scrub: 0.8 } });
        gsap.fromTo(c.querySelector(".glass"), { y: 60, opacity: 0, scale: 0.85 }, { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "elastic.out(1,.55)", delay: i * 0.2, scrollTrigger: { trigger: c, start: "top 70%", once: true } });
      });
    },
    { scope: ref },
  );
  return (
    <section ref={ref} id="moments" className="sheet pad" style={{ paddingBottom: 150 }}>
      <h2 className="hh" style={{ maxWidth: 820 }} data-r>What good advice actually buys you: your evenings back.</h2>
      <div className="moments">
        {MOMENTS.map(([img, line, tag]) => (
          <div className="moment" key={tag} data-x>
            <div className="img" style={{ backgroundImage: `url(${img})` }} />
            <div className="glass" data-x><p className="m j">{line}</p><p className="tag">{tag}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}
