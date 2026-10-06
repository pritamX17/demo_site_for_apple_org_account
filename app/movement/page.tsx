import type { Metadata } from "next";
import "../home.css";
import "./movement.css";
import "../motion.css";
import "../mobile.css";
import { HomeMotion } from "@/components/home/HomeMotion";
import { MotionLayer } from "@/components/motion/MotionLayer";
import { HomeNav } from "@/components/home/HomeNav";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { MobileCta } from "@/components/home/MobileCta";
import { MoveHero } from "@/components/movement/MoveHero";
import { Building } from "@/components/movement/Building";
import { Premise } from "@/components/movement/Premise";
import { Decisions } from "@/components/movement/Decisions";
import { Doors } from "@/components/movement/Doors";
import { Door } from "@/components/movement/Door";
import { MoveClose } from "@/components/movement/MoveClose";

export const metadata: Metadata = {
  title: "The movement — own what AI does for you",
  description:
    "AI should work for the person who uses it. OneStop AI builds products for the most valuable decisions in your life. Join the movement and tell us where AI would help you most.",
  openGraph: {
    title: "The movement — own what AI does for you",
    description: "OneStop AI builds products for the most valuable decisions in your life. Tell us where AI would help you most.",
    type: "website",
  },
};

/** The movement page — the third page of the site (team call, week of 2026-09-15; plan in website/movement-page/PLAN.md).
 *  Shares the nav, footer, tokens and rhythm classes with the company homepage (.hp), scoped additions under .mp.
 *  Round 2 (team lead's ten points, 2026-10-01): problem first, then the products (Jarvis, health, education), then why a movement,
 *  the decision reads, the doors and the form. The "what happens next" loop is gone: no promise that every idea is read or built.
 *  Copy = DRAFT for the team; the first three beats are the approved "How we're built" lines. */
export default function MovementPage() {
  return (
    <div className="hp mp">
      <HomeMotion />
      <MotionLayer />
      <HomeNav cta="Join the movement" ctaHref="#door" page="movement" />
      <main>
        <MoveHero />
        <Building />
        <Premise />
        <Decisions />
        <Doors />
        <Door />
        <MoveClose />
      </main>
      <FigmaFooter cta={["Join the movement", "#door"]} />
      <MobileCta label="Join the movement" href="#door" hideAt="#door" />
    </div>
  );
}
