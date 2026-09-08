"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, SplitText } from "@/lib/gsap";

const ROW_A = [
  "Zerodha · Portfolio", "Groww · SIP", "Amazon · Cart (4)", "Google Flights · 3 tabs", "ChatGPT · “should I sell”",
  "WhatsApp · Family", "Excel · Budget v7", "MakeMyTrip", "Credit card · due Fri", "Insurance · renew",
];
const ROW_B = [
  "Landlord · rent", "Flipkart · price alert", "YouTube · “top 5 stocks”", "Notes · things to buy", "Bank · 3 accounts",
  "Airbnb · saved", "Calendar · Goa?", "Telegram · tips group", "Reminders · SIP date", "PDF · policy terms",
];

function Row({ items, cls }: { items: string[]; cls: string }) {
  // Doubled so the xPercent:-50 loop is seamless.
  const all = [...items, ...items];
  return (
    <div className={`row10 ${cls}`} aria-hidden="true">
      {all.map((t, i) => (
        <div className="g" key={i}><i />{t}</div>
      ))}
    </div>
  );
}

/** 02 · The reason — copy, then the tab storm: two marquees whose speed and skew
 *  follow scroll velocity, then the team's close line. */
export function Reason() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const sec = ref.current;
      if (!sec) return;
      const a = sec.querySelector<HTMLElement>(".row10.a"),
        b = sec.querySelector<HTMLElement>(".row10.b");
      const h = sec.querySelector<HTMLElement>(".reason-h"),
        p = sec.querySelector<HTMLElement>(".reason-p"),
        close = sec.querySelector<HTMLElement>(".reason-close");
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set([p, close], { opacity: 1 });
        return;
      }
      const ta = gsap.to(a, { xPercent: -50, ease: "none", duration: 48, repeat: -1 });
      const tb = gsap.fromTo(b, { xPercent: -50 }, { xPercent: 0, ease: "none", duration: 60, repeat: -1 });
      const px = { ts: 1 };
      ScrollTrigger.create({
        trigger: sec,
        start: "top bottom",
        end: "bottom top",
        onUpdate(self) {
          const v = gsap.utils.clamp(-2500, 2500, self.getVelocity());
          gsap.to(px, {
            ts: 1 + Math.abs(v) / 500,
            duration: 0.3,
            overwrite: true,
            onUpdate: () => { ta.timeScale(px.ts); tb.timeScale(px.ts); },
          });
          gsap.to([a, b], {
            skewX: v / 220,
            duration: 0.25,
            overwrite: "auto",
            onComplete: () => gsap.to([a, b], { skewX: 0, duration: 0.8, ease: "power3.out" }),
          });
        },
      });

      const run = contextSafe?.(() => {
        const sh = SplitText.create(h, { type: "lines,words", mask: "lines" });
        gsap.from(sh.words, {
          yPercent: 110, duration: 1, stagger: 0.05, ease: "expo.out",
          scrollTrigger: { trigger: h, start: "top 80%", once: true },
        });
      });
      Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]).then(() => run?.());
      gsap.fromTo(p, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: p, start: "top 85%", once: true } });
      gsap.fromTo(close, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: close, start: "top 85%", once: true } });
    },
    { scope: ref },
  );

  return (
    <section id="coo" ref={ref}>
      <div className="sheet pad" style={{ paddingTop: 160, paddingBottom: 64 }}>
        <p className="k2" data-r>The reason</p>
        <h2 className="hh xl reason-h" style={{ maxWidth: 980 }}>You’ve become the COO of your own life.</h2>
        <p className="bd lg reason-p" style={{ maxWidth: 640, marginTop: 36 }} data-v>
          Money in five apps, a purchase half-researched, a trip half-planned. You bounce between search, chatbots, comparison sites and friends, then guess. Nothing remembers what matters to you. Nothing fights for you.
        </p>
      </div>
      <div className="storm">
        <Row items={ROW_A} cls="a" />
        <Row items={ROW_B} cls="b" />
      </div>
      <div className="sheet pad" style={{ paddingTop: 64, paddingBottom: 150 }}>
        <p className="st2 reason-close" style={{ maxWidth: 720 }} data-v>That’s the gap OneStop AI was built to close.</p>
      </div>
    </section>
  );
}
