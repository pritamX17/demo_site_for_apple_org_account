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
import { Premise } from "@/components/movement/Premise";
import { Doors } from "@/components/movement/Doors";
import { Door } from "@/components/movement/Door";
import { Loop } from "@/components/movement/Loop";
import { MoveClose } from "@/components/movement/MoveClose";

export const metadata: Metadata = {
  title: "The movement — own what AI makes for you",
  description:
    "OneStop is built with the people it answers to. Send an idea, a problem or a concern, and help decide what a companion on your side does next.",
  openGraph: {
    title: "The movement — own what AI makes for you",
    description: "Built with the people it answers to. Send an idea, a problem or a concern.",
    type: "website",
  },
};

const LINKS: [string, string, string?][] = [
  ["Why a movement", "#why"],
  ["How it works", "#doors"],
  ["Send an idea", "#door"],
  ["What happens next", "#loop"],
];

/** The movement page — the third page of the site (team call, week of 2026-09-15; plan in website/movement-page/PLAN.md).
 *  Shares the nav, footer, tokens and rhythm classes with the company homepage (.hp), scoped additions under .mp.
 *  Copy = DRAFT for the team (PLAN.md §4); the three beats and the counsel line are the approved "How we're built" lines. */
export default function MovementPage() {
  return (
    <div className="hp mp">
      <HomeMotion />
      <MotionLayer />
      <HomeNav cta="Send an idea" ctaHref="#door" links={LINKS} page="movement" />
      <main>
        <MoveHero />
        <Premise />
        <Doors />
        <Door />
        <Loop />
        <MoveClose />
      </main>
      <FigmaFooter cta={["Send an idea", "#door"]} />
      <MobileCta label="Send an idea" href="#door" hideAt="#door" />
    </div>
  );
}
