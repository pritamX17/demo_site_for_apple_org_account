"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, reveal } from "@/lib/gsap-lite";
import { WaIcon } from "./WaIcon";

/* /start motion + the WhatsApp link.
   - every a[data-wa] gets the wa.me link with the ad code (page · a · utm_content) in the prefilled message
   - the generic [data-r] reveals (the same tween HomeMotion runs on the other pages; /start does not mount HomeMotion
     so its bundle carries only gsap core + ScrollTrigger — see lib/gsap-lite.ts). The hero copy uses [data-r0], a
     CSS entrance in start.css, so the headline paints before any JS runs.
   - the chat bubbles pop in once the phone is in view
   - the FAQ <summary> mirrors its <details> open state as aria-expanded
   - the phone-only sticky bar (.mcta, styled in mobile.css) shows after the hero, steps aside while the in-page
     button in "how it starts" is on screen (.off2), and hides at the close (.off) */
export const WA_NUMBER = "918755520499"; // the JARVIS WhatsApp number (Saurabh, 2026-10-06), digits only with the country code

export function StartMotion() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const ref = ["start", q.get("a") || "", q.get("utm_content") || ""].filter(Boolean).join("-");
    const text = `Hi JARVIS 👋 I'd like to start. (${ref})`;
    const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    document.querySelectorAll<HTMLAnchorElement>("a[data-wa]").forEach((a) => {
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener";
    });
  }, []);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLDetailsElement>(".sp .s-qs details"));
    const sync = () => items.forEach((d) => d.querySelector("summary")?.setAttribute("aria-expanded", String(d.open)));
    sync();
    items.forEach((d) => d.addEventListener("toggle", sync));
    return () => items.forEach((d) => d.removeEventListener("toggle", sync));
  }, []);

  useGSAP(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // the same reveal as the other pages (lib/gsap-lite reveal(): first pixel in view, 280 ms, once; reduced motion = final state).
    // Saurabh's recording, 6 Oct: the old 800 ms from "top 85%" left lines half-faded while he scrolled.
    reveal(".sp [data-r]");
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    const bubs = gsap.utils.toArray<HTMLElement>(".sp [data-bub]");
    if (reduced) gsap.set(bubs, { opacity: 1 });
    else gsap.fromTo(bubs, { opacity: 0, y: 14, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.28, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: ".sp .phone", start: "top 90%", once: true } });

    const bar = ref.current;
    if (!bar) return;
    ScrollTrigger.create({ start: () => window.innerHeight * 0.7, end: "max", toggleClass: { targets: bar, className: "on" } });
    const hide = document.querySelector("#close");
    if (hide) ScrollTrigger.create({ trigger: hide, start: "top 85%", end: "max", toggleClass: { targets: bar, className: "off" } });
    const how = document.querySelector(".sp .s-how-cta");
    if (how) ScrollTrigger.create({ trigger: how, start: "top 96%", end: "bottom 10%", toggleClass: { targets: bar, className: "off2" } });
  });

  return (
    <div className="mcta" ref={ref}>
      <a className="cta2" data-wa href="#"><WaIcon />Chat with JARVIS on WhatsApp</a>
    </div>
  );
}
