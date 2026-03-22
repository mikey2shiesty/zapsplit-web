"use client";

import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

export default function StripeReturnPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "zapsplit://stripe-return";
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
        {/* Success icon */}
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "rgba(52, 211, 153, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <CheckCircle2 size={36} color="#34D399" strokeWidth={2} />
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
          You&apos;re all set
        </h1>

        <p
          style={{
            fontSize: "15px",
            color: "#A1A1AA",
            lineHeight: 1.6,
            marginBottom: "32px",
          }}
        >
          Your bank account has been connected successfully. You can now receive payments through ZapSplit.
        </p>

        <a
          href="zapsplit://stripe-return"
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
