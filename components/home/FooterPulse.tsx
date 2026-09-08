"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { inOrbitMark } from "@/lib/dotfield";

/** The footer's living dot-matrix: the orbit mark itself, drawn in pixels, breathing.
 *  A wave travels outward through the mark's dots, and echoes of the mark's own
 *  silhouette expand out of it and fade — so the pulse keeps the shape of the logo.
 *  Pure canvas, driven by the GSAP ticker only while the footer is on screen.
 *  Brightness is quantised to three steps so it reads as pixels, not a glow. */
export function FooterPulse({ className = "", cell = 10, mark = 300 }: { className?: string; cell?: number; mark?: number }) {
  const box = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = box.current, c = cv.current;
    if (!el || !c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, dpr = 1, cols = 0, rows = 0;
    const dot = Math.max(3, Math.round(cell * 0.4));
    // inOrbitMark works in units of the mark's box; the ring's outer diameter is .666 of the box
    const S = mark / 0.666;

    const resize = () => {
      W = el.clientWidth; H = el.clientHeight;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(W / cell); rows = Math.floor(H / cell);
    };
    const frac = (n: number) => n - Math.floor(n);
    const LEVELS = ["rgba(0,90,158,.7)", "rgba(0,160,204,.9)", "rgba(0,208,255,1)"];
    const ECHO = ["rgba(0,90,158,.28)", "rgba(0,160,204,.5)", "rgba(0,208,255,.8)"];
    // thin outline of the mark, scaled by s
    const inShell = (px: number, py: number, s: number) => inOrbitMark(px / s, py / s) && !inOrbitMark(px / (s * 0.9), py / (s * 0.9));

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const ox = (W - cols * cell) / 2 + cell / 2, oy = (H - rows * cell) / 2 + cell / 2;
      const cx = (cols - 1) / 2, cy = (rows - 1) / 2;
      // a breath: the mark's wave swells and settles
      const breath = 0.55 + 0.45 * Math.sin(t * 1.6);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const px = ((i - cx) * cell) / S, py = ((j - cy) * cell) / S;
          const x = ox + i * cell, y = oy + j * cell;
          const r = Math.hypot(px, py);
          if (inOrbitMark(px, py)) {
            // wave travelling outward through the ring
            const w = 0.5 + 0.5 * Math.sin(r * 34 - t * 5);
            const q = Math.min(2, Math.floor((0.35 + 0.65 * w * breath) * 3));
            ctx.fillStyle = LEVELS[q];
            const s = dot + q * 1.5;
            ctx.fillRect(x - s / 2, y - s / 2, s, s);
            continue;
          }
          // echoes: three expanding outlines of the mark, fading as they grow
          let lvl = -1;
          for (let k = 0; k < 3; k++) {
            const f = frac(t * 0.28 + k / 3);
            const sc = 1.08 + f * 2.2;
            if (r < 0.333 * sc && r > 0.15 && inShell(px, py, sc)) {
              const q = Math.min(2, Math.floor((1 - f) * 3));
              lvl = Math.max(lvl, q);
            }
          }
          if (lvl >= 0) {
            ctx.fillStyle = ECHO[lvl];
            ctx.fillRect(x - dot / 2, y - dot / 2, dot, dot);
          } else {
            ctx.fillStyle = "rgba(0,208,255,.1)";
            ctx.fillRect(x - dot / 2 + 1, y - dot / 2 + 1, dot - 2, dot - 2);
          }
        }
      }
    };

    resize();
    const tick = (time: number) => draw(time);
    if (reduced) {
      draw(1.2);
      const ro = new ResizeObserver(() => { resize(); draw(1.2); });
      ro.observe(el);
      return () => ro.disconnect();
    }
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onToggle: (s) => (s.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
    });
    const ro = new ResizeObserver(() => { resize(); draw(gsap.ticker.time); });
    ro.observe(el);
    return () => { st.kill(); gsap.ticker.remove(tick); ro.disconnect(); };
  }, [cell, mark]);

  return (
    <div className={`pulse ${className}`} ref={box} aria-hidden="true">
      <canvas ref={cv} />
    </div>
  );
}
