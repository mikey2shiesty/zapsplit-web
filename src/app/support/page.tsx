import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support - ZapSplit",
  description: "Get help with ZapSplit. Contact our support team for assistance with bill splitting, payments, and more.",
};

const CONTACT_EMAIL = "zapsplit@gmail.com";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <a href="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            &larr; Back to ZapSplit
          </a>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
            Help & Support
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Need help with ZapSplit? We&apos;re here for you.
          </p>
        </div>

        {/* Contact Card */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Contact Us
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            For any questions, issues, or feedback, reach out to us via email. We aim to respond within 24 hours.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=ZapSplit%20Support%20Request`}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
              <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
            </svg>
            {CONTACT_EMAIL}
          </a>
        </div>

        {/* FAQ Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <FaqItem
              question="How do I split a bill?"
              answer="Open ZapSplit, tap 'New Split', enter the total amount and title, select the friends you want to split with, choose a split method (equal, custom, or receipt scan), and share the payment link."
            />
            <FaqItem
              question="How does receipt scanning work?"
              answer="Take a photo of your receipt or choose one from your gallery. Our AI will automatically extract item names and prices. You can then assign items to specific people for a fair split."
            />
            <FaqItem
              question="How do people without the app pay?"
              answer="When you create a split, you can add people who don't have ZapSplit. Share the payment link via text, WhatsApp, or any messaging app. They can pay directly through the web page — no app download required."
            />
            <FaqItem
              question="What payment methods are accepted?"
              answer="We accept all major credit and debit cards through Stripe. Apple Pay and Google Pay are also supported on compatible devices."
            />
            <FaqItem
              question="Is my payment information secure?"
              answer="Yes. We never store your card details. All payments are processed by Stripe, a PCI-compliant payment processor trusted by millions of businesses worldwide."
            />
            <FaqItem
              question="How do I delete my account?"
              answer="Go to Settings > Delete Account in the app. You'll need to type 'delete my account' to confirm. All your data will be permanently removed within 30 days."
            />
            <FaqItem
              question="What fees does ZapSplit charge?"
              answer="ZapSplit charges a platform fee of $0.50 AUD per transaction. Standard card processing fees from Stripe also apply and are displayed before you confirm any payment."
            />
            <FaqItem
              question="Can I get a refund?"
              answer="Refunds are handled through Stripe's dispute process. If you believe a payment was made in error, contact us at the email above and we'll help resolve it."
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            App Information
          </h2>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p><strong className="text-gray-900 dark:text-white">Developer:</strong> ZapSplit</p>
            <p><strong className="text-gray-900 dark:text-white">Location:</strong> Perth, Western Australia</p>
            <p><strong className="text-gray-900 dark:text-white">Contact:</strong>{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="mt-4">
              <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                Privacy Policy
              </a>
              {" "}&middot;{" "}
              <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-gray-900 dark:text-white font-medium">
        {question}
        <svg
          className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </summary>
      <p className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {answer}
      </p>
    </details>
  );
}
