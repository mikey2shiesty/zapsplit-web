import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - ZapSplit",
  description: "ZapSplit Terms of Service. Read our terms and conditions for using the ZapSplit bill splitting platform.",
};

const CONTACT_EMAIL = "zapsplit@gmail.com";
const EFFECTIVE_DATE = "18 February 2026";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <a href="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            &larr; Back to ZapSplit
          </a>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Effective Date: {EFFECTIVE_DATE}
          </p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p>
            Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using the ZapSplit
            mobile application and website (collectively, the &ldquo;Service&rdquo;) operated by ZapSplit
            (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
          </p>
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you do not agree,
            do not use the Service.
          </p>

          <h2>1. Eligibility</h2>
          <p>
            You must be at least 18 years of age to use ZapSplit. By creating an account, you represent
            and warrant that:
          </p>
          <ul>
            <li>You are at least 18 years old.</li>
            <li>You are legally capable of entering into a binding agreement.</li>
            <li>You are not prohibited from using the Service under any applicable Australian or international law.</li>
          </ul>

          <h2>2. Description of Service</h2>
          <p>ZapSplit is a bill-splitting platform that allows users to:</p>
          <ul>
            <li>Create and manage shared expenses with friends and other people.</li>
            <li>Scan receipts using AI-powered optical character recognition to automatically extract items and prices.</li>
            <li>Share payment links with anyone, including people who do not have a ZapSplit account.</li>
            <li>Request and collect payments via Stripe.</li>
            <li>Track payment history, balances, and settlement status.</li>
          </ul>
          <p>
            ZapSplit is not a bank, financial institution, or licensed payment facility. We facilitate
            payments through third-party payment processors.
          </p>

          <h2>3. Account Registration</h2>
          <p>To use certain features of the Service, you must create an account. You agree to:</p>
          <ul>
            <li>Provide accurate, current, and complete information during registration.</li>
            <li>Maintain and promptly update your account information.</li>
            <li>Keep your login credentials secure and confidential.</li>
            <li>Accept responsibility for all activity that occurs under your account.</li>
          </ul>
          <p>
            You must notify us immediately if you suspect any unauthorised access to your account.
          </p>

          <h2>4. Payment Terms</h2>
          <p>
            <strong>4.1</strong> All payment processing is handled by Stripe, a PCI-compliant third-party
            payment processor. Your use of payment features is also subject to Stripe&apos;s Services Agreement.
          </p>
          <p>
            <strong>4.2</strong> A platform fee of $0.50 AUD applies per transaction processed through
            the Service. Standard Stripe processing fees also apply and are displayed before you confirm
            any payment.
          </p>
          <p>
            <strong>4.3</strong> You are responsible for ensuring you have sufficient funds or credit
            available for any payments you initiate.
          </p>
          <p>
            <strong>4.4</strong> Refunds and payment disputes are subject to Stripe&apos;s dispute resolution
            process. We will assist where possible but are not liable for payment processing errors caused
            by third parties.
          </p>
          <p>
            <strong>4.5</strong> All amounts displayed in the Service are in Australian Dollars (AUD)
            unless otherwise stated.
          </p>

          <h2>5. Receipt Scanning and AI Processing</h2>
          <p>
            <strong>5.1</strong> The Service uses artificial intelligence (OpenAI&apos;s Vision API) to
            analyse receipt images and extract item names, quantities, and prices.
          </p>
          <p>
            <strong>5.2</strong> By using the receipt scanning feature, you consent to your receipt images
            being transmitted to and processed by OpenAI in accordance with their data usage policies.
          </p>
          <p>
            <strong>5.3</strong> AI-generated results are provided as a convenience and may not always
            be 100% accurate. You are responsible for reviewing and verifying all parsed receipt data
            before creating a split.
          </p>
          <p>
            <strong>5.4</strong> We are not liable for any errors, disputes, or financial losses arising
            from inaccurate receipt parsing.
          </p>

          <h2>6. User Conduct</h2>
          <p>You agree not to use the Service to:</p>
          <ul>
            <li>Engage in any illegal, fraudulent, or deceptive activity.</li>
            <li>Attempt to defraud other users or create false payment requests.</li>
            <li>Upload fabricated, altered, or misleading receipt images.</li>
            <li>Harass, threaten, or abuse other users.</li>
            <li>Attempt to gain unauthorised access to the Service or other users&apos; accounts.</li>
            <li>Use the Service for money laundering, terrorism financing, or any activity that violates applicable anti-money laundering laws.</li>
            <li>Interfere with or disrupt the integrity or performance of the Service.</li>
          </ul>
          <p>
            We reserve the right to suspend or terminate accounts that violate these terms without prior notice.
          </p>

          <h2>7. Intellectual Property</h2>
          <p>
            The Service, including its design, code, features, logos, and content, is owned by ZapSplit
            and protected by Australian and international copyright, trademark, and intellectual property
            laws. You may not copy, modify, distribute, sell, or create derivative works based on the
            Service without our prior written consent.
          </p>

          <h2>8. User Content</h2>
          <p>
            You retain ownership of any content you upload to the Service (such as receipt images and
            profile photos). By uploading content, you grant us a limited, non-exclusive licence to use,
            process, and store that content solely for the purpose of providing the Service to you.
          </p>

          <h2>9. Third-Party Services</h2>
          <p>
            The Service integrates with third-party services including Stripe (payments), Supabase
            (infrastructure), OpenAI (receipt scanning), and Apple/Google (authentication). Your use
            of these services is subject to their respective terms and conditions. We are not responsible
            for the actions, content, or policies of any third-party service.
          </p>

          <h2>10. Disclaimers</h2>
          <p>
            <strong>10.1</strong> THE SERVICE IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo;
            BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p>
            <strong>10.2</strong> We do not guarantee that the Service will be uninterrupted, secure, or
            error-free at all times.
          </p>
          <p>
            <strong>10.3</strong> We are not a party to any financial arrangements between users. We are
            not responsible for disputes between users regarding split amounts, payment obligations, or any
            other matters arising from shared expenses.
          </p>

          <h2>11. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by the Australian Consumer Law and other applicable legislation:
          </p>
          <ul>
            <li>ZapSplit shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to your use of the Service.</li>
            <li>Our total liability for any claim arising from the Service shall not exceed the total fees you have paid to us in the 12 months preceding the claim.</li>
            <li>Nothing in these Terms excludes or limits liability that cannot be excluded or limited under Australian law, including liability under the Australian Consumer Law.</li>
          </ul>

          <h2>12. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless ZapSplit and its officers, directors,
            employees, and agents from and against any claims, liabilities, damages, losses, or expenses
            (including reasonable legal fees) arising out of or in any way connected with your use of the
            Service, your violation of these Terms, or your violation of any rights of another person.
          </p>

          <h2>13. Termination</h2>
          <p>
            <strong>13.1</strong> You may delete your account at any time through the app settings. Upon
            deletion, your data will be handled in accordance with our Privacy Policy.
          </p>
          <p>
            <strong>13.2</strong> We may suspend or terminate your access to the Service at any time,
            with or without cause, including for violation of these Terms.
          </p>
          <p>
            <strong>13.3</strong> Upon termination, your right to use the Service ceases immediately.
            Any outstanding payment obligations survive termination.
          </p>

          <h2>14. Governing Law and Dispute Resolution</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of Western Australia.
            Any disputes arising from these Terms or the Service shall be subject to the exclusive
            jurisdiction of the courts of Western Australia.
          </p>

          <h2>15. Changes to These Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify you of material changes
            by updating the &ldquo;Effective Date&rdquo; at the top and, where appropriate, through an
            in-app notification. Your continued use of the Service after changes are posted constitutes
            your acceptance of the revised Terms. If you do not agree with the changes, you must stop
            using the Service.
          </p>

          <h2>16. Severability</h2>
          <p>
            If any provision of these Terms is found to be invalid or unenforceable by a court of
            competent jurisdiction, the remaining provisions shall continue in full force and effect.
          </p>

          <h2>17. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
            <li>Location: Perth, Western Australia</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
