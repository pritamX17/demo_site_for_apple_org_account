"use client";

import { type FormEvent, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Screen } from "./Screen";

const HEADLINE = "The problem is the password.";

/** 08 · Request access. Treatment "Password · scramble": the headline resolves out of a row of dots (ScrambleText,
 *  final length from the first frame so nothing moves). The Ask screen sits static on the right and mirrors what you type. */
export function Gate() {
  const ref = useRef<HTMLElement>(null);
  const [typed, setTyped] = useState("");
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      const h = ref.current!.querySelector<HTMLElement>(".hh")!;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      h.style.minHeight = `${h.offsetHeight}px`;
      gsap.to(h, { duration: 1.8, scrambleText: { text: HEADLINE, chars: "•", speed: 0.3, revealDelay: 0.4, tweenLength: false }, scrollTrigger: { trigger: ref.current, start: "top 65%", once: true } });
    },
    { scope: ref },
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO(launch): post the decision + phone number to the real access-request endpoint.
    setSent(true);
  };

  return (
    <section ref={ref} id="gate" className="sheet gut" style={{ paddingBottom: "var(--gutter)" }}>
      <div className="p56 on-dark" style={{ background: "linear-gradient(180deg,#002E51,#001526)", isolation: "isolate", overflow: "hidden" }}>
        <div className="dm" style={{ top: -200, opacity: 0.35 }} /><div className="grain2" />
        <div className="gate" style={{ position: "relative" }}>
          <div>
            <p className="k2" data-r>Request access</p>
            <h2 className="hh">{HEADLINE}</h2>
            <p className="bd" style={{ marginTop: 24, maxWidth: 520 }} data-r>One good decision can be worth lakhs. Tell us the one you’re wrestling with right now — that’s the whole application. Real decisions go first.</p>
            {/* Copy is locked to v5: no invented confirmation line. On submit the form locks (TODO(copy): approved confirmation sentence). */}
            <form onSubmit={onSubmit} data-r>
              <textarea placeholder="The decision you’re wrestling with" aria-label="Your decision" value={typed} onChange={(e) => setTyped(e.target.value)} required disabled={sent} />
              <input type="tel" placeholder="Your phone number" aria-label="Your phone number" required disabled={sent} />
              <button className="cta2 light" type="submit" style={{ alignSelf: "flex-start" }} disabled={sent}>Request access</button>
            </form>
            <p className="fine" data-r>Free while in beta. Never sells you anything. Never tells you what to buy.</p>
            <p className="st2" style={{ color: "#fff", marginTop: 24 }} data-r>On your side. Always.</p>
          </div>
          <div className="phone-slot"><Screen name="ask" typed={typed} /></div>
        </div>
      </div>
    </section>
  );
}
