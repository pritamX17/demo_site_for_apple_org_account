"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { FooterPulse } from "@/components/home/FooterPulse";
import { OrbitMark } from "@/components/jarvis/logos";

/** Round 3 (2026-10-06): the email field, its arrow submit and the `sent` state are gone from both layouts (frame closed
 *  up to 480px, link rows moved up in home.css); socials are Instagram only (plain text until the team sends the URL). */

const DISCLAIMER =
  "OneStop AI provides education, information, and automation support — never financial advice. Jarvis, our first product, does not sell products or recommend securities. What comes next, beyond Money, is still being decided.";
const SITE = ["Home", "About", "Contact"];
const SOCIAL = ["Instagram"];
// Careers removed on the team call (week of 2026-09-15): no hiring yet. About = the "what we build" section until an About page exists.
// TODO(launch): Privacy / Terms pages. A social without a URL renders as plain text:
// a "#" link jumps to the top of the page, which the team reported as broken navigation.
const HREF: Record<string, string> = { Home: "/", About: "/#vision", Contact: "/movement#door" };
const SOCIAL_HREF: Record<string, string> = { Instagram: "https://www.instagram.com/hellojarvis_ind/" }; // Saurabh, 2026-10-06
const social = (n: string, cls?: string, left?: number) =>
  SOCIAL_HREF[n] ? (
    <a key={n} className={cls} style={left ? { left } : undefined} href={SOCIAL_HREF[n]} target="_blank" rel="noreferrer">{n}</a>
  ) : (
    <span key={n} className={cls} style={left ? { left } : undefined}>{n}</span>
  );

/** The Figma footer (208:1250, 1440×816), re-checked against Figma on 2026-09-08: full-bleed deep950, 1px tint line on top,
 *  headline 112/54, links at 622/644, legal at 742. No disclaimer line.
 *  v2 (2026-09-08, Saurabh: "the footer is not there yet"): keeps the Figma geometry and adds
 *  a Product link group (Jarvis · CTA) and the disclaimer line under the legal line.
 *  v3 (2026-09-08): the static dot image becomes FooterPulse (the orbit mark in pixels, pulsing in its own shape),
 *  the top corners are curved, and the frame shrinks. On the Jarvis page (`where`) a small "Where Jarvis lives today" block with the app door sits under the headline.
 *  Above 900px it is the exact frame,
 *  laid out at 1440 with Figma coordinates and scaled to the viewport. Below
 *  900px the same content stacks into a readable column. */
/** "Where Jarvis lives today" — the app door (Jarvis page only, `where`). Lines are locked copy: v5 strip title + the beta line. */
function Where({ href }: { href: string }) {
  return (
    <>
      <p className="k">Where Jarvis lives today.</p>
      <a className="tile" href={href} data-to={href.startsWith("#") ? "" : undefined}><span className="ic"><OrbitMark size={16} /></span><span><b>The Jarvis app</b><small>Jarvis is in invite-only beta.</small></span></a>
    </>
  );
}

export function FigmaFooter({ disclaimer = DISCLAIMER, product = ["Jarvis", "/jarvis"], cta = ["Try Jarvis", "/jarvis"], where = false }: { disclaimer?: string; product?: [string, string]; cta?: [string, string]; where?: boolean } = {}) {
  const wrap = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);

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

  return (
    <footer>
      {/* desktop: the exact frame */}
      <div className="frame-wrap" ref={wrap}>
        <div className="frame f-foot" ref={frame}>
          <div className="panelbg" />
          <FooterPulse className="abs" mark={240} />
          <h2 className="abs h1">On your side. Always.</h2>
          {where && <div className="abs where"><Where href={cta[1]} /></div>}
          <p className="abs lbl" style={{ left: 112 }}>Site</p>
          <Link className="abs lnk" style={{ left: 112 }} href={HREF.Home}>Home</Link>
          <Link className="abs lnk" style={{ left: 170 }} href={HREF.About}>About</Link>
          <Link className="abs lnk" style={{ left: 234 }} href={HREF.Contact}>Contact</Link>
          <p className="abs lbl" style={{ left: 408 }}>Socials</p>
          {social("Instagram", "abs lnk", 408)}
          <p className="abs lbl" style={{ left: 704 }}>Product</p>
          <Link className="abs lnk" style={{ left: 704 }} href={product[1]}>{product[0]}</Link>
          <a className="abs lnk" style={{ left: 704 + 64 }} href={cta[1]} data-to={cta[1].startsWith("#") ? "" : undefined}>{cta[0]}</a>
          <p className="abs legal">© 2026 OneStop. All rights reserved &nbsp;|&nbsp; <b>Privacy Policy &nbsp;|&nbsp; Terms of Service</b></p>
          <p className="abs disc">{disclaimer}</p>
        </div>
      </div>

      {/* phones and tablets: the same content, stacked */}
      <div className="mfoot">
        <div className="panel">
          <FooterPulse cell={8} mark={150} />
          <h2>On your side. Always.</h2>
          {where && <div className="where"><Where href={cta[1]} /></div>}
          <div className="cols">
            <div><p className="lbl">Site</p><div className="lnks">{SITE.map((n) => <Link key={n} href={HREF[n]}>{n}</Link>)}</div></div>
            <div><p className="lbl">Socials</p><div className="lnks">{SOCIAL.map((n) => social(n))}</div></div>
            <div><p className="lbl">Product</p><div className="lnks"><Link href={product[1]}>{product[0]}</Link><a href={cta[1]} data-to={cta[1].startsWith("#") ? "" : undefined}>{cta[0]}</a></div></div>
          </div>
          <p className="legal">© 2026 OneStop. All rights reserved<br /><b>Privacy Policy &nbsp;|&nbsp; Terms of Service</b></p>
          <p className="disc">{disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
