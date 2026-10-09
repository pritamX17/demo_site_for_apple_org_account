import type { Metadata, Viewport } from "next";
import Image from "next/image";
import "../home.css";
import "../motion.css";
import "../mobile.css";
import "./start.css";
import { StartScreen } from "@/components/start/StartScreen";
import { StartMotion } from "@/components/start/StartMotion";
import { WaIcon } from "@/components/start/WaIcon";
import { SolarIcon, type SolarName } from "@/components/brand/SolarIcon";
import { StartStory, type StoryLine } from "@/components/start/StartStory";

export const metadata: Metadata = {
  title: "Meet JARVIS — Your personal AI for your money",
  description: "Meet JARVIS, your personal AI for your money. It reads what you own, speaks first when something changes, and sells you nothing. Free while in beta.",
  // TODO(launch): drop noindex when the page goes live with the ads
  robots: { index: false, follow: false },
};

/* Phone pass (2026-10-06): viewport-fit=cover makes env(safe-area-inset-bottom) real on iPhones (the sticky bar reads it);
   theme-color paints the Instagram in-app browser chrome in the hero's deep. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#001526",
};

/* /start — the Instagram-ads landing page. Rebuilt 2026-10-06 after Saurabh's review ("the messaging is still complicated"):
   one promise, one plain explanation, four example messages, the comparison, how it starts, five answers, the promise again.
   Mobile-first: Instagram traffic is a phone. Same system as the site: boxed .p56 panels (hero, example messages,
   comparison, close) alternating with open sections; .k2 / .hh / .bd / .cta2; the Figma phone as a visual in the hero.
   One button, always the same words. Ad params: ?a=<ad>&utm_content=<ad name> (StartMotion writes the wa.me link). */

const NOTE = "Opens WhatsApp · One minute · Free in beta";

/* The three-line story (Saurabh, 2026-10-06): one line, one brand SVG scene (components/start/StoryArt.tsx), scanned while scrolling. */
const STORY: StoryLine[] = [
  { id: "apps", scene: "apps", line: <>Your money sits in <em>five apps.</em></> },
  { id: "nobody", scene: "nobody", line: <>Nobody reads all of it. <em>Every day.</em></> },
  { id: "jarvis", scene: "jarvis", line: <><em>JARVIS does.</em></> },
];
const WHAT_P = "Your money sits in five apps: a bank, a broker, two fund apps, a card. JARVIS reads all of them, remembers why you did what you did, and messages you when something matters. Like a friend who happens to read every statement.";
const FOUR: [SolarName, string, string][] = [
  ["reads", "Reads everything", "Every statement, every fund, every card. The fine print too."],
  ["speaks", "Speaks first", "When something changes, you hear it from JARVIS. Before you ask."],
  ["remembers", "Remembers your plan", "It knows why you own what you own, and reminds you on red days."],
  ["sells", "Sells nothing", "No products, no commissions, no tips. It earns nothing when you act."],
];
const WEEK = [
  ["The fee you never saw", "Tue · 9:12 am", "One of your funds costs 1.8% a year. The same fund has a 0.4% version. Want the difference in rupees?", "Read the fine print. Found the cheaper twin."],
  ["The red day", "Thu · 3:05 pm", "Markets fell 3%. You wrote this one is for 2040. Nothing has changed. Go for a walk.", "Remembered your plan. Kept you off the sell button."],
  ["The overlap", "Sat · 8:30 am", "Three of your funds hold the same twelve stocks. You are less diversified than you think.", "Compared every holding across every fund."],
  ["The quiet Sunday", "Sun · 7:00 am", "Nothing needs you today. Enjoy it.", "Checked everything. Said nothing more."],
];
const PROBLEM_P = "A private banker reads your whole picture, calls you first, and answers only to you. Most people get an app that waits for them, and a salesperson who earns when they buy.";
const COMPARE = [
  ["Who pays them", "Often the funds they sell you", "Nobody. JARVIS earns nothing when you act."],
  ["When they call", "Office hours", "6:40 am on a Sunday, if it matters."],
  ["Who they take", "₹50 lakh and up*", "Your first SIP."],
];
const COMPARE_FN = "* SEBI (Portfolio Managers) Regulations, 2020: minimum investment ₹50 lakh.";
const NOT = [
  ["Not ChatGPT.", "It knows your money, not just the question in front of it."],
  ["Not Claude.", "It speaks first. It does not wait to be asked."],
];
const STEPS = [
  ["Tap the button.", "WhatsApp opens with a message to JARVIS already typed."],
  ["Press send.", "JARVIS asks what you own and what you save for. Answer like a friend."],
  ["Get your first message.", "One thing you did not know. Then it stays."],
];
const FAQ = [
  ["Does JARVIS tell me what to buy or sell?", "No. It reads, explains and asks the right question. The decision is yours."],
  ["What does it cost?", "Nothing while in beta. JARVIS earns nothing from any fund, bank or broker."],
  ["What does it see?", "Only what you share in the chat. It never sells or rents your data."],
  ["Is it an app?", "JARVIS starts in your WhatsApp today. The JARVIS app is on the way."],
  ["Who is behind it?", "OneStop AI. JARVIS is the first product. Health and education companions come next."],
];

