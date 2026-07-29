"use client";

import { useEffect, useState } from "react";

interface CouponCardProps {
  code: string;
  discount: string;
  expiresAt: string;
  specialist: string;
  status: "active" | "used" | "expired";
}

function formatDate(expiresAt: string): string {
  return new Date(expiresAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function CouponCard({
  code,
  discount,
  expiresAt,
  specialist,
  status,
}: CouponCardProps) {
  const [copied, setCopied] = useState(false);
  const [expiringSoon, setExpiringSoon] = useState(false);

  const isInactive = status === "used" || status === "expired";

  useEffect(() => {
    if (status !== "active") {
      setExpiringSoon(false);
      return;
    }

    const expiry = new Date(expiresAt);
    const daysLeft = (expiry.getTime() - Date.now()) / 86_400_000;
    setExpiringSoon(daysLeft > 0 && daysLeft <= 7);
  }, [expiresAt, status]);

  const handleCopy = async () => {
    if (isInactive) return;

    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-[280px] font-serif group">
      {/* CARD */}
      <div
        className={`
          relative
          rounded-2xl
          border-2
          border-dashed
          p-5
          bg-white
          transition-all
          duration-300
          ease-in-out
          ${isInactive ? "border-gray-300 opacity-60" : "border-emerald-500"}
          ${!isInactive ? "hover:-translate-y-1 hover:shadow-xl" : ""}
        `}
      >
        {/* TOP ROW */}
        <div className="flex justify-between mb-3">
          <span className="text-[11px] uppercase text-gray-500 tracking-wider">
            {specialist}
          </span>

          <span
            className={`
              text-[10px]
              font-bold
              px-2 py-1
              rounded-full
              capitalize
              transition-all
              duration-300
              ease-in-out
              ${
                status === "active"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-gray-100 text-gray-400"
              }
              group-hover:scale-105
            `}
          >
            {status}
          </span>
        </div>

        {/* DISCOUNT */}
        <div
          className={`
            text-center
            text-4xl
            font-black
            my-4
            transition-colors
            duration-300
            ease-in-out
            ${isInactive ? "text-gray-400" : "text-emerald-600"}
          `}
        >
          {discount}
        </div>

        {/* EXPIRY */}
        <div className="text-center mb-4 text-sm">
          <span
            className={`
              transition-colors
              duration-300
              ease-in-out
              ${
                expiringSoon
                  ? "text-amber-500 font-semibold"
                  : "text-gray-400"
              }
            `}
          >
            {expiringSoon ? "⚠️ " : ""}Expires {formatDate(expiresAt)}
          </span>
        </div>

        {/* CODE + COPY */}
        <div className="flex items-center gap-2">
          <span
            className={`
              flex-1
              text-center
              font-mono
              tracking-[0.3em]
              text-sm
              p-2
              rounded-md
              transition-all
              duration-300
              ease-in-out
              ${
                isInactive
                  ? "bg-gray-100 text-gray-400"
                  : "bg-emerald-50 text-emerald-700"
              }
            `}
          >
            {code}
          </span>

          <button
            onClick={handleCopy}
            disabled={isInactive}
            className={`
              px-3 py-2
              rounded-md
              text-xs
              font-bold
              transition-all
              duration-300
              ease-in-out
              active:scale-95
              ${
                isInactive
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              }
            `}
          >
            {copied ? "✅ Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* OVERLAY */}
      {isInactive && (
        <div className="absolute inset-0 rounded-2xl flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
          <span className="text-gray-400 font-black text-lg tracking-[4px] rotate-[-12deg] border border-gray-300 px-4 py-1 rounded">
            {status}
          </span>
        </div>
      )}
    </div>
  );
}