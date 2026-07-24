"use client";

import { useEffect, useState } from "react";
import { RefreshCcw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// ── Helpers ───────────────────────────────────────────────────────────────────

function getRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

const OFFLINE_PAGES = [
  { path: "/tasks", label: "Health Tasks" },
  { path: "/", label: "Home" },
  { path: "/offline", label: "Offline Page" },
];

// ── Illustration ──────────────────────────────────────────────────────────────

function NoConnectionIllustration() {
  return (
    <svg
      viewBox="0 0 240 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-52 h-52 mx-auto"
      aria-hidden="true"
    >
      {/* Background glow rings */}
      <circle cx="120" cy="110" r="95" fill="#B84E20" fillOpacity="0.07" />
      <circle cx="120" cy="110" r="70" fill="#B84E20" fillOpacity="0.06" />

      {/* Phone body */}
      <rect x="78" y="45" width="84" height="140" rx="14" fill="white" stroke="#B84E20" strokeWidth="2.5" />
      <rect x="86" y="58" width="68" height="98" rx="6" fill="#FDF5E8" />

      {/* Speaker grille */}
      <rect x="104" y="51" width="32" height="4" rx="2" fill="#B84E20" fillOpacity="0.25" />

      {/* Home bar */}
      <rect x="106" y="172" width="28" height="6" rx="3" fill="#B84E20" fillOpacity="0.2" />

      {/* Wifi arcs — faded/broken */}
      <path d="M104 102 Q120 90 136 102" stroke="#B84E20" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.25" />
      <path d="M97 95 Q120 79 143 95" stroke="#B84E20" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.15" />

      {/* Wifi dot */}
      <circle cx="120" cy="112" r="4" fill="#B84E20" fillOpacity="0.35" />

      {/* X slash */}
      <line x1="111" y1="118" x2="129" y2="136" stroke="#B84E20" strokeWidth="2.8" strokeLinecap="round" />
      <line x1="129" y1="118" x2="111" y2="136" stroke="#B84E20" strokeWidth="2.8" strokeLinecap="round" />

      {/* Side disconnected signals */}
      <path d="M52 95 Q63 82 52 69" stroke="#B84E20" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.2" />
      <path d="M44 102 Q60 83 44 64" stroke="#B84E20" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.13" />
      <path d="M188 95 Q177 82 188 69" stroke="#B84E20" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.2" />
      <path d="M196 102 Q180 83 196 64" stroke="#B84E20" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.13" />

      {/* Sparkles */}
      <path d="M58 52 L60 57 L65 59 L60 61 L58 66 L56 61 L51 59 L56 57 Z" fill="#B84E20" fillOpacity="0.28" />
      <path d="M182 52 L184 57 L189 59 L184 61 L182 66 L180 61 L175 59 L180 57 Z" fill="#B84E20" fillOpacity="0.28" />

      {/* Floating dots */}
      <circle cx="50" cy="148" r="5" fill="#B84E20" fillOpacity="0.18" />
      <circle cx="190" cy="152" r="4" fill="#B84E20" fillOpacity="0.14" />
      <circle cx="42" cy="125" r="3" fill="#B84E20" fillOpacity="0.1" />
      <circle cx="198" cy="120" r="3" fill="#B84E20" fillOpacity="0.1" />
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function OfflinePage() {
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [cachedPages, setCachedPages] = useState<{ path: string; label: string }[]>([]);

  useEffect(() => {
    // Last sync time
    const stored = localStorage.getItem("uzima-last-sync");
    if (stored) setLastSync(getRelativeTime(parseInt(stored, 10)));

    // Dynamically check which pages are in cache
    const checkCached = async () => {
      if (!("caches" in window)) return;
      const available: { path: string; label: string }[] = [];
      for (const page of OFFLINE_PAGES) {
        const match = await caches.match(page.path);
        if (match) available.push(page);
      }
      setCachedPages(available);
    };

    checkCached();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDF5E8] flex flex-col">
      {/* Header */}
      <header className="px-6 py-5">
        <Link href="/" className="inline-flex items-center gap-2.5 no-underline">
          <div className="w-9 h-9 rounded-full bg-[#B84E20] flex items-center justify-center text-[#F5C842] text-sm font-semibold">
            ★
          </div>
          <span className="font-serif font-bold text-[#1A1A1A] text-xl tracking-tight">
            Stellar Uzima
          </span>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-8">

          {/* Illustration */}
          <NoConnectionIllustration />

          {/* Heading */}
          <div className="text-center space-y-3">
            <h1 className="font-serif text-4xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
              You&apos;re offline
            </h1>
            <p className="text-lg text-[#B84E20] font-medium">
              — but your data is safe
            </p>
            <p className="text-sm text-[#6B7280] leading-relaxed max-w-sm mx-auto">
              Check your connection and try again. Any tasks you&apos;ve completed
              will sync automatically when you&apos;re back online.
            </p>
          </div>

          {/* Last sync */}
          {lastSync && (
            <p className="text-center text-xs text-[#6B7280]">
              Last synced:{" "}
              <span className="font-medium text-[#1A1A1A]">{lastSync}</span>
            </p>
          )}

          {/* Available offline pages */}
          {cachedPages.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#B84E20]/10 p-5 space-y-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#B84E20]/70">
                Available offline
              </p>
              <ul className="space-y-2">
                {cachedPages.map((page) => (
                  <li key={page.path}>
                    <Link
                      href={page.path}
                      className="flex items-center gap-3 text-sm font-medium text-[#1A1A1A] hover:text-[#B84E20] transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#5A7A4A] shrink-0" />
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={() => window.location.reload()}
              className="w-full bg-[#B84E20] hover:bg-[#A04020] text-white font-semibold h-12 text-base rounded-xl shadow-md shadow-[#B84E20]/20"
            >
              <RefreshCcw className="w-5 h-5 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-5 text-center">
        <p className="text-xs text-[#6B7280]">
          Stellar Uzima works offline to serve communities with limited connectivity
        </p>
      </footer>
    </div>
  );
}
