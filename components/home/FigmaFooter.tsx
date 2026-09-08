"use client";

import Image from "next/image";
import { type FormEvent, useEffect, useRef, useState } from "react";

const DISCLAIMER =
  "OneStop AI provides education, information, and automation support — never financial advice. Jarvis, our first product, does not sell products or recommend securities. What comes next, beyond Money, is still being decided.";
const SITE = ["Home", "About", "Contact", "Careers"];
const SOCIAL = ["Instagram", "Twitter", "LinkedIn"];
// TODO(launch): real hrefs for About / Contact / Careers / socials / Privacy / Terms.
const HREF: Record<string, string> = { Home: "/" };

/** The Figma footer (208:1250, 1440×816), re-checked against Figma on 2026-09-08: full-bleed deep950, 1px tint line on top,
 *  headline 112/54, the email box alone at 863/76 (no button — Enter submits), links at 622/644, legal at 742. No disclaimer line.
 *  v2 (2026-09-08, Saurabh: "the footer is not there yet"): keeps the Figma geometry and adds an arrow submit inside the email box,
 *  a Product link group (Jarvis · CTA), the OneStop lockup bottom-right, and the disclaimer line under the legal line.
 *  Above 900px it is the exact frame,
 *  laid out at 1440 with Figma coordinates and scaled to the viewport. Below
 *  900px the same content stacks into a readable column. */
export function FigmaFooter({ disclaimer = DISCLAIMER, button = "Subscribe", product = ["Jarvis", "/jarvis"], cta = ["Try Jarvis", "/jarvis"] }: { disclaimer?: string; button?: string; product?: [string, string]; cta?: [string, string] } = {}) {
  const wrap = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const w = wrap.current, f = frame.current;
    if (!w || !f) return;
    const scale = () => {
      const s = Math.min(1, w.clientWidth / 1440);
      f.style.transform = `scale(${s})`;
      f.style.marginLeft = w.clientWidth > 1440 ? `${(w.clientWidth - 1440) / 2}px` : "0";
      w.style.height = `${f.offsetHeight * s}px`;
    };
    scale();
    const ro = new ResizeObserver(scale);
    ro.observe(w);
    return () => ro.disconnect();
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO(launch): post to the real email-capture endpoint.
    setSent(true);
  };

  return (
    <footer>
      {/* desktop: the exact frame */}
      <div className="frame-wrap" ref={wrap}>
        <div className="frame f-foot" ref={frame}>
          <div className="panelbg"><div className="abs dotmatrix" /><div className="abs dotfade" /></div>
          <h2 className="abs h1">On your side. Always.</h2>
          <form onSubmit={onSubmit} style={{ display: "contents" }}>
            <input className="abs email" type="email" required placeholder={sent ? "Thank you" : "Enter your email"} aria-label="Email" disabled={sent} />
            <button className="abs subscribe" type="submit" disabled={sent} aria-label={button} title={button}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </form>
          <p className="abs lbl" style={{ left: 112 }}>Site</p>
          <a className="abs lnk" style={{ left: 112 }} href={HREF.Home}>Home</a>
          <a className="abs lnk" style={{ left: 170 }} href="#">About</a>
          <a className="abs lnk" style={{ left: 234 }} href="#">Contact</a>
          <a className="abs lnk" style={{ left: 314 }} href="#">Careers</a>
          <p className="abs lbl" style={{ left: 408 }}>Socials</p>
          <a className="abs lnk" style={{ left: 408 }} href="#">Instagram</a>
          <a className="abs lnk" style={{ left: 500 }} href="#">Twitter</a>
          <a className="abs lnk" style={{ left: 575 }} href="#">LinkedIn</a>
          <p className="abs lbl" style={{ left: 704 }}>Product</p>
          <a className="abs lnk" style={{ left: 704 }} href={product[1]}>{product[0]}</a>
          <a className="abs lnk" style={{ left: 704 + 64 }} href={cta[1]} data-to={cta[1].startsWith("#") ? "" : undefined}>{cta[0]}</a>
          <Image className="abs lockup" src="/figma/nav-logo.svg" alt="OneStop AI" width={160} height={30} />
          <p className="abs legal">© 2026 OneStop. All rights reserved &nbsp;|&nbsp; <b>Privacy Policy &nbsp;|&nbsp; Terms of Service</b></p>
          <p className="abs disc">{disclaimer}</p>
        </div>
      </div>

      {/* phones and tablets: the same content, stacked */}
      <div className="mfoot">
        <div className="panel">
          <h2>On your side. Always.</h2>
          {sent ? (
            <p style={{ margin: 0, color: "var(--aqua)", fontWeight: 600 }}>Thank you.</p>
          ) : (
            <form className="email2" onSubmit={onSubmit}>
              <input type="email" required placeholder="Enter your email" aria-label="Email" />
              <button className="sub" type="submit" aria-label={button}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            </form>
          )}
          <div className="cols">
            <div><p className="lbl">Site</p><div className="lnks">{SITE.map((n) => <a key={n} href={HREF[n] ?? "#"}>{n}</a>)}</div></div>
            <div><p className="lbl">Socials</p><div className="lnks">{SOCIAL.map((n) => <a key={n} href="#">{n}</a>)}</div></div>
            <div><p className="lbl">Product</p><div className="lnks"><a href={product[1]}>{product[0]}</a><a href={cta[1]} data-to={cta[1].startsWith("#") ? "" : undefined}>{cta[0]}</a></div></div>
          </div>
          <Image className="lockup" src="/figma/nav-logo.svg" alt="OneStop AI" width={140} height={26} />
          <p className="legal">© 2026 OneStop. All rights reserved<br /><b>Privacy Policy &nbsp;|&nbsp; Terms of Service</b></p>
          <p className="disc">{disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
