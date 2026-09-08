import Image from "next/image";
import { OrbitMark } from "./logos";

export type ScreenName = "chat-hero" | "home" | "quiet" | "ask";

/* App screens inside the Figma phone (212:1265). The Portfolio screen is the one measured from Figma
   (components/home/Phone.tsx); these four follow the same system: Briefing Blocks, mono receipts, the Ask pill, the tab bar.
   TODO(figma): correct against the OneStop-App file (bxBcAtug99IjCGZO9yTmhY) once it is readable. */
const glyph = <Image src="/figma/verified-glyph.svg" width={16} height={16} alt="" />;

function SBar() {
  return (
    <div className="sbar">
      <span>9:41</span>
      <span className="lv">
        <span className="bars"><b style={{ height: 4 }} /><b style={{ height: 6 }} /><b style={{ height: 8 }} /><b style={{ height: 11 }} /></span>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="#000" aria-hidden="true">
          <path d="M8.5 9.5a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2Zm0-3.4c1.4 0 2.7.5 3.6 1.4l-1.2 1.2a3.4 3.4 0 0 0-4.8 0L4.9 7.5c.9-.9 2.2-1.4 3.6-1.4Zm0-3.4c2.4 0 4.6.9 6.2 2.5l-1.2 1.2A7 7 0 0 0 8.5 4.3a7 7 0 0 0-5 2.1L2.3 5.2A8.7 8.7 0 0 1 8.5 2.7Z" />
        </svg>
        <span className="bat" />
      </span>
    </div>
  );
}
const TABS: [string, string][] = [["home", "Home"], ["wallet", "Portfolio"], ["notebook", "Ledger"], ["user", "Profile"]];
function Tabs({ on }: { on: string }) {
  return (
    <div className="tabs">
      {TABS.map(([icon, label]) => (
        <div key={label} className={label === on ? "on" : ""}>
          <Image src={`/figma/icon-${icon}.svg`} width={24} height={24} alt="" />{label}<i />
        </div>
      ))}
    </div>
  );
}
const AskPill = () => <div className="askpill"><OrbitMark size={17} />Ask Jarvis</div>;
const Who = () => (
  <div className="phead">
    <div className="who">
      <span className="av"><OrbitMark size={22} /></span>
      <div><h3>Jarvis</h3><p className="on"><i />on your side · online</p></div>
    </div>
  </div>
);
const AskField = ({ text, focus }: { text: string; focus?: boolean }) => (
  <div className={`pask${focus ? " focus" : ""}`}>
    <span className="txt">{text}</span>{focus && <span className="caret" />}
    <b><OrbitMark size={14} />Ask</b>
  </div>
);

export function Screen({ name, typed }: { name: ScreenName; typed?: string }) {
  const chat = name === "chat-hero" || name === "ask";
  return (
    <div className="phone">
      <Image className="devframe" src="/figma/phone-frame.png" alt="" width={413} height={844} />
      <div className={`screen${chat ? " chat" : ""}`}>
        <SBar />
        {name === "chat-hero" && (
          <>
            <Who />
            <div className="pcontent">
              <p className="pstamp">Today · 3:12 pm</p>
              <div className="pmsg you">Market’s down 3%. Tempted to sell.</div>
              <div className="pmsg j">Did the company get worse today, or just the price?</div>
              <div className="pmsg you">…just the price.</div>
              <div className="pmsg j">Then your reason still stands. Close the app, go for a walk.</div>
              <AskField text="Ask Jarvis about your portfolio…" />
            </div>
            <Tabs on="Home" />
          </>
        )}
        {name === "home" && (
          <>
            <div className="phead">
              <div><p className="sub">Unprompted · 6:40 am</p><h3>Home</h3></div>
              <Image src="/figma/icon-bell.svg" width={24} height={24} alt="" />
            </div>
            <div className="pcontent">
              <div className="block nudge">
                <p className="ey">Unprompted · 6:40 am</p>
                <p className="t">Three of your funds hold the same twelve stocks.</p>
                <p className="b">Nothing’s broken — you’re just more concentrated than you probably think.</p>
                <div className="acts"><span className="on">See which names overlap</span><span>Leave it for the weekend</span></div>
              </div>
              <div className="block">
                <p className="ey">③ What needs nothing</p>
                <p className="t">The rest of your picture is unchanged.</p>
                <p className="b">Nothing here needs you today.</p>
                <span className="receipt tint">{glyph}Verified · as of 06:00</span>
              </div>
              <AskPill />
            </div>
            <Tabs on="Home" />
          </>
        )}
        {name === "quiet" && (
          <>
            <div className="phead">
              <div><p className="sub">Tuesday · 6:00 pm</p><h3>Home</h3></div>
              <Image src="/figma/icon-bell.svg" width={24} height={24} alt="" />
            </div>
            <div className="pcontent">
              <div className="block quiet">
                <p className="ey">③ What needs nothing</p>
                <p className="t">Nothing here needs you today.</p>
                <p className="b">The rest of your picture is unchanged.</p>
                <span className="receipt tint">{glyph}Verified · as of 16 Jul 16:01</span>
              </div>
              <AskPill />
            </div>
            <Tabs on="Home" />
          </>
        )}
        {name === "ask" && (
          <>
            <Who />
            <div className="pcontent">
              <p className="pstamp">Request access</p>
              <div className="pmsg j">The problem is the password. Tell us the one you’re wrestling with right now — that’s the whole application.</div>
              <AskField text={typed || "The decision you’re wrestling with"} focus />
            </div>
            <Tabs on="Home" />
          </>
        )}
      </div>
    </div>
  );
}
