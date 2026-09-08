"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** The footer's living dot-matrix: a pixel waveform that pulses outward from the
 *  OneStop lockup on both sides, with a talking cadence (bursts and pauses).
 *  Pure canvas, driven by the GSAP ticker only while the footer is on screen.
 *  Brightness is quantised to three steps so it reads as pixels, not a glow. */
export function FooterPulse({ className = "", cell = 14, logo = 280 }: { className?: string; cell?: number; logo?: number }) {
  const box = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = box.current, c = cv.current;
    if (!el || !c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, dpr = 1, cols = 0, rows = 0;
    const dot = Math.round(cell * 0.42);

    const resize = () => {
      W = el.clientWidth; H = el.clientHeight;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(W / cell); rows = Math.floor(H / cell);
    };
    const hash = (n: number) => { const h = Math.sin(n * 127.1 + 311.7) * 43758.5453; return h - Math.floor(h); };
    // a voice-like envelope: phrases, syllables, pauses
    const voice = (t: number) => {
      const phrase = 0.5 + 0.5 * Math.sin(t * 0.37 + 0.8);
      const syl = 0.45 + 0.3 * Math.sin(t * 2.1) + 0.2 * Math.sin(t * 3.7 + 1.3) + 0.15 * Math.sin(t * 5.3 + 2.1);
      return Math.max(0.16, Math.min(1, syl * (0.35 + 0.65 * phrase * phrase)));
    };
    const LEVELS = ["rgba(0,90,158,.55)", "rgba(0,160,204,.85)", "rgba(0,208,255,1)"];

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const ox = (W - cols * cell) / 2 + cell / 2, oy = (H - rows * cell) / 2 + cell / 2;
      const cx = (cols - 1) / 2, my = (rows - 1) / 2;
      const v = voice(t);
      const half = cols / 2;
      // keep a clear patch behind the lockup
      const lw = logo / cell / 2 + 1.5, lh = (logo * 0.19) / cell / 2 + 1.5;
      for (let i = 0; i < cols; i++) {
        const d = Math.abs(i - cx);
        const att = Math.max(0, 1 - d / half);
        const wave = 0.5 + 0.5 * Math.sin(d * 0.42 - t * 4.2);
        const grain = 0.65 + 0.35 * hash(d * 7 + Math.floor(t * 2.5));
        const hh = Math.min(my, (0.9 + (rows * 0.42) * v * wave * att * att) * grain);
        for (let j = 0; j < rows; j++) {
          const dy = Math.abs(j - my);
          if (d < lw && dy < lh) continue;
          const x = ox + i * cell, y = oy + j * cell;
          if (dy <= hh) {
            const q = Math.min(2, Math.floor((1 - dy / (hh + 0.001)) * 3));
            ctx.fillStyle = LEVELS[q];
            const s = dot + q;
            ctx.fillRect(x - s / 2, y - s / 2, s, s);
          } else {
            ctx.fillStyle = "rgba(0,208,255,.11)";
            ctx.fillRect(x - dot / 2 + 1, y - dot / 2 + 1, dot - 2, dot - 2);
          }
        }
      }
    };

    resize();
    const tick = (time: number) => draw(time);
    if (reduced) {
      draw(2.2);
    } else {
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onToggle: (s) => (s.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
      });
      const ro = new ResizeObserver(() => { resize(); draw(gsap.ticker.time); });
      ro.observe(el);
      return () => { st.kill(); gsap.ticker.remove(tick); ro.disconnect(); };
    }
    const ro = new ResizeObserver(() => { resize(); draw(2.2); });
    ro.observe(el);
    return () => ro.disconnect();
  }, [cell, logo]);

  return (
    <div className={`pulse ${className}`} ref={box} aria-hidden="true">
      <canvas ref={cv} />
      <Image className="biglogo" src="/figma/nav-logo.svg" alt="" width={logo} height={Math.round(logo * 0.189)} />
    </div>
  );
}
