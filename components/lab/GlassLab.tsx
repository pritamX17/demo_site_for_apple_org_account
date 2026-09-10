"use client";

import { type ReactNode, useRef, useState } from "react";
import LiquidGlass from "liquid-glass-react";
import { OrbitMark } from "@/components/jarvis/logos";

/** /lab/glass — ONE prototype of rdev/liquid-glass-react on real site surfaces, before any of it
 *  goes on `/` or `/jarvis`. Three scenes, all copy is the locked v5 copy already on the site:
 *  A · the Jarvis hero (nav pills, the two "Handled by Jarvis" cards, the CTA)
 *  B · the idea fold (the receipt as a glass slab on the sky)
 *  C · the phone (the sticky CTA bar + a chat exchange)
 *  The controls at the top drive every slab at once. Chrome/Edge show the refraction; Safari and
 *  Firefox fall back to a plain frosted blur (library limitation — see the README). */

type Mode = "standard" | "polar" | "prominent" | "shader";

type Common = { mode: Mode; displacementScale: number; blurAmount: number; elasticity: number; aberrationIntensity: number; saturation: number };

/** The library renders ~6 sibling layers, every one anchored at top/left 50% and translated back by
 *  half its size — it wants an absolute anchor at the slab's CENTRE. `Slab` gives it one: a wrapper
 *  that hugs an invisible copy of the content (same padding), with the glass centred on it. */
function Slab({ g, pad, radius, box, over, light, onClick, children, style }: {
  g: Common; pad: string; radius: number; box: React.RefObject<HTMLDivElement | null>; over?: boolean; light?: boolean; onClick?: () => void; children: ReactNode; style?: React.CSSProperties;
}) {
  return (
    <div className={light ? "gw light" : "gw"} style={style}>
      <div className="ghost" style={{ padding: pad }} aria-hidden="true">{children}</div>
      <LiquidGlass {...g} cornerRadius={radius} padding={pad} mouseContainer={box} overLight={over} onClick={onClick} style={{ position: "absolute", top: "50%", left: "50%" }}>
        {children}
      </LiquidGlass>
    </div>
  );
}

const HERO_SKY =
  "radial-gradient(ellipse 2407px 1258px at 720px 1024px, #fff 0%, #d4f7ff 8.5%, #a8efff 17%, #7de7ff 25.6%, #52dfff 34%, #29d8ff 41.8%, #14d4ff 45.7%, #0ad2ff 47.6%, #00d0ff 49.5%, #00a8d4 58.3%, #007fa8 67%, #00577d 75.8%, #004267 80.2%, #002e51 84.6%, #00223c 92.3%, #001526 100%)";

