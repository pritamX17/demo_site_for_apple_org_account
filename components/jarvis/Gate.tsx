"use client";

import { type FormEvent, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Screen } from "./Screen";
import { Magnetic } from "@/components/motion/Magnetic";

const HEADLINE = "The problem is the password.";

/* Country code first, then the number: a dropdown cuts the wrong-prefix mistakes a free-text field invites. India is the default market. */
const CODES: [string, string][] = [
  ["IN", "+91"], ["US", "+1"], ["GB", "+44"], ["AE", "+971"], ["SG", "+65"], ["CA", "+1"], ["AU", "+61"], ["DE", "+49"],
  ["SA", "+966"], ["QA", "+974"], ["HK", "+852"], ["NL", "+31"], ["IE", "+353"], ["NZ", "+64"], ["JP", "+81"], ["FR", "+33"],
];
const COUNTRY: Record<string, string> = {
  IN: "India", US: "United States", GB: "United Kingdom", AE: "UAE", SG: "Singapore", CA: "Canada", AU: "Australia", DE: "Germany",
  SA: "Saudi Arabia", QA: "Qatar", HK: "Hong Kong", NL: "Netherlands", IE: "Ireland", NZ: "New Zealand", JP: "Japan", FR: "France",
};

/** 08 · Request access. Treatment "Password · scramble": the headline resolves out of a row of dots (ScrambleText,
 *  final length from the first frame so nothing moves). The Ask screen sits static on the right and mirrors what you type. */
export function Gate() {
  const ref = useRef<HTMLElement>(null);
  const [typed, setTyped] = useState("");
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("IN");

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
    // TODO(launch): post the decision + the dial code (CODES[code]) + the national number to the real access-request endpoint.
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
              <div className="phone-row">
                <select aria-label="Country code" value={code} onChange={(e) => setCode(e.target.value)} disabled={sent}>
                  {CODES.map(([iso, dial]) => <option key={iso} value={iso}>{COUNTRY[iso]} {dial}</option>)}
                </select>
                <input type="tel" inputMode="numeric" autoComplete="tel-national" pattern="[0-9][0-9 ]{5,13}" title="Digits only, without the country code" placeholder="Phone number" aria-label="Phone number without the country code" required disabled={sent} />
              </div>
              <Magnetic className="self-start"><button className="cta2 light" type="submit" disabled={sent}>Request access</button></Magnetic>
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
