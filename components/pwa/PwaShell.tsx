"use client";

import dynamic from "next/dynamic";

// These prompts stay available, but we lazy-load them so they do not bloat the shared shell.
const OfflineBanner = dynamic(
  () => import("@/components/pwa/OfflineBanner").then((mod) => mod.OfflineBanner),
  {
    loading: () => null,
    ssr: false,
  },
);

const InstallPrompt = dynamic(
  () => import("@/components/pwa/InstallPrompt").then((mod) => mod.InstallPrompt),
  {
    loading: () => null,
    ssr: false,
  },
);

export function PwaShell() {
  return (
    <>
      <OfflineBanner />
      <InstallPrompt />
    </>
  );
}
