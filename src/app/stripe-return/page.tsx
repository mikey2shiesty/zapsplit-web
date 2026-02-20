"use client";

import { useEffect } from "react";

export default function StripeReturnPage() {
  useEffect(() => {
    // Try to redirect back to the app via deep link
    window.location.href = "zapsplit://stripe-return";
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center dark:bg-black">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
        <svg
          className="h-10 w-10 text-green-600 dark:text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        Setup Complete
      </h1>
      <p className="mb-8 text-gray-500 dark:text-gray-400">
        Your bank account has been connected. You can close this page and return to ZapSplit.
      </p>
      <a
        href="zapsplit://stripe-return"
        className="rounded-xl bg-blue-500 px-8 py-3.5 text-lg font-semibold text-white transition-colors hover:bg-blue-600"
      >
        Return to App
      </a>
    </div>
  );
}
