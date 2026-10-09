import { Products } from "./Products";

/** Round 3 (2026-10-06): three product columns (Jarvis · Health · Education, with icons) via the shared Products
 *  component; the fourth "Stay close / Get notified" email column is gone, so the section is a server component again. */
/** 05 · What's next — open on the sheet (no outline box: team feedback 2026-10-01, fewer boxes).
 *  Health and education are named (team lead, same day) as columns on one hairline. */
export function NextUp() {
  return (
    <section id="next" className="sheet gut next-open">
      <div className="next-head">
        <p className="k2" data-r>What’s next</p>
        <h2 className="hh" data-r>Beyond money.</h2>
        <p className="bd" data-r>
          Money first, because the stakes are clear and the frustration is real. The same companion can carry more of your life. Health and education are in the works. What comes after that is decided by what our users need.
        </p>
      </div>
      <Products />
    </section>
  );
}
