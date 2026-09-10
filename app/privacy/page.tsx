import type { Metadata } from "next";
import "../home.css";
import "../mobile.css";
import "../legal/legal.css";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How OneStop AI collects, uses, stores and deletes your data — including the portfolio information Jarvis reads. We do not sell your data and we do not train models on it.",
};

/** TODO(counsel): reviewed by counsel before we take money or leave beta.
 *  TODO(launch): replace the placeholder entity name, address, grievance
 *  officer and contact addresses below with the registered details. */
export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="Jarvis reads the money you put in front of it. This page says exactly what we collect, where it goes, and how you get it back or get rid of it."
      updated="10 September 2026"
    >
      <section>
        <div className="draft">
          <p>
            <b>Draft.</b> This policy is published for the invite-only beta and is under
            review by counsel. It will be updated before Jarvis is generally available.
          </p>
        </div>
      </section>

      <section>
        <h2>Who we are</h2>
        <p>
          OneStop AI (&ldquo;OneStop&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) builds AI
          companions for the decisions you carry. Our first product, Jarvis, is a companion
          for money. This policy covers this website and the Jarvis application.
        </p>
        <p>
          <b>Entity:</b> [REGISTERED ENTITY NAME] &middot; [REGISTERED ADDRESS]<br />
          <b>Privacy contact:</b>{" "}
          <a href="mailto:privacy@onestop.ai">privacy@onestop.ai</a>
        </p>
      </section>

      <section>
        <h2>What we collect</h2>
        <h3>You give us</h3>
        <ul>
          <li>
            <b>Account information</b> — your name, email address, and authentication
            details when you create an account or join the waitlist.
          </li>
          <li>
            <b>Portfolio and financial information</b> — holdings, transactions, balances,
            goals and anything you write into the Ledger. This is the data Jarvis reads in
            order to be useful to you.
          </li>
          <li>
            <b>Conversations</b> — the questions you ask Jarvis and the context you give it.
          </li>
          <li>
            <b>Support correspondence</b> — anything you send us by email.
          </li>
        </ul>

        <h3>We collect automatically</h3>
        <ul>
          <li>
            <b>Usage and device data</b> — pages viewed, features used, approximate location
            derived from IP, browser and device type, and error diagnostics.
          </li>
        </ul>

        <h3>From connected accounts</h3>
        <p>
          If you choose to connect a broker, bank or other financial account, we receive the
          holdings and transaction data that connection returns. We request read-only access.
          We do not place trades, move money, or write to your accounts. You can disconnect a
          connected account at any time, and disconnecting stops any further data flowing to us.
        </p>
      </section>

      <section>
        <h2>Why we use it</h2>
        <ul>
          <li>To provide Jarvis — answering your questions and reflecting your position back to you.</li>
          <li>To create and secure your account, and to prevent fraud and abuse.</li>
          <li>To fix problems, monitor reliability and improve the product.</li>
          <li>To contact you about the service, and about the beta if you asked us to.</li>
          <li>To meet legal, regulatory and tax obligations.</li>
        </ul>
        <p>
          Under India&rsquo;s Digital Personal Data Protection Act, 2023, we process your
          personal data for these stated purposes on the basis of the consent you give when
          you create an account and connect data, or where processing is necessary for
          legitimate uses the Act permits. You may withdraw consent at any time (see{" "}
          <b>Your choices</b> below); withdrawing it may mean Jarvis can no longer function.
        </p>
      </section>

      <section>
        <h2>We do not train models on your data</h2>
        <div className="note">
          <p>
            We do not sell your personal data. We do not share it with advertisers. We do not
            use your portfolio data, your Ledger, or your conversations with Jarvis to train
            or fine-tune AI models &mdash; ours or anyone else&rsquo;s.
          </p>
        </div>
        <p>
          Jarvis is built on large language models operated by third parties. When Jarvis
          answers you, the context needed for that answer is sent to the model provider under
          agreements that prohibit using it for training. We send the minimum required and we
          do not send credentials for connected accounts.
        </p>
      </section>

      <section>
        <h2>Who processes it</h2>
        <p>
          We share personal data only with service providers who process it on our
          instructions, under contract, for the purposes above:
        </p>
        <ul>
          <li><b>Cloud hosting and storage</b> — [PROVIDER], for running the service and storing data.</li>
          <li><b>AI model providers</b> — [PROVIDER(S)], to generate Jarvis&rsquo;s responses, under no-training terms.</li>
          <li><b>Account connectivity</b> — [PROVIDER], where you connect a broker or bank.</li>
          <li><b>Analytics and error monitoring</b> — [PROVIDER], for reliability and diagnostics.</li>
          <li><b>Email delivery</b> — [PROVIDER], for service and beta correspondence.</li>
        </ul>
        <p>
          We may also disclose data where the law requires it, to enforce our terms, or as
          part of a merger or acquisition &mdash; in which case we will tell you before your
          data becomes subject to a different policy.
        </p>
      </section>

      <section>
        <h2>Where it is stored, and how long</h2>
        <p>
          Data is stored on servers operated by our cloud provider and may be processed
          outside your country, including in jurisdictions with different data protection
          laws. Where we transfer personal data internationally we rely on the safeguards the
          applicable law requires.
        </p>
        <p>
          We keep your data for as long as your account is open. If you close your account we
          delete or irreversibly anonymise your personal data within <b>90 days</b>, except
          where we must keep records longer to meet a legal, tax or regulatory obligation, or
          to resolve a dispute.
        </p>
      </section>

      <section>
        <h2>Security</h2>
        <p>
          We encrypt data in transit and at rest, restrict internal access to those who need
          it, and use read-only access for connected accounts. No system is perfectly secure,
          and we cannot guarantee absolute security. If a breach affects your personal data we
          will notify you and the relevant authority as the law requires.
        </p>
      </section>

      <section>
        <h2>Your choices</h2>
        <p>You can, at any time:</p>
        <ul>
          <li><b>Access</b> a copy of the personal data we hold about you.</li>
          <li><b>Correct</b> data that is wrong or incomplete.</li>
          <li><b>Delete</b> your account and the data associated with it.</li>
          <li><b>Withdraw consent</b> for processing, or disconnect a linked account.</li>
          <li><b>Nominate</b> another person to exercise these rights if you die or become incapacitated, as the DPDP Act provides.</li>
          <li><b>Complain</b> to a data protection authority.</li>
        </ul>
        <p>
          To exercise any of these, email{" "}
          <a href="mailto:privacy@onestop.ai">privacy@onestop.ai</a>. We respond within 30
          days. If you are in the EU or UK, you have the rights the GDPR provides, including
          data portability and objecting to processing.
        </p>
        <p>
          <b>Grievance Officer (India):</b> [NAME] &middot;{" "}
          <a href="mailto:grievance@onestop.ai">grievance@onestop.ai</a>
        </p>
      </section>

      <section>
        <h2>Children</h2>
        <p>
          Jarvis is not for anyone under 18. We do not knowingly collect data from children.
          If we learn we have, we delete it.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          If we change this policy we will update the date above, and for material changes we
          will tell you by email or in the product before the change takes effect.
        </p>
      </section>
    </LegalPage>
  );
}
