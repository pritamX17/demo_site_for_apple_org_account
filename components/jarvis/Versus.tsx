import { ClaudeMark, OpenAIMark, OrbitMark } from "./logos";

const ROWS: [string, string, string, string][] = [
  ["Knows what you actually own", "Only what you paste in", "Only what you paste in", "Connected to your real holdings"],
  ["Who starts the conversation", "You do", "You do", "Jarvis does, when something in your portfolio changes"],
  ["What it remembers", "What you’ve typed to it", "What you’ve typed to it", "What you own, why you bought it, what you’re saving for"],
  ["What it’s built for", "Everything. Code, email, holiday plans.", "Everything. Code, essays, research.", "One thing. Your money."],
  ["Your reality — SIPs, ELSS lock-ins, LTCG, demat", "General knowledge, no context on you", "General knowledge, no context on you", "Built around it, applied to your holdings"],
  ["When you’re about to do something rash", "Answers the question you asked", "Answers the question you asked", "Asks the question you were avoiding"],
];

const HEADS = [
  { key: "gpt", name: "ChatGPT", mark: <OpenAIMark size={22} /> },
  { key: "claude", name: "Claude", mark: <ClaudeMark size={22} /> },
  { key: "jarvis", name: "Jarvis", mark: <OrbitMark size={22} /> },
];

/** 04 · The obvious question. Three products side by side with their marks; the Jarvis column
 *  sits on a raised white card. Hairline rows, no colour blocks. Copy v5 verbatim. */
export function Versus() {
  return (
    <section id="versus" className="sheet pad" style={{ paddingTop: 150, paddingBottom: 150 }}>
      <p className="k2" data-r>The obvious question</p>
      <h2 className="hh" style={{ maxWidth: 900 }} data-r>ChatGPT and Claude are brilliant. They just don’t know your money.</h2>
      <div className="vs3" data-r>
        <div className="row hd">
          <div className="lab">Compared on</div>
          {HEADS.map((h) => (
            <div key={h.key} className={`prod ${h.key}`}><span className="mk">{h.mark}</span>{h.name}</div>
          ))}
        </div>
        {ROWS.map(([a, b, c, d]) => (
          <div className="row" key={a}>
            <div className="lab">{a}</div>
            <div className="cell"><span className="mk"><OpenAIMark size={14} /></span>{b}</div>
            <div className="cell"><span className="mk"><ClaudeMark size={14} /></span>{c}</div>
            <div className="cell j"><span className="mk"><OrbitMark size={14} /></span>{d}</div>
          </div>
        ))}
      </div>
      <p className="bd" style={{ marginTop: 40, maxWidth: 720 }} data-r>This isn’t a knock on either of them — we use both. A general assistant is built to answer the question in front of it. Jarvis is built to know your money, and to speak up before you’ve thought to ask.</p>
    </section>
  );
}
