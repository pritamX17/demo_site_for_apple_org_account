"use client";

import { useRef } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { WA_NUMBER } from "@/components/start/StartMotion";
import { gsap, useGSAP, ScrollTrigger, SplitText, CustomEase } from "@/lib/gsap";

/* The hero "Try Jarvis" opens the JARVIS WhatsApp chat with a plain-text hello (no emoji: WhatsApp showed it as �). */
const HERO_WA = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi JARVIS, I'd like to start.")}`;

/** Round 3 (2026-10-06): the frosted promise chip under the CTAs is now a plain .trust line ("Answers to you. No one else."), no pill. */
/** 01 · Hero — boxed panel. Headline lines rise behind a mask, the photo settles
 *  on a custom ease, then the copy parallaxes out as the page scrolls. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const hero = ref.current;
      if (!hero) return;
      const photo = hero.querySelector<HTMLElement>(".hero-photo");
      const copy = hero.querySelector<HTMLElement>(".hero-copy");
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(hero.querySelectorAll("[data-h]"), { opacity: 1 });
      } else {
        CustomEase.create("hero", "M0,0 C0.16,0.9 0.3,1 1,1");
        const run = contextSafe?.(() => {
          const split = SplitText.create(hero.querySelectorAll(".h11 span"), {
            type: "lines",
            mask: "lines",
          });
          gsap
            .timeline({ defaults: { ease: "expo.out" } })
            .fromTo(photo, { scale: 1.12 }, { scale: 1, duration: 2.4, ease: "hero" }, 0)
            .from(split.lines, { yPercent: 110, duration: 1.2, stagger: 0.14 }, 0.15)
            .fromTo(hero.querySelectorAll("[data-h]"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.09 }, 0.55);
        });
        Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]).then(() => run?.());
      }

      gsap.to(photo, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
      });
      // 2026-10-06: on phones and tablets (≤900px, the copy sits above the photo band) the copy keeps full opacity while
      // it parallaxes out — the scrubbed fade read as "the buttons are half-transparent while I scroll" in the recording.
      const phone = matchMedia("(max-width: 900px)").matches;
      gsap.to(copy, {
        y: phone ? -60 : -120,
        opacity: phone ? 1 : 0.2,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
      });
      ScrollTrigger.refresh();
    },
    { scope: ref },
  );

  return (
    <section id="hero" ref={ref} className="sheet gut" style={{ paddingTop: "var(--gutter)" }}>
      <div className="p56 on-dark hero-panel">
        <div className="hero-photo hero-img" style={{ zIndex: -2 }} />
        <div
          className="scrim2"
          style={{ background: "linear-gradient(180deg,rgba(0,21,38,.5),rgba(0,21,38,.05) 40%,rgba(0,21,38,.55))", zIndex: -1 }}
        />
        <div className="dm" style={{ top: 0, opacity: 0.5 }} />
        <div className="grain2" />
        <div className="hero-copy">
          <p className="k2" style={{ color: "#fff", opacity: 0.75 }} data-h>
            Introducing OneStop AI
          </p>
          <h1 className="h11">
            <span>One companion.</span>
            <span>Every decision.</span>
          </h1>
          <div className="hero-grid">
            <p className="bd lg" style={{ maxWidth: 560 }} data-h>
              OneStop AI builds AI companions for the decisions you carry, and they answer only to you. The first, Jarvis, is live for money. More of your life is next.
            </p>
            <div data-h>
              <p className="st2">On your side. Always.</p>
              <div className="hero-ctas">
                <Magnetic><a className="cta2 light" href={HERO_WA} target="_blank" rel="noopener">Try Jarvis — Live now</a></Magnetic>
                <a className="lnk" href="#next" data-to>See what’s coming →</a>
              </div>
              <p className="trust" style={{ marginTop: 20 }}>Answers to you. No one else.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