export function GlassLab() {
  const [mode, setMode] = useState<Mode>("standard");
  const [disp, setDisp] = useState(56);
  const [blur, setBlur] = useState(0.08);
  const [elastic, setElastic] = useState(0.25);
  const [aberr, setAberr] = useState(2);
  const a = useRef<HTMLDivElement>(null);
  const b = useRef<HTMLDivElement>(null);
  const c = useRef<HTMLDivElement>(null);
  const g: Common = { mode, displacementScale: disp, blurAmount: blur, elasticity: elastic, aberrationIntensity: aberr, saturation: 135 };
  const noop = () => {};

  return (
    <div className="glab">
      {/* ------------------------------------------------ controls */}
      <div className="gctl">
        <div className="modes" role="radiogroup" aria-label="Refraction mode">
          {(["standard", "polar", "prominent", "shader"] as Mode[]).map((m) => (
            <button key={m} type="button" role="radio" aria-checked={mode === m} className={mode === m ? "on" : ""} onClick={() => setMode(m)}>{m}</button>
          ))}
        </div>
        <label>Displacement <input type="range" min={0} max={140} value={disp} onChange={(e) => setDisp(+e.target.value)} /><b>{disp}</b></label>
        <label>Blur <input type="range" min={0} max={0.4} step={0.01} value={blur} onChange={(e) => setBlur(+e.target.value)} /><b>{blur.toFixed(2)}</b></label>
        <label>Elastic <input type="range" min={0} max={0.6} step={0.05} value={elastic} onChange={(e) => setElastic(+e.target.value)} /><b>{elastic.toFixed(2)}</b></label>
        <label>Aberration <input type="range" min={0} max={6} step={0.5} value={aberr} onChange={(e) => setAberr(+e.target.value)} /><b>{aberr}</b></label>
      </div>

      {/* ------------------------------------------------ A · the Jarvis hero */}
      <p className="k2" style={{ color: "var(--tide)" }}>A · Jarvis hero — nav pills, the two cards, the CTA</p>
      <div className="scene hero" ref={a} style={{ background: HERO_SKY }}>
        <div className="cloud c1" /><div className="cloud c2" /><div className="rscrim" />
        <div className="navrow">
          <span className="lockup"><OrbitMark size={22} /> ONESTOP</span>
          <div className="pills">
            <Slab g={g} radius={12} pad="10px 18px" box={a} onClick={noop}><span className="pill">Request access</span></Slab>
            <Slab g={g} radius={12} pad="10px 16px" box={a} onClick={noop}><span className="pill">Menu <i /></span></Slab>
          </div>
        </div>
        <h2 className="h1">The wealthy have always had someone in their corner. Now you do too.</h2>
        <div className="card ca">
          <Slab g={g} radius={16} pad="14px 18px" box={a}>
            <div className="hc"><OrbitMark size={11} /><p>Electricity bill is due Friday. I set the reminder.</p><small>Handled by Jarvis</small></div>
          </Slab>
        </div>
        <div className="card cb">
          <Slab g={g} radius={16} pad="14px 18px" box={a}>
            <div className="hc"><OrbitMark size={11} /><p>New balanced portfolio recommendation is live now.</p><small>Handled by Jarvis</small></div>
          </Slab>
        </div>
        <div className="right">
          <p className="statement">Jarvis is an AI investing companion that doesn’t wait to be asked.</p>
          <Slab g={g} radius={14} pad="14px 26px" box={a} onClick={noop}><span className="cta">Request access</span></Slab>
          <p className="beta">Invite-only beta</p>
        </div>
      </div>

      {/* ------------------------------------------------ B · the receipt on the sky */}
      <p className="k2" style={{ color: "var(--tide)" }}>B · The idea — the receipt as one glass slab on the sky</p>
      <div className="scene idea" ref={b}>
        <div className="photo" /><div className="scrim" />
        <div className="copy">
          <p className="k2" style={{ color: "var(--aqua)" }}>The idea</p>
          <h2 className="hh">The rich pay $5,000 a month for someone in their corner. Yours costs less than a coffee.</h2>
        </div>
        <div className="slab">
          <Slab g={g} radius={28} pad="26px 28px" box={b}>
            <div className="slip">
              <div className="li hd"><span className="k">Private banking · Monthly</span><span className="k">Jarvis</span></div>
              <div className="li"><span>Unhurried conversation</span><b>✓ &nbsp;·&nbsp; ✓</b></div>
              <div className="li"><span>Informed, on your whole picture</span><b>✓ &nbsp;·&nbsp; ✓</b></div>
              <div className="li"><span>Loyal only to you</span><b>✓ &nbsp;·&nbsp; ✓</b></div>
              <div className="tot"><span>Total</span><strong>$5,000 / month &nbsp;·&nbsp; less than a coffee</strong></div>
            </div>
          </Slab>
        </div>
      </div>

      {/* ------------------------------------------------ C · the phone */}
      <p className="k2" style={{ color: "var(--tide)" }}>C · Phone — the sticky bar and a chat exchange (Safari on iPhone shows a plain blur, not the refraction)</p>
      <div className="phonewrap">
        <div className="scene phone" ref={c}>
          <div className="photo" />
          <div className="chat">
            <Slab g={g} radius={18} pad="12px 16px" box={c} light><span className="you">Market’s down 3%. Tempted to sell.</span></Slab>
            <Slab g={g} radius={18} pad="12px 16px" box={c}><span className="j">Did the company get worse today, or just the price?</span></Slab>
            <Slab g={g} radius={18} pad="12px 16px" box={c} light><span className="you">…just the price.</span></Slab>
            <Slab g={g} radius={18} pad="12px 16px" box={c}><span className="j">Then your reason still stands. Close the app, go for a walk.</span></Slab>
          </div>
          <div className="bar">
            <Slab g={g} radius={999} pad="0" box={c} onClick={noop} style={{ width: "100%" }}><span className="mcta">Request access</span></Slab>
          </div>
        </div>
      </div>
    </div>
  );
}
