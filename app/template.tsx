"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

/** Route transition (Next re-mounts a template on every navigation):
 *  the new page rises 14px and fades in over 550ms. No exit animation on
 *  purpose — a static export has no place to hold the old page. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: EASE_OUT }}>
      {children}
    </motion.div>
  );
}
