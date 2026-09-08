"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, type Variants } from "motion/react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Tilt } from "@/components/motion/Tilt";
import { NumberRoll } from "@/components/motion/NumberRoll";
import { OrbitMark } from "@/components/jarvis/logos";
import { EASE_OUT, SPRING } from "@/lib/motion";

/* ------------------------------------------------------------------ frame */
function Item({ n, id, title, lib, status, where, why, dark, children }: {
  n: string; id: string; title: string; lib: string; status: "Applied" | "Lab only"; where: string; why: string; dark?: boolean; children: ReactNode;
}) {
  return (
    <article className="lab-item" id={id}>
      <div className="lab-meta">
        <p className="k2" style={{ color: "var(--tide)" }}>{n}</p>
        <h2 className="lab-h">{title}</h2>
        <p className="chips"><span className="chip lib">{lib}</span><span className={`chip${status === "Applied" ? " on" : ""}`}>{status}</span></p>
        <p className="lab-where"><b>Where it lives</b>{where}</p>
        <p className="lab-why">{why}</p>
      </div>
      <div className={`lab-demo${dark ? " dark" : ""}`}>{children}</div>
    </article>
  );
}

function Replay({ onClick }: { onClick: () => void }) {
  return <button type="button" className="replay" onClick={onClick}>Replay</button>;
}

/* ------------------------------------------------------------ 01 · lenis */
function LenisReadout() {
  const [s, set] = useState({ v: 0, p: 0, on: false });
  useEffect(() => {
    const l = window.__lenis;
    if (!l) return;
    return l.on("scroll", (e) => set({ v: e.velocity, p: e.progress, on: true }));
  }, []);
  const w = Math.min(100, Math.abs(s.v) * 1.6);
  return (
    <div className="readout">
      <p className="k2">Lenis {s.on ? "active" : "idle — scroll to read"}</p>
      <div className="bar"><i style={{ width: `${w}%` }} /></div>
      <div className="nums"><span>velocity</span><b>{s.v.toFixed(1)}</b><span>page</span><b>{Math.round(s.p * 100)}%</b></div>
      <p className="fine">lerp 0.085 · wheel + trackpad only · touch stays native · off under reduced motion</p>
    </div>
  );
}

/* ---------------------------------------------------------- 08 · progress */
function ProgressReadout() {
  const { scrollYProgress } = useScroll();
  const [p, setP] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setP(v));
  return (
    <div className="readout">
      <p className="k2">Hairline at the top of this page</p>
      <p className="big">{Math.round(p * 100)}<small>%</small></p>
      <p className="fine">2px · Tide → Aqua · a spring (220/40) lets it trail the scroll by a beat</p>
    </div>
  );
}

/* --------------------------------------------------------- 09 · chat pop */
const CHAT: [boolean, string][] = [
  [true, "Market’s down 3% today. Thinking about selling."],
  [false, "Has anything changed about why you bought it — or just today’s price?"],
  [false, "You told me this was for 2040. A bad Tuesday doesn’t have an opinion on 2040."],
];
function ChatSpring() {
  const [run, setRun] = useState(0);
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    // Reset happens on the first timer tick, not in the effect body (react-hooks/set-state-in-effect).
    const t: number[] = [window.setTimeout(() => { setShown(0); setTyping(false); }, 0)];
    let at = 400;
    CHAT.forEach(([you], i) => {
      if (!you) {
        t.push(window.setTimeout(() => setTyping(true), at));
        at += 1100;
      }
      t.push(window.setTimeout(() => { setTyping(false); setShown(i + 1); }, at));
      at += you ? 700 : 900;
    });
    return () => t.forEach(clearTimeout);
  }, [run]);
  return (
    <>
      <div className="lchat">
        <AnimatePresence initial={false}>
          {CHAT.slice(0, shown).map(([you, text], i) => (
            <motion.div key={i} layout className={`lmsg${you ? " you" : ""}`}
              initial={{ opacity: 0, y: 16, scale: 0.9, originX: you ? 1 : 0, originY: 1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={SPRING.pop}>{text}</motion.div>
          ))}
          {typing && (
            <motion.div key="typing" layout className="lmsg typing" initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }} transition={SPRING.pop}>
              <i /><i /><i />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Replay onClick={() => setRun((r) => r + 1)} />
    </>
  );
}

/* ------------------------------------------------------- 10 · clip reveal */
function ClipReveal() {
  const [k, setK] = useState(0);
  return (
    <>
      <motion.div key={k} className="reveal" initial={{ clipPath: "inset(0 100% 0 0 round 28px)" }} whileInView={{ clipPath: "inset(0 0% 0 0 round 28px)" }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.1, ease: EASE_OUT }}>
        <motion.div className="img" initial={{ scale: 1.18 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.5, ease: EASE_OUT }} />
      </motion.div>
      <Replay onClick={() => setK((v) => v + 1)} />
    </>
  );
}

