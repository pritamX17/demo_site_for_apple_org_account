"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP, ScrollTrigger } from "@/lib/gsap";

/** Phone-only sticky CTA (≤900px, styled in app/mobile.css). Slides in after
 *  the first viewport and slides out once `hideAt` — the section that holds
 *  the real CTA — is in view. */
export function MobileCta({ label, href, hideAt }: { label: string; href: string; hideAt: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      ScrollTrigger.create({ start: () => window.innerHeight * 0.7, end: "max", toggleClass: { targets: el, className: "on" } });
      // No `scope` here: a scoped context would resolve `hideAt` inside this div.
      const hide = document.querySelector(hideAt);
      if (hide) ScrollTrigger.create({ trigger: hide, start: "top 85%", end: "max", toggleClass: { targets: el, className: "off" } });
    },
    { dependencies: [hideAt] },
  );

  const anchor = href.startsWith("#");
  return (
    <div className="mcta" ref={ref}>
      {anchor ? (
        <a className="cta2" href={href} data-to>{label}</a>
      ) : (
        <Link className="cta2" href={href}>{label}</Link>
      )}
    </div>
  );
}
