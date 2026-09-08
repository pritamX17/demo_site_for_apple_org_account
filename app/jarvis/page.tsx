import type { Metadata } from "next";
import "../home.css";
import "./jarvis.css";
import "../motion.css";
import "../mobile.css";
import { HomeMotion } from "@/components/home/HomeMotion";
import { MotionLayer } from "@/components/motion/MotionLayer";
import { HomeNav } from "@/components/home/HomeNav";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { MobileCta } from "@/components/home/MobileCta";
import { JarvisHero } from "@/components/jarvis/JarvisHero";
import { Idea } from "@/components/jarvis/Idea";
import { Proof } from "@/components/jarvis/Proof";
import { Versus } from "@/components/jarvis/Versus";
import { Different } from "@/components/jarvis/Different";
import { Moments } from "@/components/jarvis/Moments";
import { Quiet } from "@/components/jarvis/Quiet";
import { Gate } from "@/components/jarvis/Gate";

export const metadata: Metadata = {
  title: "Jarvis — the wealthy have always had someone in their corner. Now you do too.",
  description:
    "Jarvis is an AI investing companion that doesn’t wait to be asked. It watches what you own, remembers why you bought it, and answers to no one but you. Invite-only beta.",
  openGraph: {
    title: "Jarvis — an AI investing companion that doesn’t wait to be asked",
    description: "It watches what you own, remembers why you bought it, and answers to no one but you. Invite-only beta.",
    type: "website",
  },
};

const LINKS: [string, string, string?][] = [
  ["Why we exist", "/#coo"],
  ["Money · Jarvis", "/jarvis", "Live now"],
  ["What’s next", "/#next"],
  ["About", "#"], // TODO(launch): About page
];
const DISCLAIMER =
  "Jarvis is a OneStop product. Jarvis is in invite-only beta. Jarvis provides education and information, not financial advice. We don’t sell financial products or recommend securities.";

/** The Jarvis product page · production port of website/homepage/options/jarvis-3-picks (copy v5 verbatim).
 *  Shares the nav, footer, tokens and rhythm classes with the company homepage (.hp), scoped additions under .jp. */
export default function JarvisPage() {
  return (
    <div className="hp jp">
      <HomeMotion />
      <MotionLayer />
      <HomeNav cta="Request access" ctaHref="#gate" links={LINKS} />
      <JarvisHero />
      <Idea />
      <Proof />
      <Versus />
      <Different />
      <Moments />
      <Quiet />
      <Gate />
      <FigmaFooter disclaimer={DISCLAIMER} button="Request access" product={["Jarvis", "/jarvis"]} cta={["Request access", "#gate"]} where />
      <MobileCta label="Request access" href="#gate" hideAt="#gate" />
    </div>
  );
}
