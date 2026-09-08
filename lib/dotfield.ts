/* DotField — the brand's dot-matrix as a living system.
   One field = N dots. Each dot has a place in every FORMATION (scatter, clouds, ring, swarm, the orbit mark).
   progress(p) moves every dot between formation floor(p) and floor(p)+1 with an ease.
   Dots wander a little, twinkle a little, and step away from the pointer.
   Formations are sorted by angle around their centroid so morphs travel short, calm paths.
   Ported from website/homepage/shared/dotfield.js (2026-09-07). */

export type Pt = { x: number; y: number };
export type Box = { x: number; y: number; w: number; h: number };

const TAU = Math.PI * 2;

function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
function hash(x: number, y: number, s: number) {
  const h = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453;
  return h - Math.floor(h);
}
function noise(x: number, y: number, s: number) {
  const xi = Math.floor(x),
    yi = Math.floor(y),
    xf = x - xi,
    yf = y - yi;
  const a = hash(xi, yi, s),
    b = hash(xi + 1, yi, s),
    c = hash(xi, yi + 1, s),
    d = hash(xi + 1, yi + 1, s);
  const u = xf * xf * (3 - 2 * xf),
    v = yf * yf * (3 - 2 * yf);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

// Orbit mark geometry in units of the box size R: outer .333, inner .225, bites r .193 at x = ±.435
const M = { Ro: 0.333, Ri: 0.225, rb: 0.193, bx: 0.435 };
export function inOrbitMark(px: number, py: number) {
  const d = Math.hypot(px, py);
  if (d > M.Ro || d < M.Ri) return false;
  if (Math.hypot(px - M.bx, py) < M.rb) return false;
  if (Math.hypot(px + M.bx, py) < M.rb) return false;
  return true;
}

function resample(pts: Pt[], n: number, r: () => number, j = 0): Pt[] {
  const out: Pt[] = [];
  if (!pts.length) {
    for (let i = 0; i < n; i++) out.push({ x: 0, y: 0 });
    return out;
  }
  for (let i = 0; i < n; i++) {
    const p = pts[Math.floor(r() * pts.length)];
    out.push({ x: p.x + (r() - 0.5) * j, y: p.y + (r() - 0.5) * j });
  }
  return out;
}

export function sortByAngle(pts: Pt[], cx?: number, cy?: number): Pt[] {
  let ox = cx ?? 0,
    oy = cy ?? 0;
  if (cx == null) {
    ox = 0;
    oy = 0;
    for (const p of pts) {
      ox += p.x;
      oy += p.y;
    }
    ox /= pts.length;
    oy /= pts.length;
  }
  return pts
    .slice()
    .sort(
      (a, b) => Math.atan2(a.y - oy, a.x - ox) - Math.atan2(b.y - oy, b.x - ox),
    );
}

export const DotForms = {
  scatter(n: number, box: Box, seed: number): Pt[] {
    const r = rng(seed);
    const o: Pt[] = [];
    for (let i = 0; i < n; i++)
      o.push({ x: box.x + r() * box.w, y: box.y + r() * box.h });
    return o;
  },
  // blocky cloud silhouettes on the 7px grid, like the Figma dot-matrix canvas
  clouds(n: number, box: Box, seed: number, cell = 42): Pt[] {
    const r = rng(seed);
    const pts: Pt[] = [];
    for (let y = box.y; y < box.y + box.h; y += 7)
      for (let x = box.x; x < box.x + box.w; x += 7) {
        const qx = Math.floor(x / cell),
          qy = Math.floor(y / cell);
        const v =
          noise(qx * 0.9, qy * 0.9, seed) * 0.6 +
          noise(qx * 2.1, qy * 2.1, seed + 3) * 0.4;
        if (v > 0.58) pts.push({ x, y });
      }
    return resample(pts, n, r, 2);
  },
  // the orbit mark: R is the box size (outer radius = .333 R). jitter in units of R
  mark(
    n: number,
    cx: number,
    cy: number,
    R: number,
    seed: number,
    jitter = 0,
  ): Pt[] {
    const r = rng(seed);
    const pts: Pt[] = [];
    const step = Math.max(2.5, (R * 0.7) / Math.sqrt(n * 2.4));
    for (let y = -R * 0.34; y <= R * 0.34; y += step)
      for (let x = -R * 0.34; x <= R * 0.34; x += step)
        if (inOrbitMark(x / R, y / R)) pts.push({ x: cx + x, y: cy + y });
    const out = resample(pts, n, r, step * 0.8);
    const j = jitter * R;
    if (j)
      for (const p of out) {
        const a = r() * TAU,
          d = r() * j;
        p.x += Math.cos(a) * d;
        p.y += Math.sin(a) * d;
      }
    return out;
  },
  ring(
    n: number,
    cx: number,
    cy: number,
    rad: number,
    th: number,
    seed: number,
  ): Pt[] {
    const r = rng(seed);
    const o: Pt[] = [];
    for (let i = 0; i < n; i++) {
      const a = r() * TAU,
        d = rad - th / 2 + r() * th;
      o.push({ x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d });
    }
    return o;
  },
  swarm(n: number, cx: number, cy: number, rad: number, seed: number): Pt[] {
    const r = rng(seed);
    const o: Pt[] = [];
    for (let i = 0; i < n; i++) {
      const u = Math.max(1e-6, r()),
        v = r();
      const g = Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
      const a = r() * TAU,
        d = Math.abs(g) * rad * 0.5;
      o.push({ x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d });
    }
    return o;
  },
  sortByAngle,
};

export type DotFieldOptions = {
  n?: number;
  color?: string; // "r,g,b"
  radius?: number;
  wander?: number;
  alpha?: number;
  mouse?: number;
  mouseTarget?: HTMLElement | null;
  seed?: number;
};

export class DotField {
  cv: HTMLCanvasElement;
  n: number;
  color: string;
  rad: number;
  wander: number;
  alpha: number;
  mouseR: number;
  p = 0;
  forms: Pt[][] = [];
  mx = -9999;
  my = -9999;
  running = false;
  W = 0;
  H = 0;
  g: CanvasRenderingContext2D | null = null;
  base: Float32Array;
  private raf = 0;
  private offMouse: (() => void) | null = null;

  constructor(cv: HTMLCanvasElement, o: DotFieldOptions = {}) {
    this.cv = cv;
    this.n = o.n ?? 1200;
    this.color = o.color ?? "0,208,255";
    this.rad = o.radius ?? 1.5;
    this.wander = o.wander ?? 1;
    this.alpha = o.alpha ?? 0.85;
    this.mouseR = o.mouse ?? 0;
    this.base = new Float32Array(this.n);
    const r = rng(o.seed ?? 3);
    for (let i = 0; i < this.n; i++) this.base[i] = 0.45 + 0.55 * r();
    this.resize();
    if (this.mouseR) {
      const target = o.mouseTarget ?? cv.parentElement;
      if (target) {
        const on = (e: PointerEvent) => {
          const b = cv.getBoundingClientRect();
          this.mx = e.clientX - b.left;
          this.my = e.clientY - b.top;
        };
        const off = () => {
          this.mx = -9999;
          this.my = -9999;
        };
        target.addEventListener("pointermove", on);
        target.addEventListener("pointerleave", off);
        this.offMouse = () => {
          target.removeEventListener("pointermove", on);
          target.removeEventListener("pointerleave", off);
        };
      }
    }
  }
  resize() {
    const cv = this.cv,
      dpr = Math.min(2, window.devicePixelRatio || 1);
    this.W = cv.clientWidth;
    this.H = cv.clientHeight;
    cv.width = this.W * dpr;
    cv.height = this.H * dpr;
    this.g = cv.getContext("2d");
    this.g?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  setForms(list: Pt[][], cx?: number, cy?: number) {
    this.forms = list.map((f) => sortByAngle(f, cx, cy));
    return this;
  }
  progress(p: number) {
    this.p = p;
    return this;
  }
  render(t: number) {
    const g = this.g,
      n = this.n,
      f = this.forms;
    if (!g || !f.length) return;
    g.clearRect(0, 0, this.W, this.H);
    const k = Math.max(0, Math.min(f.length - 1, this.p)),
      i = Math.floor(k),
      u = k - i,
      A = f[i],
      B = f[Math.min(i + 1, f.length - 1)];
    const e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
    const w = this.wander,
      mr = this.mouseR;
    for (let j = 0; j < n; j++) {
      let x = A[j].x + (B[j].x - A[j].x) * e,
        y = A[j].y + (B[j].y - A[j].y) * e;
      if (w) {
        x += Math.sin(t * 0.00045 + j * 0.7) * w * 2.2;
        y += Math.cos(t * 0.00038 + j * 1.3) * w * 2.2;
      }
      if (mr) {
        const dx = x - this.mx,
          dy = y - this.my,
          d = Math.hypot(dx, dy);
        if (d < mr && d > 0) {
          const push = (mr - d) / mr;
          x += (dx / d) * push * push * 38;
          y += (dy / d) * push * push * 38;
        }
      }
      const a =
        this.alpha * this.base[j] * (0.82 + 0.18 * Math.sin(t * 0.0016 + j * 0.9));
      g.fillStyle = "rgba(" + this.color + "," + a.toFixed(3) + ")";
      g.beginPath();
      g.arc(x, y, this.rad, 0, TAU);
      g.fill();
    }
  }
  start() {
    if (this.running) return;
    this.running = true;
    const loop = (t: number) => {
      if (!this.running) return;
      this.render(t);
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }
  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }
  still() {
    this.render(performance.now());
  }
  destroy() {
    this.stop();
    this.offMouse?.();
    this.forms = [];
  }
}