/* ---------------------------------------------------- 11 · route transition */
function RouteDemo() {
  const [k, setK] = useState(0);
  return (
    <>
      <motion.div key={k} className="route" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: EASE_OUT }}>
        <p className="k2">Next page</p>
        <p className="hh" style={{ fontSize: 28, margin: "6px 0 0" }}>Rises 14px, fades in, 550ms.</p>
      </motion.div>
      <Replay onClick={() => setK((v) => v + 1)} />
    </>
  );
}

/* ---------------------------------------------------- 12 · velocity skew */
function VelocitySkew() {
  const sk = useMotionValue(0);
  const ssk = useSpring(sk, { stiffness: 140, damping: 22 });
  useEffect(() => {
    const l = window.__lenis;
    if (!l) return;
    return l.on("scroll", (e) => sk.set(Math.max(-3.5, Math.min(3.5, e.velocity * 0.06))));
  }, [sk]);
  return (
    <motion.p className="skew" style={{ skewY: ssk }}>Scroll fast. The line leans with the page, then settles.</motion.p>
  );
}

/* ---------------------------------------------------- 14 · stagger grid */
const grid: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } };
const cell: Variants = { hidden: { opacity: 0, y: 18, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: SPRING.snappy } };
function StaggerGrid() {
  const [k, setK] = useState(0);
  return (
    <>
      <motion.div key={k} className="sgrid" variants={grid} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
        {["Watches", "Remembers", "Answers to you", "No upsell", "No tips", "Your evenings"].map((t) => (
          <motion.div key={t} className="scell" variants={cell}>{t}</motion.div>
        ))}
      </motion.div>
      <Replay onClick={() => setK((v) => v + 1)} />
    </>
  );
}

/* ---------------------------------------------------- 15 · cursor dot */
function CursorDot() {
  const [on, setOn] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const s = useMotionValue(1);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const ss = useSpring(s, SPRING.snappy);
  useEffect(() => {
    if (!on) return;
    const mv = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      s.set((e.target as HTMLElement).closest("a, button") ? 3 : 1);
    };
    window.addEventListener("pointermove", mv, { passive: true });
    return () => window.removeEventListener("pointermove", mv);
  }, [on, x, y, s]);
  return (
    <>
      <button type="button" className="replay" onClick={() => setOn((v) => !v)}>{on ? "Turn the dot off" : "Turn the dot on"}</button>
      <p className="fine" style={{ width: "100%", textAlign: "center" }}>A 10px Aqua dot on a tight spring; grows 3× over links and buttons. The system cursor stays.</p>
      {on && <motion.div className="cur" style={{ x: sx, y: sy, scale: ss }} aria-hidden />}
    </>
  );
}