/* The one button. It always says WhatsApp and carries the WhatsApp glyph, so nobody wonders where the tap goes. */
const Wa = ({ className }: { className: string }) => (
  <a className={className} data-wa href="#"><WaIcon />Chat with JARVIS on WhatsApp</a>
);

export default function StartPage() {
  return (
    <div className="hp sp">
      <header className="s-top">
        <Image src="/figma/nav-logo.svg" alt="OneStop AI" width={160} height={30} priority />
        <span className="s-pill"><WaIcon />On WhatsApp</span>
      </header>

      {/* 01 · HERO: boxed dark photo panel. Desktop: copy left, the phone right, cut by the panel's bottom edge.
          Phones: the copy, then the phone cropped at the bottom with a fade. */}
      <section id="hero" className="sheet gut" style={{ paddingTop: "var(--gutter)" }}>
        <div className="p56 on-dark hero-panel s-hero">
          <div className="hero-photo hero-img">
            {/* a real <img>, not a CSS background: the preload scanner finds it in the HTML and fetchPriority=high makes it the
                first byte on the wire. <picture> picks the 900px crop on phones in every build mode (the hub export runs
                images unoptimized, so next/image would not downsize). Decorative: the copy carries the meaning. */}
            <picture>
              <source media="(max-width: 760px)" srcSet="/img/couple-mobile.jpg" />
              <img src="/img/couple.jpg" alt="" width={1600} height={905} fetchPriority="high" decoding="async" />
            </picture>
          </div>
          <div className="scrim2" />
          <div className="grain2" />
          <div className="hero-copy">
            {/* [data-r0]: CSS entrance (start.css), no JS needed — the headline is on screen at first paint */}
            <p className="k2" data-r0>JARVIS · by OneStop · on WhatsApp</p>
            <h1 className="h11" data-r0><span>Meet JARVIS.</span><span>Your personal AI for your money.</span></h1>
            <p className="bd lg" data-r0>It reads what you own. It speaks first when something changes. It sells you nothing.</p>
            <div data-r0>
              <Wa className="cta2 light s-cta" />
              <p className="s-note">{NOTE}</p>
            </div>
          </div>
          <div className="s-hero-phone"><StartScreen /></div>
        </div>
      </section>

      {/* 02 · THE STORY: three lines, each with its own photo (sticky photo column on desktop, square photo above each line on phones). */}
      <section id="story" className="sheet s-sec s-story-sec">
        <StartStory lines={STORY} />
      </section>

      {/* 03 · WHAT IS JARVIS?: open. Copy, then four points. */}
      <section id="what" className="sheet s-sec s-what">
        <div className="s-what-copy">
          <p className="k2" data-r>What is JARVIS?</p>
          <h2 className="hh" data-r>A personal AI that reads your money. All of it.</h2>
          <p className="bd" data-r>{WHAT_P}</p>
        </div>
        <div className="s-pts">
          {FOUR.map(([icon, t, s]) => (
            <div className="s-pt" key={t} data-r>
              <SolarIcon className="s-ic" name={icon} />
              <p className="t">{t}</p>
              <p className="s">{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 03 · MORE ABOUT JARVIS: light boxed panel, four example messages as WhatsApp bubbles. */}
      <section id="week" className="sheet gut">
        <div className="p56 s-week">
          <div className="dm" style={{ top: 80, opacity: 0.35 }} />
          <div className="s-week-in">
            <p className="k2" style={{ color: "var(--tide)" }} data-r>What that looks like</p>
            <h2 className="hh" data-r>Four things it does for you this week.</h2>
            <div className="s-wk-grid">
              {WEEK.map(([t, when, msg, did]) => (
                <div className="s-wk" key={t} data-r>
                  <p className="t">{t}</p>
                  <p className="who">{when}</p>
                  <p className="msg">{msg}</p>
                  <p className="did">{did}</p>
                </div>
              ))}
            </div>
            <p className="s-fine" data-r>Example messages.</p>
          </div>
        </div>
      </section>

      {/* 04 · THE PROBLEM (open), then THE COMPARISON (dark boxed panel). */}
      <section id="problem" className="sheet s-sec s-problem">
        <p className="k2" data-r>The problem</p>
        <h2 className="hh" data-r>Good money advice was built for the rich.</h2>
        <p className="bd" data-r>{PROBLEM_P}</p>
      </section>
      <section id="compare" className="sheet gut">
        <div className="p56 on-dark s-dark">
          <div className="dm" style={{ top: 0, opacity: 0.35 }} />
          <div className="grain2" />
          <div className="s-dark-in">
            <p className="k2 aqua" data-r>The comparison</p>
            <h2 className="hh" data-r>A personal finance advisor. And JARVIS.</h2>
            <div className="s-cmp" data-r>
              <div className="s-cmp-hd"><span /><span>Advisor</span><span>JARVIS</span></div>
              {COMPARE.map(([k, a, j]) => (
                <div className="s-cmp-row" key={k}>
                  <span className="k">{k}</span>
                  <span className="a">{a}</span>
                  <span className="j">{j}</span>
                </div>
              ))}
            </div>
            <p className="s-fn" data-r>{COMPARE_FN}</p>
            <div className="s-not" data-r>
              {NOT.map(([b, s]) => (
                <p key={b}><b>{b}</b> {s}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 05 · HOW IT STARTS: open, three steps, the button right here. */}
      <section id="how" className="sheet s-sec s-how">
        <p className="k2" data-r>How it starts</p>
        <h2 className="hh" data-r>It starts with one WhatsApp message.</h2>
        <ol className="s-steps">
          {STEPS.map(([t, s]) => (
            <li key={t} data-r><p className="t">{t}</p><p className="s">{s}</p></li>
          ))}
        </ol>
        <div className="s-how-cta" data-r>
          <Wa className="cta2 s-cta" />
          <p className="s-note">{NOTE}</p>
        </div>
      </section>

      {/* 06 · FAQ: open, five answers. */}
      <section id="faq" className="sheet s-sec s-faq">
        <p className="k2" data-r>Before you tap</p>
        <h2 className="hh" data-r>Five quick answers.</h2>
        <div className="s-qs" data-r>
          {FAQ.map(([q, a]) => (
            <details key={q}><summary>{q}</summary><p>{a}</p></details>
          ))}
        </div>
      </section>

      {/* 07 · CLOSE: the promise again, the same button. */}
      <section id="close" className="sheet gut" style={{ paddingBottom: "var(--gutter)" }}>
        <div className="p56 on-dark s-close">
          <div className="dm" style={{ top: -200, opacity: 0.45 }} />
          <div className="grain2" />
          <div className="s-close-in">
            <p className="k2 aqua" data-r>On your side. Always.</p>
            <h2 className="hh" data-r>Meet JARVIS. Your personal AI for your money.</h2>
            <div data-r>
              <Wa className="cta2 light s-cta" />
              <p className="s-note">{NOTE}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="s-foot">
        <Image src="/figma/nav-logo.svg" alt="OneStop AI" width={120} height={23} loading="lazy" />
        <p>JARVIS is a OneStop product in beta. JARVIS provides education and information, not financial advice. OneStop does not sell financial products or recommend securities. The conversation above is illustrative.</p>
      </footer>

      <StartMotion />
    </div>
  );
}
