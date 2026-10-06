"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP, ScrollTrigger } from "@/lib/gsap";
import { Magnetic } from "@/components/motion/Magnetic";

/* Plain top bar (team feedback, 2026-10-01: the MENU button + full-screen panel is gone).
   Lockup at the Figma position (77,61), then the three pages as text links and one CTA, always visible.
   Transparent over the hero, white once scrolled. On phones the links sit in a short list under the bar. */
const PAGES: { key: PageKey; label: string; href: string }[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "jarvis", label: "Jarvis", href: "/jarvis" },
  { key: "movement", label: "The movement", href: "/movement" },
];
export type PageKey = "home" | "jarvis" | "movement";

export function HomeNav({ cta = "Try Jarvis", ctaHref = "/jarvis", page = "home", plain = false }: { cta?: string; ctaHref?: string; page?: PageKey | null; /** no hero under the bar: stay white from the top */ plain?: boolean } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      ScrollTrigger.create({ start: 80, end: "max", onToggle: (self) => setSolid(self.isActive) });
    },
    { scope: ref },
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = useCallback(() => setOpen(false), []);
  const links = PAGES.map((pg) => (
    <Link key={pg.key} href={pg.href} aria-current={pg.key === page ? "page" : undefined} onClick={close}>{pg.label}</Link>
  ));
  const button = (cls: string) =>
    ctaHref.startsWith("#") ? <a className={cls} href={ctaHref} data-to onClick={close}>{cta}</a> : <Link className={cls} href={ctaHref} onClick={close}>{cta}</Link>;

  return (
    <div ref={ref}>
      <nav className={`nav2${solid || plain ? " solid" : ""}${open ? " open" : ""}`} aria-label="Primary">
        <div className="in">
          <Link href="/" aria-label="OneStop AI home">
            <Image className="logo" src="/figma/nav-logo.svg" alt="OneStop AI" width={200} height={38} priority />
          </Link>
          <div className="right">
            <div className="pages">{links}</div>
            {/* TODO(launch): point at the live Jarvis product URL */}
            <Magnetic strength={0.22} reach={16}>{button("pill")}</Magnetic>
            <button className="menu" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="nav-drop" onClick={() => setOpen((o) => !o)}>
              <i />
            </button>
          </div>
        </div>
      </nav>
      {open && <button className="nav-veil" type="button" aria-label="Close menu" tabIndex={-1} onClick={close} />}
      <div className={`nav-drop${open ? " on" : ""}`} id="nav-drop" aria-hidden={!open}>
        {links}
        {button("cta2")}
      </div>
    </div>
  );
}
