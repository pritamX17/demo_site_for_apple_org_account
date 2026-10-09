import { OrbitMark } from "@/components/jarvis/logos";

/* /start (2026-10-06, Saurabh: "illustrative SVG animation according to the brand guidelines", no AI photos).
   Three scenes in the brand's shape language (Guidelines §8: circles, openings, precise lines, quiet signal dots;
   §11: productive reveals 200–320ms, ambient sequences 500–900ms, no celebratory loops, every state reads when still).
   Each scene is one SVG, 400×500, content inside the central 400×400 so a square crop (phones) loses nothing.
   Animation is CSS in start.css, started by the parent's `.on` class (set by StartStory's IntersectionObserver),
   plays ONCE, and is skipped under prefers-reduced-motion. Every stroke carries pathLength=100 so one dash rule draws it.

   1 · five apps — five stroke rings (openings) scattered on a quiet dot field, each gets one signal dot.
   2 · nobody reads — five statements stacked; the attention ring reads the first one and stops; the rest stay muted.
   3 · JARVIS does — the five rings on one orbit, precise lines gather into the filled orbit mark, the dots turn aqua. */

export type Scene = "apps" | "nobody" | "jarvis";

const DOTS = (
  <pattern id="sa-dots" width="20" height="20" patternUnits="userSpaceOnUse">
    <circle cx="10" cy="10" r="1" fill="#002E51" opacity=".12" />
  </pattern>
);

// the five "openings": loose constellation, no two on one line
const APPS: [number, number][] = [
  [104, 150],
  [262, 118],
  [318, 262],
  [196, 236],
  [118, 322],
];

function Apps() {
  return (
    <svg className="sa sa-apps" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>{DOTS}</defs>
      <rect width="400" height="500" fill="url(#sa-dots)" />
      {APPS.map(([x, y], i) => (
        <g key={i} className="sa-app" style={{ ["--i" as string]: i }}>
          <circle className="draw" cx={x} cy={y} r="34" pathLength="100" />
          <circle className="sig" cx={x + 26} cy={y - 26} r="4.5" />
        </g>
      ))}
    </svg>
  );
}

function Nobody() {
  // five statements, a stack with a small offset; rows are hairlines
  const docs = [0, 1, 2, 3, 4];
  return (
    <svg className="sa sa-nobody" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>{DOTS}</defs>
      <rect width="400" height="500" fill="url(#sa-dots)" />
      {docs.map((i) => {
        const x = 92 + i * 6, y = 128 + i * 52;
        return (
          <g key={i} className={`sa-doc${i === 0 ? " first" : ""}`} style={{ ["--i" as string]: i }}>
            <rect className="draw box" x={x} y={y} width="216" height="44" rx="2" pathLength="100" />
            <line className="draw row" x1={x + 16} y1={y + 15} x2={x + 150} y2={y + 15} pathLength="100" />
            <line className="draw row" x1={x + 16} y1={y + 29} x2={x + 110} y2={y + 29} pathLength="100" />
          </g>
        );
      })}
      {/* the attention ring: reads the first statement, then stops there */}
      <circle className="sa-eye" cx="286" cy="150" r="22" pathLength="100" />
      <circle className="sa-eye-dot" cx="286" cy="150" r="3" />
    </svg>
  );
}

function Jarvis() {
  const cx = 200, cy = 250, R = 128;
  // five rings evenly on the orbit, starting top-left so the gap sits at the bottom-right
  const pts = [0, 1, 2, 3, 4].map((i) => {
    const a = (-150 + i * 72) * (Math.PI / 180);
    // rounded to 0.1 so server and client render identical attribute strings (no hydration mismatch)
    return [Math.round((cx + R * Math.cos(a)) * 10) / 10, Math.round((cy + R * Math.sin(a)) * 10) / 10] as [number, number];
  });
  return (
    <svg className="sa sa-jarvis" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>{DOTS}</defs>
      <rect width="400" height="500" fill="url(#sa-dots)" />
      <circle className="draw orbit" cx={cx} cy={cy} r={R} pathLength="100" />
      {pts.map(([x, y], i) => (
        <g key={i} className="sa-sat" style={{ ["--i" as string]: i }}>
          <line className="draw link" x1={x} y1={y} x2={cx} y2={cy} pathLength="100" />
          <circle className="draw" cx={x} cy={y} r="22" pathLength="100" />
          <circle className="sig" cx={x + 17} cy={y - 17} r="4" />
        </g>
      ))}
      {/* the filled orbit mark sits on a canvas disc so the lines end at its edge, not under it */}
      <circle className="sa-disc" cx={cx} cy={cy} r="54" />
      <foreignObject x={cx - 40} y={cy - 42.5} width="80" height="85">
        <div className="sa-mark"><OrbitMark size={80} /></div>
      </foreignObject>
    </svg>
  );
}

export function StoryArt({ scene }: { scene: Scene }) {
  if (scene === "apps") return <Apps />;
  if (scene === "nobody") return <Nobody />;
  return <Jarvis />;
}
