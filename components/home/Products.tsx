import type { ReactNode } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { SolarIcon } from "@/components/brand/SolarIcon";

/** Round 3 (2026-10-06): new file. The three product columns on one hairline — Money · Jarvis (live, with its link),
 *  Health, Education — each with its Solar Bold Duotone icon (Guidelines §9) above the tag. Shared by the homepage (NextUp) and /movement (Building);
 *  `extra` is an optional fourth column (the movement page's "What else?"). */
export function Products({ extra }: { extra?: ReactNode }) {
  return (
    <div className={`cols3${extra ? " cols4" : ""}`}>
      {PRODUCTS.map((n) => (
        <div className="col" key={n.title} data-r>
          <SolarIcon className="pi" name={n.icon} />
          <p className="tag">{n.tag}</p>
          <p className="t">{n.title}</p>
          <p className="s">{n.line}</p>
          {n.cta && <Link className="go" href={n.cta[1]}>{n.cta[0]} →</Link>}
        </div>
      ))}
      {extra}
    </div>
  );
}
