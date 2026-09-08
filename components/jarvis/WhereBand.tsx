import { OrbitMark, WhatsAppMark } from "@/components/jarvis/logos";

/** 09 · Where Jarvis lives today — the band that sits on top of the footer (the "extended footer").
 *  TODO(copy): the line below extends the v5 strip line ("Beta members talk to Jarvis on WhatsApp — full access,
 *  nothing to install.") with the app, per Saurabh 2026-09-08. Confirm the final wording. */
export function WhereBand({ appHref = "#gate" }: { appHref?: string }) {
  return (
    <section id="where" className="sheet" style={{ paddingTop: "var(--gutter)" }}>
      <div className="whereband" data-r>
        <div className="copy">
          <p className="k">Where Jarvis lives today.</p>
          <p className="line">Jarvis is in invite-only beta. Beta members talk to Jarvis in the app and on WhatsApp — full access, nothing to install.</p>
        </div>
        <div className="where doors">
          <a className="tile" href={appHref} data-to><span className="ic"><OrbitMark size={16} /></span><span><b>The Jarvis app</b><small>Invite-only beta</small></span></a>
          {/* TODO(launch): the WhatsApp link. */}
          <a className="tile wa" href="#"><span className="ic"><WhatsAppMark size={18} /></span><span><b>WhatsApp</b><small>Full access, nothing to install.</small></span></a>
        </div>
      </div>
    </section>
  );
}
