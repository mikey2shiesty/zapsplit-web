"use client";

import { useEffect } from "react";

export default function StripeRefreshPage() {
  useEffect(() => {
    // Try to redirect back to the app to retry onboarding
    window.location.href = "zapsplit://stripe-refresh";
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center dark:bg-black">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
        <svg
          className="h-10 w-10 text-orange-600 dark:text-orange-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182"
          />
        </svg>
      </div>
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        Session Expired
      </h1>
      <p className="mb-8 text-gray-500 dark:text-gray-400">
        Your setup session has expired. Return to the app to try again.
      </p>
      <a
        href="zapsplit://stripe-refresh"
        className="rounded-xl bg-blue-500 px-8 py-3.5 text-lg font-semibold text-white transition-colors hover:bg-blue-600"
      >
        Return to App
      </a>
    </div>
  );
}
