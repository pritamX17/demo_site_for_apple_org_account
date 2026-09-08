"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, SplitText, CustomEase } from "@/lib/gsap";
import { Screen } from "./Screen";
import { playChat, typingBubble } from "./chat";

const H1 = "The wealthy have always had someone in their corner. Now you do too.";
const STATEMENT = "Jarvis is an AI investing companion that doesn’t wait to be asked.";
const SUB = "It watches what you own, remembers why you bought it, and answers to no one but you.";

/** The Figma hero (212:1248) exactly — the 1440×1024 frame laid out with Figma coordinates and scaled to the viewport —
 *  with the v5 lines in its slots. Treatment "Typed · live chat": the headline clears from a blur word by word,
 *  the phone rises and the 3% conversation plays itself inside it; the Handled cards drop in as notifications. */
export function JarvisHero() {
  const root = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = wrap.current, f = frame.current;
    if (!w || !f) return;
    const scale = () => {
      const s = Math.min(1, w.clientWidth / 1440);
      f.style.transform = `scale(${s})`;
      f.style.marginLeft = w.clientWidth > 1440 ? `${(w.clientWidth - 1440) / 2}px` : "0";
      w.style.height = `${f.offsetHeight * s}px`;
    };
    scale();
    const ro = new ResizeObserver(scale);
    ro.observe(w);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      const sec = frame.current;
      if (!sec) return;
      CustomEase.create("jhero", "M0,0 C0.16,0.9 0.3,1 1,1");
      const h1 = sec.querySelector<HTMLElement>("[data-h1]")!;
      const ph = sec.querySelector<HTMLElement>(".phonepos")!;
      const cards = Array.from(sec.querySelectorAll<HTMLElement>("[data-card]"));
      const ctas = Array.from(sec.querySelectorAll<HTMLElement>("[data-cta]"));
      const msgs = Array.from(sec.querySelectorAll<HTMLElement>(".pmsg"));
      cards.forEach((c, i) => gsap.to(c, { y: (i ? -1 : 1) * 40, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 } }));
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([h1, ph, ...cards, ...ctas], { opacity: 1 });
        return;
      }
      const split = SplitText.create(h1, { type: "words" });
      gsap.set(h1, { opacity: 1 });
      gsap.fromTo(split.words, { opacity: 0, filter: "blur(14px)", y: 8 }, { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.9, stagger: 0.06, ease: "power3.out", delay: 0.1 });
      gsap.fromTo(ph, { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "jhero", delay: 0.2 });
      gsap.fromTo(ctas, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, delay: 0.6, ease: "expo.out" });
      const typing = typingBubble("pmsg j");
      const tl = gsap.timeline({ delay: 1.3 });
      playChat(tl, msgs, typing, (m) => m.classList.contains("j"));
      tl.fromTo(cards, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.25, ease: "expo.out" }, "-=.2");
      return () => typing.remove();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="hero" aria-label="Jarvis">
      {/* desktop: the exact frame */}
      <div className="frame-wrap" ref={wrap}>
        <div className="frame f-hero" ref={frame}>
          <div className="panelbg">
            <div className="cloud c1" /><div className="cloud c2" />
            <div className="rscrim" />
            <div className="dotmatrix" />
            <div className="grain" />
          </div>
          <h1 className="abs h1" data-h1 data-x>{H1}</h1>
          <div className="abs phonepos" data-x><Screen name="chat-hero" /></div>
          <div className="hcard a" data-card data-x><Image className="mk" src="/figma/card-icon.svg" width={11} height={11} alt="" /><div><p>Electricity bill is due Friday. I set the reminder.</p><small>Handled by Jarvis</small></div></div>
          {/* TODO(compliance): this Figma line reads as a recommendation; confirm with counsel before launch */}
          <div className="hcard b" data-card data-x><Image className="mk" src="/figma/card-icon.svg" width={11} height={11} alt="" /><div><p>New balanced portfolio recommendation is live now.</p><small>Handled by Jarvis</small></div></div>
          <p className="abs statement" data-cta data-x>{STATEMENT}</p>
          <p className="abs sub" data-cta data-x>{SUB}</p>
          <a className="abs cta" href="#gate" data-to data-cta data-x>Request access</a>
          <p className="abs beta" data-cta data-x>Invite-only beta</p>
        </div>
      </div>

      {/* phones and tablets: the same hero, stacked */}
      <div className="jhero-m">
        <h1 data-r>{H1}</h1>
        <p className="statement" data-r>{STATEMENT}</p>
        <p className="sub" data-r>{SUB}</p>
        <a className="cta2 light" href="#gate" data-to data-r>Request access</a>
        <p className="beta" data-r>Invite-only beta</p>
        <div className="mphone" data-r><Screen name="chat-hero" /></div>
      </div>
    </section>
  );
}
