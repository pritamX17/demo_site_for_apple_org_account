"use client";

import { useRef } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { gsap, useGSAP, ScrollTrigger, SplitText, CustomEase } from "@/lib/gsap";

/** 01 · Hero — the same boxed panel as the homepage hero, one column of copy in the sky
 *  (the man in the field walks right; the copy owns the left). Lines rise behind a mask,
 *  the photo settles, the copy parallaxes out on scroll. */
export function MoveHero() {
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
        CustomEase.create("mhero", "M0,0 C0.16,0.9 0.3,1 1,1");
        const run = contextSafe?.(() => {
          const split = SplitText.create(hero.querySelectorAll(".h11 span"), { type: "lines", mask: "lines" });
          gsap
            .timeline({ defaults: { ease: "expo.out" } })
            .fromTo(photo, { scale: 1.12 }, { scale: 1, duration: 2.4, ease: "mhero" }, 0)
            .from(split.lines, { yPercent: 110, duration: 1.2, stagger: 0.14 }, 0.15)
            .fromTo(hero.querySelectorAll("[data-h]"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.09 }, 0.55);
        });
        Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]).then(() => run?.());
      }

      gsap.to(photo, { yPercent: 10, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(copy, { y: -120, opacity: 0.2, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
      ScrollTrigger.refresh();
    },
    { scope: ref },
  );

  return (
    <section id="hero" ref={ref} className="sheet gut" style={{ paddingTop: "var(--gutter)" }}>
      <div className="p56 on-dark hero-panel">
        <div className="hero-photo hero-img field-img" style={{ zIndex: -2 }} />
        <div className="scrim2" style={{ background: "linear-gradient(180deg,rgba(0,21,38,.45),rgba(0,21,38,.05) 40%,rgba(0,21,38,.62))", zIndex: -1 }} />
        <div className="grain2" />
        <div className="hero-copy">
          <p className="k2" style={{ color: "#fff", opacity: 0.75 }} data-h>
            The movement
          </p>
          <h1 className="h11">
            <span>Own what AI</span>
            <span>makes for you.</span>
          </h1>
          <div className="hero-grid mv-grid">
            <p className="bd lg" style={{ maxWidth: 560 }} data-h>
              Every AI product today answers to the company that built it. This one answers to you. Help us build it.
            </p>
            <div data-h>
              <div className="hero-ctas">
                <Magnetic><a className="cta2 light" href="#door" data-to>Send an idea</a></Magnetic>
                <a className="lnk" href="#why" data-to>Why a movement →</a>
              </div>
              <p className="trust chip" style={{ marginTop: 20 }}><i aria-hidden="true" />No product to sell you. No agenda but yours.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
