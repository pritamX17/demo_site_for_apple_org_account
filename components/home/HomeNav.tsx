"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

/* The Figma nav (212:1248): lockup at (77,61), CTA pill + MENU (two 34×2 bars) at the right.
   Transparent over the hero, glass once scrolled. MENU opens a full deep950 panel (clip-path circle from the button). */
const LINKS: [string, string, string?][] = [
  ["Why we exist", "#coo"],
  ["Money · Jarvis", "/jarvis", "Live now"],
  ["What’s next", "#next"],
  ["About", "#"], // TODO(launch): About page
];

export function HomeNav({ cta = "Try Jarvis", ctaHref = "/jarvis", links = LINKS }: { cta?: string; ctaHref?: string; links?: [string, string, string?][] } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      ScrollTrigger.create({ start: 80, end: "max", onToggle: (self) => setSolid(self.isActive) });
    },
    { scope: ref },
  );

  useGSAP(
    () => {
      const p = panel.current;
      if (!p) return;
      const r = Math.hypot(window.innerWidth, window.innerHeight);
      const at = window.innerWidth <= 900 ? "calc(100% - 48px) 48px" : "calc(100% - 120px) 80px";
      gsap.to(p, {
        clipPath: open ? `circle(${r}px at ${at})` : `circle(0px at ${at})`,
        duration: open ? 0.8 : 0.5,
        ease: open ? "power3.inOut" : "power2.in",
      });
      if (open) {
        gsap.fromTo(
          p.querySelectorAll(".links a, .side > *"),
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.05, ease: "power3.out", delay: 0.25 },
        );
      }
    },
    { dependencies: [open], scope: ref },
  );

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <div ref={ref}>
      <nav className={`nav2${solid ? " solid" : ""}${open ? " open" : ""}`} aria-label="Primary">
        <div className="in">
          <Link href="/" aria-label="OneStop AI home">
            <Image className="logo" src="/figma/nav-logo.svg" alt="OneStop AI" width={200} height={38} priority />
          </Link>
          <div className="right">
            {/* TODO(launch): point at the live Jarvis product URL */}
            {ctaHref.startsWith("#") ? <a className="pill" href={ctaHref} data-to>{cta}</a> : <Link className="pill" href={ctaHref}>{cta}</Link>}
            <button className="menu" type="button" aria-expanded={open} aria-controls="menu-panel" onClick={() => setOpen((o) => !o)}>
              Menu <i />
            </button>
          </div>
        </div>
      </nav>
      <div ref={panel} className={`menu-panel${open ? " on" : ""}`} id="menu-panel" aria-hidden={!open}>
        <div className="dmn" /><div className="fade" /><div className="grain" />
        <div className="in">
          <div className="links">
            {links.map(([label, href, tag]) =>
              href.startsWith("#") ? (
                <a key={label} href={href} data-to onClick={close}>{label}{tag && <small>{tag}</small>}</a>
              ) : (
                <Link key={label} href={href} onClick={close}>{label}{tag && <small>{tag}</small>}</Link>
              ),
            )}
          </div>
          <div className="side">
            <p className="k">OneStop AI</p>
            <p>One companion. Every decision.</p>
            {ctaHref.startsWith("#") ? <a className="cta" href={ctaHref} data-to onClick={close}>{cta}</a> : <Link className="cta" href={ctaHref} onClick={close}>{cta}</Link>}
            <p className="disc">Jarvis provides education and information, not financial advice. Jarvis does not sell financial products or recommend securities.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
