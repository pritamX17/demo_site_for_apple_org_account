/* Round 3 (2026-10-06): Jarvis joins the list as the first (live) column, every entry carries an `icon`
   (official Solar Bold Duotone via components/brand/SolarIcon.tsx) and Jarvis a `cta`. Rendered by components/home/Products.tsx
   on the homepage (NextUp) and on /movement (Building).
   What comes after Jarvis (team lead, 2026-10-01: name health and education on the site).
   Product lines written by us (Saurabh, 2026-10-03: "you can do something by yourself"); the team has sent no
   product facts, so each line states what the companion will do for the person, not features or dates. */
export type ProductIconName = "money" | "health" | "education";

export type Product = {
  tag: string;
  title: string;
  line: string;
  icon: ProductIconName;
  cta?: [string, string];
};

export const PRODUCTS: Product[] = [
  {
    tag: "Live now",
    title: "Money · Jarvis",
    line: "Reads your real portfolio, remembers your goals, and hands the decision back to you. Live today.",
    icon: "money",
    cta: ["Try Jarvis", "/jarvis"],
  },
  {
    tag: "The next product",
    title: "Health",
    line: "A test report, a treatment choice, an insurance claim. The health companion reads the report with you, explains every number in plain words, and gives you the questions to ask before you say yes. It does not replace your doctor. It makes sure you walk in prepared.",
    icon: "health",
  },
  {
    tag: "In the works",
    title: "Education",
    line: "A course, a college, a loan to pay for it. The education companion puts the real cost over the years next to what you want from it, and reads the fine print of the loan before you sign. It has no seat to sell you.",
    icon: "education",
  },
];
