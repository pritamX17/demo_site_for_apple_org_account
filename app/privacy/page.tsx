import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "../home.css";
import "../mobile.css";
import "../legal/legal.css";
import { ADDRESS, AddressBlock, LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Jarvis collects, who it goes to, how long we keep it, and how you see, correct or delete it. We do not sell your data and we do not use it to train AI models.",
};

/** Source: "Jarvis Privacy Policy (draft v0.1)". Not reviewed by a lawyer
 *  yet. Payments are not live, so payment data is left out.
 *  TODO(launch): name the grievance officer. */

const COLLECT: [string, string, string, string][] = [
  ["Account details", "Name, email, profile photo", "You, or Google when you sign in with Google", "To create your account and sign you in"],
  ["WhatsApp number", "Your phone number and WhatsApp display name", "WhatsApp, when you message Jarvis", "To reply to you and link WhatsApp to your account"],
  ["Your questions and Jarvis’s answers", "Chat messages on the app, web and WhatsApp", "You", "To answer you and keep your chat history"],
  ["Portfolio", "Holdings, quantities, buy prices, watchlist", "You type it, or upload a screenshot, PDF or CSV", "So Jarvis can answer questions about your own money"],
  ["Uploaded files", "Broker statements, screenshots", "You", "To read your holdings out of them"],
  ["What Jarvis remembers about you", "Goals, time horizon, risk comfort, past decisions you shared", "Built from your chats", "So you do not have to repeat yourself"],
  ["Preferences", "Horizon (short/mid/long), risk (growth/balanced/cautious), currency", "You", "To shape answers to you"],
  ["Voice (app only)", "Short recordings when you tap the mic", "You", "To turn your speech into text"],
  ["Device and sign-in details", "Device type, operating system, browser", "Your device", "To keep your account secure and show your active sessions"],
  ["Feedback", "Thumbs up or down, comments", "You", "To improve answers"],
  ["Support messages", "Anything you send us", "You", "To help you"],
];

const SHARE: [string, string, string][] = [
  ["Amazon Web Services (Mumbai, India)", "Hosting and storage", "Everything we store"],
  ["OpenRouter, and the model companies behind it (e.g. Google, OpenAI)", "Writing answers, speech to text", "The question and context for each answer"],
  ["WATI and Meta (WhatsApp)", "Delivering WhatsApp messages", "Your number and the messages between you and Jarvis"],
  ["Google", "Sign in with Google", "Sign-in only"],
  ["Resend", "Sending sign-in codes by email", "Your email"],
  ["Firecrawl", "Web search for answers", "Search words"],
];

const KEEP: [string, string, string][] = [
  ["Account details (name, email, WhatsApp number)", "While your account is open", "You delete your account"],
  ["Chats on the app, web and WhatsApp", "While your account is open", "You delete a chat, or your account"],
  ["What Jarvis remembers about you", "While your account is open", "You clear it, send /reset on WhatsApp, or delete your account"],
  ["Portfolio and watchlist", "While your account is open", "You remove holdings, or delete your account"],
  ["Uploaded files (statements, screenshots, CSV)", "Up to 14 days", "Deleted automatically once your holdings are read"],
  ["Voice recordings (app mic)", "Minutes", "Deleted straight after they are turned into text. The text is kept like a chat message."],
  ["Preferences (horizon, risk, currency)", "While your account is open", "You change them, or delete your account"],
  ["Feedback on answers", "2 years", "Time"],
  ["Technical records of how an answer was made", "90 days", "Time"],
  ["Security and sign-in logs", "180 days", "Time"],
  ["Server logs", "180 days", "Time"],
  ["Complaints and support requests", "2 years after they are closed", "Time"],
  ["Backups", "7 days, rolling", "Overwritten automatically"],
];

