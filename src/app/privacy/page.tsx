import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - ZapSplit",
  description: "ZapSplit Privacy Policy. Learn how we collect, use, and protect your personal information.",
};

const CONTACT_EMAIL = "zapsplit@gmail.com";
const EFFECTIVE_DATE = "18 February 2026";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <a href="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            &larr; Back to ZapSplit
          </a>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Effective Date: {EFFECTIVE_DATE}
          </p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p>
            ZapSplit (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the ZapSplit mobile
            application and website (collectively, the &ldquo;Service&rdquo;). This Privacy Policy explains how we
            collect, use, disclose, and protect your personal information when you use our Service, in accordance
            with the Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
          </p>
          <p>
            By using ZapSplit, you agree to the collection and use of information as described in this policy.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>Information you provide to us:</h3>
          <ul>
            <li><strong>Account information</strong> &mdash; your name, email address, and profile photo when you create an account.</li>
            <li><strong>Authentication data</strong> &mdash; credentials from third-party sign-in providers (Apple, Google) if you choose to sign in with those services. We receive only your name and email; we never see your password.</li>
            <li><strong>Payment information</strong> &mdash; payment card details and billing information. This is collected and processed directly by Stripe and is never stored on our servers.</li>
            <li><strong>Receipt images</strong> &mdash; photos of receipts you upload for bill splitting. These are processed to extract item and pricing information.</li>
            <li><strong>Split and transaction data</strong> &mdash; details of splits you create, including amounts, participants, and payment status.</li>
            <li><strong>Contact information of others</strong> &mdash; names and optionally email or phone numbers of people you add to splits who may not have a ZapSplit account.</li>
          </ul>

          <h3>Information collected automatically:</h3>
          <ul>
            <li><strong>Device information</strong> &mdash; device model, operating system version, and unique device identifiers.</li>
            <li><strong>Usage data</strong> &mdash; how you interact with the Service, including features used and actions taken.</li>
            <li><strong>Log data</strong> &mdash; IP address, access times, and referring URLs when you use our web payment pages.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide, operate, and maintain the Service</li>
            <li>Process payments and facilitate bill splitting between users</li>
            <li>Analyse receipt images using AI-powered optical character recognition</li>
            <li>Send you notifications about payment requests, settlements, and account activity</li>
            <li>Generate shareable payment links for split participants</li>
            <li>Detect, prevent, and address fraud or technical issues</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>3. Third-Party Service Providers</h2>
          <p>
            We share your information with the following third-party service providers who assist us in
            operating the Service:
          </p>

          <h3>Stripe &mdash; Payment processing</h3>
          <p>
            Processes all payment transactions. Your payment card details are collected directly by Stripe
            and are subject to{" "}
            <a href="https://stripe.com/au/privacy" target="_blank" rel="noopener noreferrer">
              Stripe&apos;s Privacy Policy
            </a>
            . We do not store your full card number.
          </p>

          <h3>Supabase &mdash; Backend infrastructure and authentication</h3>
          <p>
            Hosts our database, handles user authentication, and stores your account data. Data is encrypted
            in transit and at rest. See{" "}
            <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">
              Supabase&apos;s Privacy Policy
            </a>
            .
          </p>

          <h3>OpenAI &mdash; Receipt scanning (OCR)</h3>
          <p>
            Analyses receipt images you upload to extract item names and prices. Images are sent to
            OpenAI&apos;s API for processing. OpenAI does not use this data to train their models. See{" "}
            <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer">
              OpenAI&apos;s Privacy Policy
            </a>
            .
          </p>

          <h3>Apple / Google &mdash; Authentication</h3>
          <p>
            If you sign in with Apple or Google, we receive your name and email from these providers.
            We do not receive or store your Apple or Google password.
          </p>

          <h3>Expo / EAS &mdash; App delivery and push notifications</h3>
          <p>
            Used to deliver app updates and send push notifications about payment activity.
          </p>

          <h2>4. Data Storage and Security</h2>
          <p>
            Your data is stored on secure servers provided by Supabase (hosted on Amazon Web Services).
            While our servers may be located outside Australia, we take reasonable steps to ensure your
            data is treated securely and in accordance with this policy.
          </p>
          <p>We implement industry-standard security measures including:</p>
          <ul>
            <li>Encryption of data in transit (TLS/SSL) and at rest</li>
            <li>Row Level Security (RLS) policies on all database tables</li>
            <li>Secure authentication with hashed passwords</li>
            <li>Payment data handled exclusively by PCI-compliant Stripe</li>
          </ul>
          <p>
            No method of electronic storage is 100% secure. While we strive to use commercially acceptable
            means to protect your personal information, we cannot guarantee its absolute security.
          </p>

          <h2>5. Data Retention</h2>
          <p>
            We retain your personal information for as long as your account is active or as needed to
            provide you the Service. If you delete your account, we will delete or anonymise your personal
            data within 30 days, except where we are required to retain it for legal, tax, or regulatory purposes.
          </p>
          <p>
            Receipt images are retained only for as long as the associated split is active. Transaction
            records may be retained for up to 7 years for financial compliance purposes.
          </p>

          <h2>6. Your Rights</h2>
          <p>Under the Australian Privacy Act 1988, you have the right to:</p>
          <ul>
            <li><strong>Access</strong> &mdash; request a copy of the personal information we hold about you.</li>
            <li><strong>Correction</strong> &mdash; request correction of any inaccurate or incomplete information.</li>
            <li><strong>Deletion</strong> &mdash; request deletion of your account and associated data.</li>
            <li><strong>Withdraw consent</strong> &mdash; withdraw your consent for data processing at any time.</li>
            <li><strong>Complain</strong> &mdash; lodge a complaint with the Office of the Australian Information Commissioner (OAIC) if you believe your privacy has been breached.</li>
          </ul>
          <p>To exercise any of these rights, please contact us at the email address below.</p>

          <h2>7. Children&apos;s Privacy</h2>
          <p>
            The Service is not intended for use by anyone under the age of 18. We do not knowingly collect
            personal information from children under 18. If we become aware that we have collected personal
            information from a child, we will take steps to delete it promptly.
          </p>

          <h2>8. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than Australia, including
            the United States, where our service providers operate. By using the Service, you consent to the
            transfer of your information to these countries, which may have different data protection laws
            than Australia.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of material changes by
            updating the &ldquo;Effective Date&rdquo; at the top of this policy and, where appropriate,
            through an in-app notification. Your continued use of the Service after changes are posted
            constitutes your acceptance of the updated policy.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, wish to exercise your privacy rights,
            or have a complaint, please contact us:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
            <li>Location: Perth, Western Australia</li>
          </ul>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
            If you are not satisfied with our response, you may lodge a complaint with the Office of the
            Australian Information Commissioner (OAIC) at{" "}
            <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer">
              www.oaic.gov.au
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
