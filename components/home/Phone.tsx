/* Round 3b (2026-10-06): frame, bell, tab icons and verified glyph are inline SVG (components/jarvis/PhoneIcons.tsx) — no image fetches. */
import { OrbitMark } from "@/components/jarvis/logos";
import { DevFrame, IconBell, IconHome, IconNotebook, IconUser, IconWallet, VerifiedGlyph } from "@/components/jarvis/PhoneIcons";

const glyph = <VerifiedGlyph />;

/** Round 3 (2026-10-06): the Portfolio screen became the Home screen — greeting, "what changed" with one receipt,
 *  "your rules" with the quote card. The three ticker rows (PLTR / AMAT / AIR) are gone: no real tickers (compliance). */
/** The Figma phone (212:1265) built natively in HTML — the only product visual on the page. */
export function Phone() {
  return (
    <div className="phone">
      <DevFrame />
      <div className="screen">
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
        <div className="phead">
          <h3>Home</h3>
          <IconBell />
        </div>
        <div className="pcontent">
          <div className="block">
            <p className="ey">Good morning</p>
            <p className="t">Nothing needs you today.</p>
            <p className="b">Three holdings moved more than usual. The picture is unchanged.</p>
          </div>
          <div className="block">
            <p className="ey">What changed</p>
            <p className="t">Markets down 3%. Your plan is not.</p>
            <p className="b">You wrote this one is for 2040. A bad Tuesday has no opinion on 2040.</p>
            <span className="receipt tint">{glyph}Verified · as of 16 Jul 16:01</span>
          </div>
          <div className="block">
            <p className="ey">Your rules</p>
            <div className="quote">
              <span className="bar" />
              <div>
                <p>“Don’t average down until two good quarters.”</p>
                <small>You · Ledger · 12 Mar</small>
              </div>
            </div>
          </div>
          <div className="askpill"><OrbitMark size={17} />Ask Jarvis</div>
        </div>
        <div className="tabs">
          <div className="on"><IconHome />Home<i /></div>
          <div><IconWallet />Portfolio<i /></div>
          <div><IconNotebook />Ledger<i /></div>
          <div><IconUser />Profile<i /></div>
        </div>
      </div>
    </div>
  );
}
