"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function StripeRefreshPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "zapsplit://stripe-refresh";
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0A0B",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Card */}
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          padding: "48px 36px",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Refresh icon */}
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "rgba(245, 158, 11, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <RefreshCw size={32} color="#F59E0B" strokeWidth={2} />
        </div>

        <h1
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#FAFAFA",
            marginBottom: "8px",
            letterSpacing: "-0.02em",
          }}
        >
          Session expired
        </h1>

        <p
          style={{
            fontSize: "15px",
            color: "#A1A1AA",
            lineHeight: 1.6,
            marginBottom: "32px",
          }}
        >
          Your setup session has timed out. Return to the app to continue setting up your account.
        </p>

        <a
          href="zapsplit://stripe-refresh"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "14px 24px",
            borderRadius: "12px",
            background: "#FAFAFA",
            color: "#0A0A0B",
            fontSize: "16px",
            fontWeight: 600,
            textDecoration: "none",
            letterSpacing: "-0.01em",
            transition: "opacity 0.15s ease",
          }}
        >
          Return to ZapSplit
        </a>
      </div>

      {/* Footer */}
      <p
        style={{
          marginTop: "24px",
          fontSize: "13px",
          color: "#52525B",
        }}
      >
        Secured by Stripe
      </p>
    </div>
  );
}
