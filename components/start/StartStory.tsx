"use client";

import { StoryArt, type Scene } from "./StoryArt";
import { useEffect, useRef, useState } from "react";

/* /start (2026-10-06, Saurabh): the three-line story, each line with its own photo.
   "Your money sits in five apps. / Nobody reads all of it. Every day. / JARVIS does."
   Desktop (≥901px): the lines stack on the left, each a tall step; the photo column on the right is sticky and
   crossfades to the line in view (IntersectionObserver, the middle 30% of the viewport). Phones: each line sits
   under its own square scene, no sticky. The scenes are brand SVG animations (StoryArt.tsx), 4:5 on desktop and
   cropped square on phones; they play once when their step gets `.on`. (The AI photos of 6 Oct were replaced the same day.) */

export type StoryLine = { id: string; scene: Scene; line: React.ReactNode };

export function StartStory({ lines }: { lines: StoryLine[] }) {
  const [on, setOn] = useState(0);
  // once a scene has played it stays drawn (the dash animation must not rewind when the step scrolls away).
  // No IntersectionObserver (very old in-app browsers): every scene draws at once rather than staying blank.
  const noIO = typeof window !== "undefined" && !("IntersectionObserver" in window);
  const [seen, setSeen] = useState<boolean[]>(() => lines.map((_, i) => i === 0 || noIO));
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return; // every scene is already marked played (see useState above)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.i);
            if (!Number.isNaN(i)) {
              setOn(i);
              setSeen((prev) => (prev[i] ? prev : prev.map((v, k) => v || k === i)));
            }
          }
        }
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="s-story">
      <div className="s-story-lines">
        {lines.map((l, i) => (
          <div
            className={`s-story-step${on === i ? " on" : ""}${seen[i] ? " played" : ""}`}
            key={l.id}
            data-i={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
          >
            {/* phone: the scene sits square above its line and plays when the step is in view */}
            <div className="s-story-mimg" data-r>
              <StoryArt scene={l.scene} />
            </div>
            <p className="s-line" data-r>{l.line}</p>
          </div>
        ))}
      </div>
      {/* desktop photo column: sticky, crossfades */}
      <div className="s-story-art" aria-hidden="true">
        <div className="s-story-frame">
          {lines.map((l, i) => (
            <div className={`s-story-img${on === i ? " on" : ""}${seen[i] ? " played" : ""}`} key={l.id}>
              <StoryArt scene={l.scene} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
