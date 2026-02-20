"use client";

import { useState } from "react";

// --- The 5 pieces of info our coupon needs ---
interface CouponCardProps {
  code: string;
  discount: string;
  expiresAt: string;
  specialist: string;
  status: "active" | "used" | "expired";
}

// --- Helper: Is the coupon expiring within 7 days? ---
function isExpiringSoon(expiresAt: string): boolean {
  const expiry = new Date(expiresAt);
  const daysLeft = (expiry.getTime() - Date.now()) / 86_400_000;
  return daysLeft > 0 && daysLeft <= 7;
}

// --- Helper: Format date nicely e.g. "Mar 1, 2026" ---
function formatDate(expiresAt: string): string {
  return new Date(expiresAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// --- The main CouponCard component ---
export function CouponCard({
  code,
  discount,
  expiresAt,
  specialist,
  status,
}: CouponCardProps) {
  const [copied, setCopied] = useState(false);

  // "used" and "expired" cards should look greyed out
  const isInactive = status === "used" || status === "expired";

  // Should we show a warning about expiry?
  const expiringSoon = status === "active" && isExpiringSoon(expiresAt);

  // What happens when someone clicks "Copy"
  const handleCopy = async () => {
    if (isInactive) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div
      style={{
        position: "relative",
        width: "280px",
        fontFamily: "Georgia, serif",
      }}
    >
      {/* The card itself — dashed border = classic coupon look */}
      <div
        style={{
          border: `2px dashed ${isInactive ? "#ccc" : "#10b981"}`,
          borderRadius: "16px",
          padding: "20px",
          backgroundColor: "#fff",
        }}
      >
        {/* TOP ROW: Specialist name + Status badge */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: "#888",
              textTransform: "uppercase",
            }}
          >
            {specialist}
          </span>
          <span
            style={{
              fontSize: "11px",
              fontWeight: "bold",
              padding: "2px 8px",
              borderRadius: "999px",
              textTransform: "capitalize",
              backgroundColor: status === "active" ? "#d1fae5" : "#f3f4f6",
              color: status === "active" ? "#065f46" : "#9ca3af",
            }}
          >
            {status}
          </span>
        </div>

        {/* MIDDLE: Big discount text */}
        <div
          style={{
            fontSize: "36px",
            fontWeight: "900",
            textAlign: "center",
            margin: "16px 0",
            color: isInactive ? "#9ca3af" : "#059669",
          }}
        >
          {discount}
        </div>

        {/* EXPIRY DATE — turns orange if expiring soon */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "16px",
            fontSize: "13px",
          }}
        >
          <span
            style={{
              color: expiringSoon ? "#f59e0b" : "#9ca3af",
              fontWeight: expiringSoon ? "bold" : "normal",
            }}
          >
            {expiringSoon ? "⚠️ " : ""}Expires {formatDate(expiresAt)}
          </span>
        </div>

        {/* BOTTOM ROW: Coupon code + Copy button */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              flex: 1,
              textAlign: "center",
              fontFamily: "monospace",
              fontSize: "14px",
              letterSpacing: "3px",
              padding: "8px",
              borderRadius: "8px",
              backgroundColor: isInactive ? "#f3f4f6" : "#ecfdf5",
              color: isInactive ? "#9ca3af" : "#065f46",
            }}
          >
            {code}
          </span>
          <button
            onClick={handleCopy}
            disabled={isInactive}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "none",
              cursor: isInactive ? "not-allowed" : "pointer",
              backgroundColor: isInactive ? "#f3f4f6" : "#d1fae5",
              color: isInactive ? "#9ca3af" : "#065f46",
              fontWeight: "bold",
              fontSize: "12px",
            }}
          >
            {copied ? "✅ Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* GREY OVERLAY for used/expired cards */}
      {isInactive && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "16px",
            backgroundColor: "rgba(255,255,255,0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              border: "2px solid #ccc",
              color: "#aaa",
              fontWeight: "900",
              fontSize: "18px",
              textTransform: "uppercase",
              letterSpacing: "4px",
              padding: "6px 16px",
              borderRadius: "6px",
              transform: "rotate(-15deg)",
            }}
          >
            {status}
          </span>
        </div>
      )}
    </div>
  );
}
