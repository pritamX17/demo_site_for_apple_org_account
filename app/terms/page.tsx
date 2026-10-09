import type { Metadata } from "next";
import Link from "next/link";
import "../home.css";
import "../mobile.css";
import "../legal/legal.css";
import { ADDRESS, AddressBlock, LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "The terms you agree to when you use Jarvis on the app, the web and WhatsApp. Jarvis helps you understand markets and your own money. It does not tell you what to buy or sell.",
};

/** Source: "Jarvis Terms and Conditions (draft v0.1)". Not reviewed by a
 *  lawyer yet. Payments are not live, so the Pro plan and refund parts are
 *  left out. TODO(launch): name the grievance officer. */
export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms and Conditions"
      intro="The agreement between you and OneStop AI Private Limited when you use Jarvis. Jarvis helps you understand markets and your own money. Every decision is yours."
      updated="9 October 2026"
    >
      <section>
        <div className="draft">
          <p>
            <b>Draft.</b> These terms are under review and will be updated before Jarvis is
            generally available.
          </p>
        </div>
      </section>

      <section>
        <h2>The short version</h2>
        <div className="note">
          <ul>
            <li>Jarvis helps you understand markets and your own money. It does not tell you what to buy or sell.</li>
            <li>Jarvis&rsquo;s answers are written by AI and can be wrong. Check anything important before you act.</li>
            <li>Every decision is yours.</li>
            <li>One account works on the app, the web and WhatsApp.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>1. Who we are</h2>
        <ul>
          <li>
            These Terms are an agreement between you and <b>OneStop AI Private Limited</b>{" "}
            (&ldquo;OneStop AI&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), {ADDRESS}.
          </li>
          <li>
            They cover Jarvis on the mobile app, the web app, WhatsApp, and our website
            (together, &ldquo;Jarvis&rdquo;).
          </li>
          <li>
            Our <Link href="/privacy">Privacy Policy</Link> is part of these Terms.
          </li>
        </ul>
      </section>

      <section>
        <h2>2. Accepting these Terms</h2>
        <ul>
          <li>You accept these Terms when you create an account, or when you send your first message to Jarvis on WhatsApp.</li>
          <li>You must be 18 or older.</li>
          <li>If you do not accept them, please do not use Jarvis.</li>
        </ul>
      </section>

      <section>
        <h2>3. What Jarvis is, and what it is not</h2>
        <p>Jarvis is:</p>
        <ul>
          <li>an education and information tool about markets, stocks, funds and your own portfolio</li>
          <li>a place to think through a money question before you decide</li>
        </ul>
        <p>Jarvis is not:</p>
        <ul>
          <li>an investment adviser or research analyst. OneStop AI is not registered with SEBI in either role.</li>
          <li>a broker. Jarvis cannot place trades and never holds your money or securities.</li>
          <li>a source of buy, sell or hold calls, price targets or model portfolios.</li>
          <li>tax, legal or accounting advice.</li>
        </ul>
        <div className="note">
          <ul>
            <li>Nothing Jarvis says is an offer or a recommendation to buy or sell anything.</li>
            <li>Investing carries risk, including losing money. Past returns do not predict future returns.</li>
            <li>For personal advice, speak to a SEBI-registered investment adviser.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>4. AI answers can be wrong</h2>
        <ul>
          <li>Jarvis&rsquo;s answers are written by AI models run by other companies.</li>
          <li>An answer can be wrong, out of date or incomplete, even when it sounds sure.</li>
          <li>Answers may use your portfolio, market data from other companies, and web search. Any of these can have errors or delays.</li>
          <li>Check important facts, such as prices, dates and amounts, with your broker or an official source before you act.</li>
          <li>Other people may get similar answers to similar questions.</li>
        </ul>
      </section>

      <section>
        <h2>5. Your account</h2>
        <ul>
          <li>One Jarvis account works on the app, the web and WhatsApp.</li>
          <li>Your chats, portfolio and plan follow your account on all three.</li>
          <li>Keep your sign-in details and phone safe. You are responsible for what happens in your account.</li>
          <li>Tell us at <a href="mailto:admin@onestopai.ai">admin@onestopai.ai</a> if you think someone else is using it.</li>
        </ul>
      </section>

      <section>
        <h2>6. Using Jarvis on WhatsApp</h2>
        <ul>
          <li>WhatsApp is run by Meta. Its own terms and privacy policy also apply to you there.</li>
          <li>Please do not send full bank or demat account numbers, PAN or Aadhaar on WhatsApp. Hide them before you share a statement, or upload it in the app.</li>
          <li>To reach a person on our team, write &ldquo;talk to a human&rdquo; or email <a href="mailto:admin@onestopai.ai">admin@onestopai.ai</a>.</li>
        </ul>
      </section>

      <section>
        <h2>7. Updates from Jarvis (alerts)</h2>
        <ul>
          <li>Jarvis can send you updates about your holdings on WhatsApp.</li>
          <li>Updates are information, not a signal to buy or sell.</li>
          <li>An update may arrive late, or not at all. Do not rely on Jarvis as your only way to track your money.</li>
          <li>We are not responsible for what you do, or do not do, after an update.</li>
          <li>Reply STOP, or tell Jarvis to stop, and we will stop.</li>
        </ul>
      </section>

      <section>
        <h2>8. Your content</h2>
        <ul>
          <li>&ldquo;Your content&rdquo; means what you send Jarvis: questions, portfolio details, files and voice recordings.</li>
          <li>You keep ownership of your content.</li>
          <li>You let us use it only to run Jarvis for you, as our <Link href="/privacy">Privacy Policy</Link> explains.</li>
          <li>You confirm you have the right to share it.</li>
          <li>Jarvis reads uploaded files automatically. It can misread them. Check that your holdings look right.</li>
        </ul>
      </section>

      <section>
        <h2>9. Jarvis&rsquo;s answers</h2>
        <ul>
          <li>You may use Jarvis&rsquo;s answers for your own personal use.</li>
          <li>To the extent we have any rights in an answer, we give them to you.</li>
          <li>You may not present Jarvis&rsquo;s answers to anyone as advice from a registered adviser.</li>
        </ul>
      </section>

      <section>
        <h2>10. Free plan and limits</h2>
        <ul>
          <li>The free plan has a daily limit. The current limit is shown in the app.</li>
          <li>We may change limits. We will show the current ones in the app.</li>
          <li>If you hit a limit, Jarvis will tell you when it resets.</li>
        </ul>
      </section>


      <section>
        <h2>11. What you must not do</h2>
        <ul>
          <li>Break any law, including securities laws.</li>
          <li>Use Jarvis for market manipulation or insider trading.</li>
          <li>Use Jarvis to give paid advice or research to others, or claim to be SEBI-registered because of it.</li>
          <li>Scrape Jarvis, use bots, or try to get around limits.</li>
          <li>Try to extract the models, prompts or code behind Jarvis.</li>
          <li>Attack, overload or probe our systems.</li>
          <li>Upload malware, or data you have no right to share.</li>
          <li>Pretend to be someone else, or use another person&rsquo;s account.</li>
          <li>Resell Jarvis without our written permission.</li>
        </ul>
      </section>

      <section>
        <h2>12. New features</h2>
        <ul>
          <li>Some features are marked beta or early access.</li>
          <li>They may change, break or be removed without notice.</li>
        </ul>
      </section>

      <section>
        <h2>13. Feedback</h2>
        <ul>
          <li>If you rate an answer or send us ideas, we may use them to improve Jarvis, without paying you.</li>
        </ul>
      </section>

      <section>
        <h2>14. Our rights</h2>
        <ul>
          <li>Jarvis, its software and design, and the names Jarvis and OneStop AI belong to us.</li>
          <li>We give you a personal, non-transferable right to use Jarvis under these Terms.</li>
        </ul>
      </section>

      <section>
        <h2>15. Other companies&rsquo; services</h2>
        <ul>
          <li>Jarvis relies on other companies: Apple, Google, Meta (WhatsApp), WATI, AI model providers and market data providers.</li>
          <li>We are not responsible for their services being down or their data being wrong.</li>
        </ul>
      </section>

      <section>
        <h2>16. Ending your account</h2>
        <ul>
          <li>You can stop using Jarvis at any time.</li>
          <li>You can delete your account in the app, or by emailing us.</li>
          <li>We may suspend or close your account if you break these Terms, if the law requires it, or to protect other users. We will tell you why where we can, and you can ask us to review it at <a href="mailto:admin@onestopai.ai">admin@onestopai.ai</a>.</li>
        </ul>
      </section>

      <section>
        <h2>17. Disclaimers</h2>
        <ul>
          <li>Jarvis is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;.</li>
          <li>We do not promise it will be error-free or always available, or that its information will be complete or current.</li>
        </ul>
      </section>

      <section>
        <h2>18. Limits on our liability</h2>
        <ul>
          <li>
            As far as the law allows, we are not liable for:
            <ul>
              <li>any investment or trading loss</li>
              <li>indirect losses, lost profits or lost data</li>
            </ul>
          </li>
          <li>Nothing in these Terms limits rights you have by law as a consumer.</li>
        </ul>
      </section>

      <section>
        <h2>19. Your responsibility</h2>
        <ul>
          <li>If you break these Terms or the law and someone makes a claim against us because of it, you agree to cover our reasonable losses and legal costs.</li>
        </ul>
      </section>

      <section>
        <h2>20. Complaints and disputes</h2>
        <ul>
          <li>
            Tell us first. Most problems can be sorted quickly:
            <ul>
              <li>Support: <a href="mailto:admin@onestopai.ai">admin@onestopai.ai</a></li>
              <li>Grievance Officer: <a href="mailto:admin@onestopai.ai">admin@onestopai.ai</a></li>
              <li>We acknowledge a complaint within 48 hours and resolve it within one month.</li>
            </ul>
          </li>
          <li>These Terms are governed by the laws of India.</li>
          <li>You can still go to a consumer commission under the Consumer Protection Act, 2019.</li>
        </ul>
      </section>

      <section>
        <h2>21. Apple users</h2>
        <p>If you downloaded Jarvis from the App Store:</p>
        <ul>
          <li>These Terms are between you and us, not Apple.</li>
          <li>Apple is not responsible for Jarvis or for supporting it.</li>
          <li>Apple and its subsidiaries can enforce these Terms against you.</li>
        </ul>
      </section>

      <section>
        <h2>22. Changes to these Terms</h2>
        <ul>
          <li>We will update the date at the top.</li>
          <li>For changes that affect you, we tell you by email, in the app or on WhatsApp at least 30 days before they apply.</li>
          <li>If you keep using Jarvis after that, the new Terms apply.</li>
        </ul>
      </section>

      <section>
        <h2>23. General</h2>
        <ul>
          <li>If part of these Terms cannot be enforced, the rest still applies.</li>
          <li>We may transfer these Terms if OneStop AI is sold or merged. You may not transfer them.</li>
          <li>We are not responsible for delays caused by events outside our control.</li>
          <li>These Terms, with the policies in section 1, are the full agreement between you and us.</li>
        </ul>
      </section>

      <section>
        <h2>24. Contact</h2>
        <AddressBlock />
        <p><a href="mailto:admin@onestopai.ai">admin@onestopai.ai</a></p>
      </section>
    </LegalPage>
  );
}
