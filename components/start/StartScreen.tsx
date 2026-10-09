/* Round 3b (2026-10-06): the frame is CSS-drawn (DevFrame) — no phone-frame.png fetch. */
import { OrbitMark } from "@/components/jarvis/logos";
import { DevFrame } from "@/components/jarvis/PhoneIcons";

/* The phone on /start: the Figma phone frame with one WhatsApp-style chat. Same screen system as
   components/jarvis/Screen.tsx (.phone .screen.chat .phead .pcontent .pmsg .pask), styles copied into start.css. */
export function StartScreen() {
  return (
    <div className="phone">
      <DevFrame />
      <div className="screen chat">
        <div className="sbar"><span>9:41</span><span className="lv"><span className="bars"><b style={{ height: 4 }} /><b style={{ height: 6 }} /><b style={{ height: 8 }} /><b style={{ height: 11 }} /></span><span className="bat" /></span></div>
        <div className="phead">
          <div className="who">
            <span className="av"><OrbitMark size={22} /></span>
            <div><h3>JARVIS</h3><p className="on"><i />WhatsApp · online</p></div>
          </div>
        </div>
        <div className="pcontent">
          <p className="pstamp">Sunday · 6:40 am</p>
          <div className="pmsg j" data-bub>Small thing before your day starts. Three of your funds hold the same twelve stocks. Nothing is broken. You are just less diversified than you think.</div>
          <div className="pmsg you" data-bub>Show me.</div>
          <div className="pmsg j" data-bub>Here they are, with what each one costs you a year. Look now, or leave it for the weekend?</div>
          <div className="pmsg you" data-bub>Weekend.</div>
          <div className="pmsg j" data-bub>Done. Enjoy your Sunday.</div>
          <div className="pask"><span className="txt">Message</span><b>Send</b></div>
        </div>
      </div>
    </div>
  );
}
