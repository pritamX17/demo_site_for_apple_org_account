import { Screen } from "./Screen";

/** 03 · The proof. Treatment "Arrive": the three bubbles and the closing line arrive in order beside the Home screen. */
export function Proof() {
  return (
    <section id="proof" className="sheet gut" style={{ paddingBottom: 150 }}>
      <div className="p56 on-dark" style={{ background: "linear-gradient(180deg,#002E51,#001526)", isolation: "isolate", overflow: "hidden" }}>
        <div className="dm" style={{ top: -160, opacity: 0.35 }} /><div className="grain2" />
        <div className="talk" style={{ position: "relative" }}>
          <div className="side">
            <p className="k2" data-r>Jarvis · Unprompted · 6:40 am</p>
            <div className="bub os" data-r>Small thing before your day starts. Three of your funds hold the same twelve stocks. Nothing’s broken — you’re just more concentrated than you probably think.<small>Jarvis</small></div>
            <div className="bub you" data-r>I thought I was diversified.</div>
            <div className="bub os" data-r>Most people with four funds do. Want to see which names overlap, or leave it for the weekend?<small>Jarvis</small></div>
            <p className="st2" style={{ color: "#fff", marginTop: 40 }} data-r>Nobody asked. That’s the point.</p>
          </div>
          <div className="phone-slot" data-r><Screen name="home" /></div>
        </div>
      </div>
    </section>
  );
}
