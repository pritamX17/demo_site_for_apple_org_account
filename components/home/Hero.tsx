"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, ScrollTrigger, SplitText, CustomEase } from "@/lib/gsap";

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
      gsap.to(copy, {
        y: -120,
        opacity: 0.2,
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
                <Link className="cta2 light" href="/jarvis">Try Jarvis — Live now</Link>
                <a className="lnk" href="#next" data-to>See what’s coming →</a>
              </div>
              <p className="trust" style={{ marginTop: 28 }}>No product to sell you. No agenda but yours.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
