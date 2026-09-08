import type { Metadata } from "next";
import "./home.css";
import "./mobile.css";
import { HomeMotion } from "@/components/home/HomeMotion";
import { HomeNav } from "@/components/home/HomeNav";
import { Hero } from "@/components/home/Hero";
import { Reason } from "@/components/home/Reason";
import { Build } from "@/components/home/Build";
import { Jarvis } from "@/components/home/Jarvis";
import { NextUp } from "@/components/home/NextUp";
import { Built } from "@/components/home/Built";
import { CloseLine } from "@/components/home/CloseLine";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { MobileCta } from "@/components/home/MobileCta";

export const metadata: Metadata = {
  title: { absolute: "OneStop AI — One companion. Every decision." },
  description:
    "OneStop AI builds AI companions for the decisions you carry, and they answer only to you. The first, Jarvis, is live for money. More of your life is next.",
  openGraph: {
    title: "OneStop AI — One companion. Every decision.",
    description:
      "AI companions for the decisions you carry. Money is live with Jarvis. More of your life is next.",
    type: "website",
  },
};

/** OneStop company homepage — production port of website/homepage/options/14-v2-copy.
 *  Copy = HOMEPAGE-SIMPLER.md V2 with the team's approved headlines (2026-09-07). */
export default function HomePage() {
  return (
    <div className="hp">
      <HomeMotion />
      <HomeNav />
      <main>
        <Hero />
        <Reason />
        <Build />
        <Jarvis />
        <NextUp />
        <Built />
        <CloseLine />
      </main>
      <FigmaFooter />
      <MobileCta label="Try Jarvis — Live now" href="/jarvis" hideAt="#close" />
    </div>
  );
}
