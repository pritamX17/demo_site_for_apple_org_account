import type { ReactNode } from "react";
import { HomeNav } from "@/components/home/HomeNav";
import { FigmaFooter } from "@/components/home/FigmaFooter";

/** Shared shell for /privacy and /terms: the house nav and footer around a
 *  single-measure document. Kept deliberately plain — these pages are read,
 *  not scrolled through, so they carry no reveal motion. */
export function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="hp lg">
      <HomeNav />
      <main>
        <div className="head">
          <p className="k2">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="sub">{intro}</p>
          <p className="meta">Last updated · {updated}</p>
        </div>
        <div className="doc">{children}</div>
      </main>
      <FigmaFooter />
    </div>
  );
}

/** Registered office, used inline (ADDRESS) and as a block (AddressBlock). */
export const ADDRESS_LINES = [
  "B-1006, Brigade Gardenia",
  "9th Cross Road RBI Layout, J.P. Nagar, Bangalore South",
  "Bengaluru 560078",
  "Karnataka",
  "India",
];
export const ADDRESS = ADDRESS_LINES.join(", ");

export function AddressBlock() {
  return (
    <p>
      <b>OneStop AI Private Limited</b>
      {ADDRESS_LINES.map((l) => (
        <span key={l}>
          <br />
          {l}
        </span>
      ))}
    </p>
  );
}
