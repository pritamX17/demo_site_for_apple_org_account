"use client";

import { type FormEvent, useEffect, useState } from "react";
import { Magnetic } from "@/components/motion/Magnetic";

export type Kind = "idea" | "problem" | "concern";

const LABEL: Record<Kind, string> = { idea: "An idea", problem: "A problem", concern: "A concern" };
const PROMPT: Record<Kind, string> = {
  idea: "What should a companion on your side handle next?",
  problem: "What in your life has nobody solved for you?",
  concern: "What must it never do?",
};

/** 06 · The door — the form, moved here from the homepage (#ideas, 2026-09-15) and widened by one kind.
 *  The decisions section above can hand over an area ("About: Health").
 *  No backend yet: the form locks on submit. TODO(launch): post { kind, topic, message, email } to the real endpoint.
 *  The copy promises no reply and no build (team lead, 2026-10-01): what people send shapes the roadmap, nothing more. */
export function Door() {
  const [kind, setKind] = useState<Kind>("idea");
  const [topic, setTopic] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const on = (e: Event) => setKind((e as CustomEvent<Kind>).detail);
    const onTopic = (e: Event) => setTopic((e as CustomEvent<string>).detail);
    window.addEventListener("movement:kind", on);
    window.addEventListener("movement:topic", onTopic);
    return () => {
      window.removeEventListener("movement:kind", on);
      window.removeEventListener("movement:topic", onTopic);
    };
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO(launch): post { kind, topic, message, email } to the ideas endpoint (see website/movement-page/PLAN.md §8).
    setSent(true);
  };

  return (
    <section id="door" className="sheet gut">
      <div className="p56 ideas-panel door-panel">
        <div className="grain2" />
        <div className="grd pad ideas-grid">
          <div>
            <p className="k2" data-r>Join the movement</p>
            <h2 className="hh" data-r>Say what it should do.</h2>
            <p className="bd" style={{ marginTop: 24, maxWidth: 480 }} data-r>
              This is your platform. If OneStop answers to you, you get a say in what it becomes. Write it the way you would say it to a friend. Short is fine.
            </p>
          </div>
          <div data-r>
            {sent ? (
              <div className="ideas-done">
                <p className="st2">Received.</p>
                <p className="bd" style={{ marginTop: 12 }}>Thank you. It goes into how we plan what to build next.</p>
              </div>
            ) : (
              <form className="ideas-form" onSubmit={onSubmit}>
                <div className="kind" role="radiogroup" aria-label="What are you sending?">
                  {(Object.keys(LABEL) as Kind[]).map((k) => (
                    <button key={k} type="button" role="radio" aria-checked={kind === k} className={kind === k ? "on" : ""} onClick={() => setKind(k)}>
                      {LABEL[k]}
                    </button>
                  ))}
                </div>
                {topic && (
                  <p className="topic">
                    About: <b>{topic}</b>
                    <button type="button" aria-label={`Remove ${topic}`} onClick={() => setTopic(null)}>×</button>
                  </p>
                )}
                <textarea placeholder={PROMPT[kind]} aria-label={PROMPT[kind]} required rows={5} />
                <input type="email" placeholder="Your email" aria-label="Your email" required />
                <Magnetic className="self-start"><button className="cta2" type="submit">Send</button></Magnetic>
                <p className="fine">Not a mailing list. Your email is only so we can come back to you.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