const OTHERS: [string, string, string][] = [
  ["Meta (WhatsApp)", "Messages between you and Jarvis on WhatsApp", "Up to 30 days on its servers. Your own phone keeps the chat until you delete it."],
];

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="tbl">
      <table>
        <thead>
          <tr>{head.map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => (j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>))}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="What Jarvis collects, who it goes to, how long we keep it, and how you see, correct or delete it."
      updated="9 October 2026"
    >
      <section>
        <div className="draft">
          <p>
            <b>Draft.</b> This policy is under review and will be updated before Jarvis is
            generally available.
          </p>
        </div>
      </section>

      <section>
        <h2>1. Who we are</h2>
        <ul>
          <li>
            Jarvis is made by <b>OneStop AI Private Limited</b> (&ldquo;OneStop AI&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), {ADDRESS}.
          </li>
          <li>
            This policy covers Jarvis on:
            <ul>
              <li>the mobile app (iPhone and Android)</li>
              <li>the web app</li>
              <li>WhatsApp</li>
              <li>our website</li>
            </ul>
          </li>
          <li>Under India&rsquo;s Digital Personal Data Protection Act, 2023, we are the &ldquo;Data Fiduciary&rdquo; for your data.</li>
        </ul>
      </section>

      <section>
        <h2>2. The short version</h2>
        <div className="note">
          <ul>
            <li>We collect what you give Jarvis so it can answer you: your questions, your portfolio, and what you tell it about your goals.</li>
            <li>AI models run by other companies write Jarvis&rsquo;s answers. We send them only what an answer needs.</li>
            <li>We do not sell your data. We do not use it for ads.</li>
            <li>We do not use your data to train AI models, and neither do the model companies we use.</li>
            <li>Your data is stored in India (AWS, Mumbai).</li>
            <li>You can see, correct or delete your data at any time.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>3. What we collect</h2>
        <Table head={["What", "Examples", "Where it comes from", "Why we need it"]} rows={COLLECT} />
        <p>We do not collect:</p>
        <ul>
          <li>your broker or bank login</li>
          <li>your PAN, Aadhaar or bank account number (please do not send them; if a statement you upload contains them, see section 8)</li>
          <li>your exact location</li>
          <li>your contacts</li>
        </ul>
        <p>Jarvis does not connect to your broker or bank. It cannot place trades or move money.</p>
      </section>

      <section>
        <h2>4. How we use it</h2>
        <ul>
          <li>To run Jarvis: answer your questions, read your portfolio, remember your context.</li>
          <li>To send you updates about your holdings on WhatsApp, if you have them switched on (see section 7).</li>
          <li>To keep Jarvis safe: stop abuse, spam and account takeovers, and enforce daily limits.</li>
          <li>To fix problems and make answers better. Our team may read a conversation when you report it, give feedback on it, or when we need to fix a fault or stop misuse.</li>
          <li>To meet the law.</li>
        </ul>
      </section>

      <section>
        <h2>5. AI and your data</h2>
        <ul>
          <li>Jarvis&rsquo;s answers are written by large language models run by other companies.</li>
          <li>We reach these models through OpenRouter. Today they include models from Google and OpenAI.</li>
          <li>For each answer we send the model your question and the context it needs (for example your holdings or what Jarvis remembers). We do not send your email, phone number or account details.</li>
          <li>In-app voice recordings are turned into text by one of these models. We delete the recording straight after. We keep the text like any other message.</li>
          <li>We use these providers only on terms where they do not use your data to train their models. Some keep a copy for a short time to check for abuse.</li>
          <li>We do not use your data to train or fine-tune AI models. Messages you send on WhatsApp are never used to train AI models.</li>
          <li>Jarvis can look up the web to answer you. The search words it uses may come from your question. We do not attach your name or contact details to a search.</li>
          <li>AI answers can be wrong. See our <Link href="/terms">Terms</Link>.</li>
        </ul>
      </section>

      <section>
        <h2>6. Who we share it with</h2>
        <p>We share data only with companies that help us run Jarvis, only for the reasons above.</p>
        <Table head={["Who", "What they do", "What they get"]} rows={SHARE} />
        <ul>
          <li>We may also share data if the law requires it, or to protect our users or our rights.</li>
          <li>If OneStop AI is sold or merged, we will tell you before your data falls under a different policy.</li>
          <li>WhatsApp is run by Meta, and your chats there are also covered by WhatsApp&rsquo;s own privacy policy.</li>
        </ul>
      </section>

      <section>
        <h2>7. WhatsApp messages from Jarvis</h2>
        <ul>
          <li>If you start a chat with Jarvis on WhatsApp, we reply there.</li>
          <li>Jarvis may also send you updates about your holdings on WhatsApp.</li>
          <li>To stop them, reply STOP or tell Jarvis to stop. We will stop straight away.</li>
        </ul>
      </section>

      <section>
        <h2>8. How long we keep your data</h2>
        <h3>The rule we follow</h3>
        <ul>
          <li>We keep your data only as long as we need it to run Jarvis for you.</li>
          <li>We keep some records longer when the law makes us.</li>
          <li>When we no longer need data, we delete it, or strip it so it can no longer be linked to you.</li>
        </ul>

        <h3>Each kind of data</h3>
        <Table head={["Data", "How long we keep it", "What ends it"]} rows={KEEP} />

        <h3>When you delete a chat</h3>
        <ul>
          <li>It disappears from your chat list straight away.</li>
          <li>It is removed from our systems within 30 days.</li>
          <li>On WhatsApp, /reset clears what Jarvis remembers and starts fresh. Your past messages are removed within 30 days.</li>
        </ul>

        <h3>When you delete your account</h3>
        <ul>
          <li>You can delete your account in the app, or by emailing <a href="mailto:admin@onestopai.ai">admin@onestopai.ai</a>.</li>
          <li>You have 30 days to change your mind by signing back in.</li>
          <li>After that, we delete your account, chats, memory, portfolio and preferences within 30 days.</li>
          <li>We send you a message when it is done.</li>
        </ul>
        <p>We keep only:</p>
        <ul>
          <li>security logs, for up to 180 days</li>
          <li>from May 2027, records of how your data was processed, for 1 year, as India&rsquo;s data protection rules require</li>
          <li>anything we must keep because of a legal claim or a request from a government authority</li>
        </ul>
        <p>These are kept separately and are not used for anything else.</p>

        <h3>Backups</h3>
        <ul>
          <li>We keep backups for 7 days, to recover from a system failure.</li>
          <li>Deleted data drops out of backups within 7 days.</li>
          <li>We never restore a backup to bring back data you deleted.</li>
        </ul>

        <h3>Copies other companies hold</h3>
        <Table head={["Company", "What they hold", "How long"]} rows={OTHERS} />
        <ul>
          <li>When you delete your account, we ask these companies to delete your data too, where they hold it for us.</li>
        </ul>

        <h3>Data that no longer identifies you</h3>
        <ul>
          <li>We may keep totals and statistics that cannot be linked back to you, such as &ldquo;how many people asked about gold this week&rdquo;.</li>
        </ul>
      </section>

      <section>
        <h2>9. Where it is stored</h2>
        <ul>
          <li>Your data is stored in India, on Amazon Web Services in Mumbai.</li>
          <li>To write an answer, parts of a conversation are processed by model companies that may be outside India. We use only providers that protect it as this policy says.</li>
        </ul>
      </section>

      <section>
        <h2>10. How we protect it</h2>
        <ul>
          <li>Data is encrypted when it travels and when it is stored.</li>
          <li>Only team members who need it can access it, and access is logged.</li>
          <li>No system is perfectly secure. If a breach affects your data, we will tell you and the Data Protection Board of India as the law requires.</li>
        </ul>
      </section>

      <section>
        <h2>11. Your rights</h2>
        <p>You can:</p>
        <ul>
          <li>See the data we hold about you.</li>
          <li>Correct anything that is wrong.</li>
          <li>Delete your account and data: in the app, or by emailing <a href="mailto:admin@onestopai.ai">admin@onestopai.ai</a>.</li>
          <li>Withdraw consent at any time. Jarvis may not be able to work without some data.</li>
          <li>Nominate someone to use these rights for you if you die or cannot act.</li>
          <li>Complain to our Grievance Officer (section 15). If you are not satisfied, you can complain to the Data Protection Board of India.</li>
        </ul>
        <p>To use any of these, email <a href="mailto:admin@onestopai.ai">admin@onestopai.ai</a> or message Jarvis on WhatsApp. We reply within 30 days.</p>
      </section>

      <section>
        <h2>12. Children</h2>
        <ul>
          <li>Jarvis is for people aged 18 and over.</li>
          <li>We do not knowingly collect data from anyone under 18. If we find we have, we delete it.</li>
        </ul>
      </section>

      <section>
        <h2>13. Cookies</h2>
        <ul>
          <li>The web app uses cookies needed to keep you signed in and secure.</li>
          <li>We do not use advertising cookies inside Jarvis.</li>
        </ul>
      </section>

      <section>
        <h2>14. Users in the US</h2>
        <ul>
          <li>We do not sell or share your personal information for advertising.</li>
          <li>California residents can ask what we collect, ask us to delete it, and will not be treated differently for asking. Email <a href="mailto:admin@onestopai.ai">admin@onestopai.ai</a>.</li>
        </ul>
      </section>

      <section>
        <h2>15. Changes and contact</h2>
        <ul>
          <li>We will update the date at the top when this policy changes.</li>
          <li>For bigger changes, we tell you by email, in the app or on WhatsApp before they apply.</li>
          <li>Contact: <a href="mailto:admin@onestopai.ai">admin@onestopai.ai</a></li>
          <li>Grievance Officer: <a href="mailto:admin@onestopai.ai">admin@onestopai.ai</a></li>
        </ul>
        <AddressBlock />
      </section>
    </LegalPage>
  );
}
