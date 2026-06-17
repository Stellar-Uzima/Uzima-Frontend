"use client";

import dynamic from "next/dynamic";

const OfflineBanner = dynamic(
  () => import("@/components/pwa/OfflineBanner").then((mod) => mod.OfflineBanner),
  { loading: () => null, ssr: false }
);

const InstallPrompt = dynamic(
  () => import("@/components/pwa/InstallPrompt").then((mod) => mod.InstallPrompt),
  { loading: () => null, ssr: false }
);

export function PwaShell() {
  return (
    <>
      <div role="status" aria-live="polite" aria-atomic="true">
        <OfflineBanner />
      </div>
      <InstallPrompt />
    </>
  );
}