/* ================================================================ list */
export function Lab() {
  const [rollKey, setRollKey] = useState(0);
  const recRef = useRef<HTMLDivElement>(null);
  return (
    <div className="lab-list">
      <Item n="01" id="smooth" title="Inertia scroll" lib="Lenis 1.3" status="Applied" where="Both pages, whole document." why="The page gains weight. Every scrub tween (hero clouds, phone rise, Ken Burns) now eases in and out instead of stepping with the wheel. Touch is untouched.">
        <LenisReadout />
      </Item>

      <Item n="02" id="magnetic" title="Magnetic CTA" lib="Motion 13 · useSpring" status="Applied" where="Hero CTA, Jarvis-section CTA, close-line CTA, Request-access buttons, nav pill." why="The button leans toward the pointer before it arrives, then snaps home. It reads as mass, not as a hover state.">
        <Magnetic strength={0.2}><a className="cta2" href="#magnetic">Soft · 0.20</a></Magnetic>
        <Magnetic strength={0.3}><a className="cta2" href="#magnetic">Default · 0.30</a></Magnetic>
        <Magnetic strength={0.45}><a className="cta2" href="#magnetic">Strong · 0.45</a></Magnetic>
      </Item>

      <Item n="03" id="press" title="Press ripple + lift" lib="CSS + delegated pointerdown" status="Applied" where="Every .cta2 / .pill / .cta / subscribe arrow." why="Hover lifts 1px with a shadow; press spreads ink from the pointer for 520ms. Confirms the touch on phones where hover does not exist.">
        <a className="cta2" href="#press">Try Jarvis — Live now</a>
        <span className="darkchip"><a className="cta2 light" href="#press">Request access</a></span>
        <span className="nav2 solid" style={{ position: "static", height: "auto", padding: 0 }}><a className="pill" href="#press">Try Jarvis</a></span>
      </Item>

      <Item n="04" id="underline" title="Link underline exit / re-enter" lib="CSS keyframes" status="Applied" where="Every text link (.lnk). Footer links get a quieter draw-in." why="The hairline leaves to the right and comes back from the left. One line, 600ms, no colour change needed.">
        <a className="lnk" href="#underline">Visit the Jarvis page →</a>
        <a className="lnk" href="#underline">Why we exist</a>
        <a className="lnk" href="#underline">What’s next</a>
      </Item>

      <Item n="05" id="tilt" title="3D tilt + glare" lib="Motion 13 · useMotionTemplate" status="Applied" where="The two floating “Handled by Jarvis” cards on the homepage." why="Cards turn toward the pointer by up to 6° with a light that tracks it. The card feels like an object on the desk, not a rectangle in a layout.">
        <Tilt className="hcard tilt" style={{ position: "relative", right: "auto", top: "auto" }}>
          <span className="mk" style={{ background: "var(--aqua)", borderRadius: 3, display: "block" }} />
          <div><p>A cash crunch is coming on the 24th. Here is the fix.</p><small>Handled by Jarvis</small></div>
        </Tilt>
        <Tilt className="glass tilt" max={4} glare={0.1} style={{ maxWidth: 320 }}>
          <div className="li hd"><span className="k">Private banking</span><span className="k">Jarvis</span></div>
          <div className="li"><span>Loyal only to you</span><b>✓ · ✓</b></div>
        </Tilt>
      </Item>

      <Item n="06" id="number" title="Number roll" lib="NumberFlow" status="Applied" where="The $5,000 total on the Jarvis receipt card." why="Digits spin up like an odometer the first time the card is in view. The figure earns a beat of attention without a single extra word.">
        <div className="roll" ref={recRef}>
          <p className="k2">Total</p>
          <p className="big"><NumberRoll value={5000} prefix="$" replayKey={rollKey} /><small> / month</small></p>
          <p className="k2" style={{ marginTop: 24 }}>Indian format</p>
          <p className="big"><NumberRoll value={120000} prefix="₹" locales="en-IN" replayKey={rollKey} /></p>
        </div>
        <Replay onClick={() => setRollKey((v) => v + 1)} />
      </Item>

      <Item n="07" id="spotlight" title="Cursor spotlight on dark panels" lib="CSS vars + delegated pointermove" status="Applied" where="Every dark panel (.p56.on-dark): vision, gate, Jarvis hero, footer band." why="A 560px Aqua glow at 9% follows the pointer across deep water. Gives the dark panels depth the way light does on real glass. Fine pointers only." dark>
        <div className="p56 on-dark spot"><p className="k2 aqua">Move the pointer</p><p className="hh" style={{ fontSize: 32 }}>Light on deep water.</p></div>
      </Item>

      <Item n="08" id="progress" title="Scroll-progress hairline" lib="Motion 13 · useScroll" status="Applied" where="Top edge of every page." why="The quietest orientation cue there is. It also tells the reader a long page is a long page before they commit.">
        <ProgressReadout />
      </Item>

      <Item n="09" id="chat" title="Chat bubbles on springs" lib="Motion 13 · AnimatePresence + layout" status="Lab only" where="Candidate for the homepage Jarvis section and the product-page phone screens (today: GSAP fromTo)." why="Typing dots, then the bubble pops from its corner on a spring and the list re-flows with layout animation. Closer to a real messenger than a fade.">
        <ChatSpring />
      </Item>

      <Item n="10" id="reveal" title="Clip-path photo reveal" lib="Motion 13 · whileInView" status="Lab only" where="Candidate for the Moments cards and the Idea panel photo (today: Ken Burns only)." why="The photo wipes in from the left while it settles from 118% to 100%. Two curves, one gesture: the image arrives, then breathes.">
        <ClipReveal />
      </Item>

      <Item n="11" id="route" title="Route transition" lib="Motion 13 · app/template.tsx" status="Applied" where="Every navigation between / and /jarvis and back." why="The new page rises and fades over 550ms instead of cutting. Cheap, and it makes the two pages feel like one product.">
        <RouteDemo />
      </Item>

      <Item n="12" id="skew" title="Velocity skew" lib="Lenis velocity + Motion spring" status="Lab only" where="Candidate for section headlines (.hh) — cap at 3.5°." why="Type leans with fast scrolling and settles on a spring. A signature move on premium editorial sites; easy to overdo, so it stays here until judged on real copy.">
        <VelocitySkew />
      </Item>

      <Item n="13" id="breath" title="Listening breath on the orbit mark" lib="CSS keyframes" status="Applied" where="The app tile in the “Where Jarvis lives today” band above the footer." why="A ring expands from the mark every 3.6s while the mark itself swells 8%. It says “on, listening” with no words and no cost.">
        <span className="breath"><OrbitMark size={28} /></span>
      </Item>

      <Item n="14" id="stagger" title="Staggered grid entrance" lib="Motion 13 · variants" status="Lab only" where="Candidate for the six-things list, the versus grid, the moments row." why="Children enter 70ms apart on a snappy spring. Declarative: one variant on the parent, one on the child.">
        <StaggerGrid />
      </Item>

      <Item n="15" id="cursor" title="Cursor dot" lib="Motion 13 · useSpring" status="Lab only" where="Site-wide if adopted. Off by default here." why="Divisive on a finance product: it reads as “agency site”. Included so the team can feel it and decide, not because it is recommended.">
        <CursorDot />
      </Item>

      <Item n="16" id="sheen" title="CTA sheen" lib="CSS keyframes" status="Applied" where="Every dark primary button (.cta2 without .light)." why="One soft light pass every 7 seconds. Ambient, not attention-seeking — you notice it the second time, not the first.">
        <a className="cta2" href="#sheen">Try Jarvis — Live now</a>
        <a className="cta2" href="#sheen">Request access</a>
      </Item>
    </div>
  );
}
