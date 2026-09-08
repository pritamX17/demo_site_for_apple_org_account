# Motion explorations — branch `explore/motion`

Live catalogue: `/lab` on this branch (not indexed, not linked from the site).
Every item is live in its own box with the library, where it would sit, and why.

## Stack decision

| Layer | Library | Owns | Size (gz) |
|---|---|---|---|
| Choreography | GSAP 3.15 (unchanged) | scroll scrubs, pins, SplitText, ScrambleText, dot fields, the footer pulse | already in |
| Pointer + state | **Motion 13** (`motion/react`) | springs, gestures, `layout`, `whileInView`, route transition | ~32 KB |
| Scroll feel | **Lenis 1.3** | inertia on wheel/trackpad, ticked by `gsap.ticker`; touch stays native | ~5 KB |
| Figures | **NumberFlow** (`@number-flow/react`) | odometer digits with width transitions + locales | ~7 KB |

Why not GSAP for everything: GSAP tweens restart when the pointer changes its
mind mid-move; a spring keeps momentum. Motion's `useSpring` + `useMotionValue`
are the right tool for magnetic / tilt / press, and its `layout` prop covers the
chat re-flow that a timeline cannot. Considered and passed on: anime.js v4
(overlaps GSAP), Rive (needs authored assets), three/OGL shader backgrounds
(the dot fields already own that role).

## Rules (the brand's restraint)

1. One ambient move per screen at most; everything else waits for the pointer.
2. Springs for pointer-driven motion, the brand curve `cubic-bezier(.2,.8,.2,1)` for scroll-driven.
3. Never two engines on one node: a Motion transform and a GSAP transform fight. Parents float (GSAP), children tilt (Motion). See `components/home/Jarvis.tsx` (`.hslot` > `Tilt.hcard`).
4. Phones get confirmations (ripple, lift), not flourishes (magnetic, tilt, spotlight, cursor need a fine pointer).
5. Reduced motion switches every item off except the progress hairline.

## The sixteen

| # | Item | Lib | Status | Where |
|---|---|---|---|---|
| 01 | Inertia scroll | Lenis | **Applied** | both pages |
| 02 | Magnetic CTA | Motion | **Applied** | hero, Jarvis section, close line, request-access ×2, nav pill |
| 03 | Press ripple + lift | CSS + delegate | **Applied** | every `.cta2 .pill .cta .subscribe` |
| 04 | Link underline exit/re-enter | CSS | **Applied** | every `.lnk`; footer gets a draw-in |
| 05 | 3D tilt + glare | Motion | **Applied** | the two floating "Handled by Jarvis" cards |
| 06 | Number roll | NumberFlow | **Applied** | the $5,000 on the receipt |
| 07 | Cursor spotlight on dark panels | CSS vars + delegate | **Applied** | every `.p56.on-dark` |
| 08 | Scroll-progress hairline | Motion `useScroll` | **Applied** | top edge |
| 09 | Chat bubbles on springs | Motion `AnimatePresence`+`layout` | Lab only | candidate: homepage Jarvis section, product phone screens |
| 10 | Clip-path photo reveal | Motion `whileInView` | Lab only | candidate: Moments, Idea photo |
| 11 | Route transition | Motion, `app/template.tsx` | **Applied** | every navigation |
| 12 | Velocity skew | Lenis velocity + spring | Lab only | candidate: section headlines, cap 3.5° |
| 13 | Listening breath on the orbit mark | CSS | **Applied** | app tile in the where-band |
| 14 | Staggered grid entrance | Motion variants | Lab only | candidate: six things, versus grid, moments |
| 15 | Cursor dot | Motion | Lab only, off by default | site-wide if adopted (not recommended) |
| 16 | CTA sheen | CSS | **Applied** | every dark primary button |

## Files

- `lib/motion.ts` — spring presets, brand ease, hover/reduced-motion guards
- `components/motion/SmoothScroll.tsx` — Lenis ↔ GSAP ticker; exposes `window.__lenis`
- `components/motion/MotionLayer.tsx` — mounts Lenis, progress hairline, ripple + spotlight delegates
- `components/motion/Magnetic.tsx`, `Tilt.tsx`, `NumberRoll.tsx`
- `app/template.tsx` — route transition
- `app/motion.css` — the CSS half (ripple, spotlight, lift, sheen, underline, breath, Lenis rules, reduced motion)
- `app/lab/` + `components/lab/Lab.tsx` — the catalogue
- `HomeMotion` anchors go through `lenis.scrollTo`; `HomeNav` pauses Lenis while the menu is open

## Review hub

`HUB_SLUG=onestop-site-motion HUB_TITLE="OneStop website — motion explorations" sh scripts/export-review.sh --publish`
publishes this branch beside the main site (`onestop-site` stays untouched).

## Open calls for Saurabh

- Adopt 09 (chat springs) on the homepage phone? It would replace the GSAP bubble tween.
- Adopt 10 (clip reveal) on Moments, on top of or instead of Ken Burns?
- 12 (velocity skew) and 15 (cursor dot): feel them on `/lab`, then decide. My recommendation: no to both.
- Lenis lerp 0.085 is the "weight" dial. 0.06 = heavier, 0.12 = lighter.
