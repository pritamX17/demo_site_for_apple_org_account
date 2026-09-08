"use client";

import { useRef } from "react";
import NumberFlow, { type Format } from "@number-flow/react";
import { useInView } from "motion/react";

/** A figure that rolls to its value the first time it scrolls into view
 *  (NumberFlow: per-digit odometer, width-aware, honours reduced motion).
 *  `from` is the starting value; 0 gives the longest, most visible roll. */
export function NumberRoll({
  value,
  from = 0,
  prefix,
  suffix,
  format,
  locales,
  className,
  replayKey,
}: {
  value: number;
  from?: number;
  prefix?: string;
  suffix?: string;
  format?: Format;
  locales?: string;
  className?: string;
  /** change to re-run the roll (lab replay) */
  replayKey?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  return (
    <span ref={ref} className={className}>
      <NumberFlow
        key={replayKey}
        value={inView ? value : from}
        prefix={prefix}
        suffix={suffix}
        format={format}
        locales={locales}
        transformTiming={{ duration: 800, easing: "cubic-bezier(.2,.8,.2,1)" }}
        spinTiming={{ duration: 1100, easing: "cubic-bezier(.2,.8,.2,1)" }}
        opacityTiming={{ duration: 300, easing: "ease-out" }}
      />
    </span>
  );
}
