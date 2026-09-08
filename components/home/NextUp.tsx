"use client";

import { type FormEvent, useState } from "react";

/** 05 · What's next — one quiet outline panel, deliberately lower contrast than the Jarvis panel. */
export function NextUp() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO(launch): post to the real email-capture endpoint (same backend as the Jarvis waitlist form).
    setSent(true);
  };
  return (
    <section id="next" className="sheet gut" style={{ paddingTop: 120, paddingBottom: 120 }}>
      <div className="next14" data-r>
        <div>
          <p className="k2">What’s next</p>
          <h2 className="hh">Beyond money.</h2>
          <p className="bd" style={{ marginTop: 20, maxWidth: 560 }}>
            Money first, because the stakes are clear and the frustration is real. The same companion can carry more of your life. What comes next is decided by what our users need, not a fixed roadmap.
          </p>
        </div>
        <div>
          <p className="k2" style={{ marginBottom: 12 }}>Get notified about what’s next →</p>
          {sent ? (
            <p className="bd" style={{ color: "var(--tide)", fontWeight: 600 }}>Thanks. We’ll write when there is something real to say.</p>
          ) : (
            <form className="email2" style={{ maxWidth: 460 }} onSubmit={onSubmit}>
              <input type="email" required placeholder="Enter your email" aria-label="Email" />
              <button className="cta2" type="submit">Get notified →</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
