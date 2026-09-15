"use client";

import { type FormEvent, useState } from "react";
import { Magnetic } from "@/components/motion/Magnetic";

type Kind = "idea" | "concern";

const PROMPT: Record<Kind, string> = {
  idea: "What should a companion on your side handle next?",
  concern: "What must it never do?",
};

/** 06b · Build it with us — the door for the people the company answers to.
 *  Sits right after the "How we're built" movement panel: send an idea, raise a concern.
 *  No backend yet: the form locks on submit (TODO(launch): post to the real endpoint; the team will decide how replies work). */
export function Ideas() {
  const [kind, setKind] = useState<Kind>("idea");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO(launch): post { kind, message, email } to the ideas-and-concerns endpoint.
    setSent(true);
  };

  return (
    <section id="ideas" className="sheet gut" style={{ paddingTop: "var(--gutter)" }}>
      <div className="p56 ideas-panel">
        <div className="grain2" />
        <div className="grd pad ideas-grid">
          <div>
            <p className="k2" data-r>Build it with us</p>
            <h2 className="hh" data-r>Made with the people it answers to.</h2>
            <p className="bd" style={{ marginTop: 24, maxWidth: 480 }} data-r>
              A movement is not a user base. If OneStop answers to you, you get a say in what it becomes. Send an idea for what a companion should handle next. Raise a concern about what it must never do. We read every one.
            </p>
          </div>
          <div data-r>
            {sent ? (
              <div className="ideas-done">
                <p className="st2">Received.</p>
                <p className="bd" style={{ marginTop: 12 }}>We read every one. When it changes something, you will know.</p>
              </div>
            ) : (
              <form className="ideas-form" onSubmit={onSubmit}>
                <div className="kind" role="radiogroup" aria-label="What are you sending?">
                  {(["idea", "concern"] as Kind[]).map((k) => (
                    <button key={k} type="button" role="radio" aria-checked={kind === k} className={kind === k ? "on" : ""} onClick={() => setKind(k)}>
                      {k === "idea" ? "An idea" : "A concern"}
                    </button>
                  ))}
                </div>
                <textarea placeholder={PROMPT[kind]} aria-label={PROMPT[kind]} required rows={4} />
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
