# OneStop website

The OneStop AI company site: the homepage and the Jarvis product page.
Next.js 16 (app router) · React 19 · GSAP 3.15 (`@gsap/react`). No Tailwind, no CSS framework.

## Routes

| Route | What | Code |
|---|---|---|
| `/` | Company homepage — "One companion. Every decision." | `app/page.tsx` · `app/home.css` · `components/home/*` |
| `/jarvis` | Jarvis product page — copy v5, word for word | `app/jarvis/page.tsx` · `app/jarvis/jarvis.css` · `components/jarvis/*` |

Both routes share the nav, footer, tokens and rhythm classes from `app/home.css`
(everything scoped under `.hp`; the Jarvis page adds `.jp`). `app/mobile.css` is the
phone layer for both pages (≤900px). `app/globals.css` only holds fonts and base styles.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also runs the type check)
npm run lint
```

Team review link: `sh scripts/export-review.sh --publish` builds a static export with
`basePath /onestop-share/onestop-site`, rewrites the absolute `/img` and `/figma` paths, and
publishes it to the review hub at https://saurabh-labofone.github.io/onestop-share/onestop-site/
(needs the `~/onestop-site` staging repo). Re-run to update the same link.

Optional: `JARVIS_EXPORT=1 npm run build` writes a static export to `.next-export/`
with `basePath /Jarvis` (for the `canvasxai/landing-pages` repo). The Jarvis page now
lives at `/jarvis`, so revisit that `basePath` before the next export.

## Structure

```
app/
  layout.tsx          fonts (Manrope, JetBrains Mono, Sora), metadata, noscript guard
  globals.css         base only
  home.css            tokens + every homepage rule (.hp), incl. nav, footer, phone mock
  mobile.css          phone layer for / and /jarvis
  page.tsx            /
  jarvis/page.tsx     /jarvis
  jarvis/jarvis.css   Jarvis-only rules (.jp)
components/
  home/               HomeNav, Hero, Reason, Build, Jarvis + Phone, NextUp, Built,
                      CloseLine, FigmaFooter (+ FooterPulse, the orbit mark in pixels), HomeMotion, MobileCta, useDotField
  jarvis/             JarvisHero, Screen (app screens), Idea, Proof, Versus, Different,
                      Moments, Quiet, Gate, chat.ts, logos.tsx (orbit mark, OpenAI, Claude, WhatsApp)
lib/
  gsap.ts             registers the GSAP plugins once
  dotfield.ts         the dot-matrix canvas
public/
  figma/              assets exported from the Figma file (nav logo, phone frame, icons, textures)
  img/                photos (brand-book set; provisional on /jarvis)
```

## Rules of the house

- **Copy is locked.** Homepage copy = the team's v2 copy; Jarvis copy = `lp-access-story-copy-v5`.
  Do not invent lines. The gate form has no confirmation sentence for that reason.
- **Brand.** Open Water v2 palette, Manrope, the orbit mark (`components/jarvis/logos.tsx`).
  CTA = Tide on light, Aqua on dark. Never coral.
- **Photos.** Human anchored in one half of the frame, sky = copy space, never cover or cut a face.
- **Motion.** All reveals are `fromTo` against a CSS `opacity: 0` guard (`[data-r]`, `[data-x]` …).
  The `<noscript>` block in the layout restores them without JS.

## Before launch

Search the code for these tags:

- `TODO(launch)` — email forms and the gate form need a backend; footer hrefs; Try Jarvis URL.
- `TODO(copy)` — the gate needs an approved confirmation line.
- `TODO(counsel)` — the shared-success line in "How we're built".
- `TODO(compliance)` — real tickers in the phone mock.
- `TODO(figma)` — only the Portfolio app screen was measured from Figma; the others are extensions.
