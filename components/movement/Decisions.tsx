"use client";

import { useState } from "react";
import Link from "next/link";

type Area = { key: string; label: string; status?: string; read: string; asks: string[] };

/* DRAFT (2026-10-01): short reads to help people think of what to tell us (team lead: AI-drafted is fine).
   No numbers, no outcomes, no named products. The team reviews these before publish. */
const AREAS: Area[] = [
  {
    key: "money",
    label: "Money",
    status: "Live with Jarvis",
    read: "Most money decisions are small and constant. A fee you never saw. A fund you forgot why you bought. A bad week that makes you want to sell. Each one is easy to get wrong when the person explaining it earns from your answer.",
    asks: ["Should I sell because the market fell?", "What am I really paying in fees?", "Is this policy for me, or for the agent?"],
  },
  {
    key: "work",
    label: "Work",
    read: "A job offer. A raise you have to ask for. A move to a new city. You make these a few times in a life, usually inside a week, usually with advice from people who have a stake in what you choose.",
    asks: ["Is this offer good, or just new?", "How do I ask for more?", "Do I stay, or start over?"],
  },
  {
    key: "education",
    label: "Education",
    read: "A degree, a course, a loan to pay for it. The cost is years as well as money, and the brochure is written by the people selling the seat.",
    asks: ["Is this course worth the fee?", "Which college, for what I want to do?", "How much loan is too much?"],
  },
  {
    key: "health",
    label: "Health",
    read: "A report full of numbers. Two doctors who disagree. A claim the insurer turned down. You are asked to decide quickly on things nobody explained slowly.",
    asks: ["What does this report mean for me?", "What should I ask before I agree?", "Why was my claim turned down?"],
  },
  {
    key: "relationships",
    label: "Relationships",
    read: "Money with a partner. Care for a parent. A hard conversation you keep putting off. No app handles these, and they weigh more than the rest.",
    asks: ["How do we split costs fairly?", "How do I plan care for my parents?", "How do I start this conversation?"],
  },
];

/** 04 · The decisions that shape a life — the interactive read (team lead, 2026-10-01, point 9).
 *  Five areas on the left, one short read on the right. "Tell us" carries the area into the form below. */
export function Decisions() {
  const [on, setOn] = useState(0);
  const a = AREAS[on];
  const tell = () => window.dispatchEvent(new CustomEvent<string>("movement:topic", { detail: a.label }));

  return (
    <section id="decisions" className="sheet dec-sec">
      <div className="dec-head">
        <p className="k2" data-r>Where it could matter</p>
        <h2 className="hh" data-r>The decisions that shape a life.</h2>
        <p className="bd" data-r>Pick one and read it. If something comes to mind, tell us. That is how the next product gets chosen.</p>
      </div>
      <div className="dec" data-r>
        <div className="dec-tabs" role="tablist" aria-label="Areas of life">
          {AREAS.map((x, i) => (
            <button key={x.key} type="button" role="tab" id={`dec-tab-${x.key}`} aria-selected={i === on} aria-controls="dec-panel" className={i === on ? "on" : ""} onClick={() => setOn(i)}>
              <span className="n">0{i + 1}</span>
              <span className="l">{x.label}</span>
              {x.status && <span className="st">{x.status}</span>}
            </button>
          ))}
        </div>
        <div className="dec-panel" role="tabpanel" id="dec-panel" aria-labelledby={`dec-tab-${a.key}`} key={a.key}>
          <p className="read">{a.read}</p>
          <p className="k2">Questions people carry</p>
          <ul>
            {a.asks.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
          <div className="dec-ctas">
            <a className="cta2" href="#door" data-to onClick={tell}>Tell us about {a.label.toLowerCase()}</a>
            {a.key === "money" && <Link className="lnk" href="/jarvis">See Jarvis →</Link>}
          </div>
        </div>
      </div>
    </section>
  );
}
