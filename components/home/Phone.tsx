import Image from "next/image";
import { OrbitMark } from "@/components/jarvis/logos";

const glyph = (
  <Image src="/figma/verified-glyph.svg" width={16} height={16} alt="" />
);

/** The Figma phone (212:1265) built natively in HTML — the only product visual on the page. */
export function Phone() {
  return (
    <div className="phone">
      <Image className="devframe" src="/figma/phone-frame.png" alt="" width={413} height={844} />
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
          <h3>Portfolio</h3>
          <Image src="/figma/icon-bell.svg" width={24} height={24} alt="" />
        </div>
        <div className="pcontent">
          <div className="block">
            <p className="ey">① What changed</p>
            <p className="t">Three holdings moved more than usual today.</p>
            <p className="b">Here’s the picture, checked.</p>
            <div className="rows">
              {/* TODO(compliance): the Figma uses real tickers (PLTR, AMAT, AIR). Swap for neutral labels before launch if counsel asks. */}
              <div className="row"><span className="tk">PLTR</span><span className="receipt">{glyph}Verified · NASDAQ · 16:01</span></div>
              <div className="row"><span className="tk">AMAT</span><span className="receipt">{glyph}Verified · NASDAQ · 16:01</span></div>
              <div className="row"><span className="tk">AIR</span><span className="receipt">{glyph}Verified · Euronext · 16:01</span></div>
            </div>
          </div>
          <div className="block">
            <p className="ey">② What your rules say</p>
            <p className="t">Still your call. I’m just holding you to it.</p>
            <p className="b">You wrote, 12 Mar:</p>
            <div className="quote">
              <span className="bar" />
              <div>
                <p>“Don’t average down until two good quarters.”</p>
                <small>You · Ledger · 12 Mar</small>
              </div>
            </div>
          </div>
          <div className="block">
            <p className="ey">③ What needs nothing</p>
            <p className="t">The rest of your picture is unchanged.</p>
            <p className="b">Nothing here needs you today.</p>
            <span className="receipt tint">{glyph}Verified · as of 16 Jul 16:01</span>
          </div>
          <div className="askpill"><OrbitMark size={17} />Ask Jarvis</div>
        </div>
        <div className="tabs">
          <div className="on"><Image src="/figma/icon-home.svg" width={24} height={24} alt="" />Home<i /></div>
          <div><Image src="/figma/icon-wallet.svg" width={24} height={24} alt="" />Portfolio<i /></div>
          <div><Image src="/figma/icon-notebook.svg" width={24} height={24} alt="" />Ledger<i /></div>
          <div><Image src="/figma/icon-user.svg" width={24} height={24} alt="" />Profile<i /></div>
        </div>
      </div>
    </div>
  );
}
