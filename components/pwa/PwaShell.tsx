"use client";

import dynamic from "next/dynamic";

const OfflineBanner = dynamic(
  () =>
    import("@/components/pwa/OfflineBanner").then((mod) => mod.OfflineBanner),
  { loading: () => null, ssr: false }
);

const InstallPrompt = dynamic(
  () =>
    import("@/components/pwa/InstallPrompt").then((mod) => mod.InstallPrompt),
  { loading: () => null, ssr: false }
);

export function PwaShell() {
  return (
    <>
      {/* 
        aria-live region: screen readers will announce changes
        inside OfflineBanner (online / offline status messages).
      */}
      <div role="status" aria-live="polite" aria-atomic="true">
        <OfflineBanner />
      </div>

      {/*
        InstallPrompt handles the PWA "Add to Home Screen" flow.
        Enhancement ideas:
        - Pass a custom onInstall callback to track installs (analytics)
        - Add a delay prop so it doesn't appear on first visit
        - Gate it behind a user preference flag
      */}
      <InstallPrompt />

      {/*
        TODO — enhancement ideas for this shell:

        1. Service-worker update prompt
           Show a "New version available – refresh" banner when
           the SW fires a `waiting` event. Example:
           <SwUpdateBanner />

        2. Push notification opt-in
           After the user has been active for N sessions, prompt
           them to enable push notifications.
           <PushPermissionPrompt />

        3. Background-sync indicator
           Show a subtle spinner / badge while the app is replaying
           queued offline actions after reconnecting.
           <SyncIndicator />

        4. Network quality warning
           Use the Network Information API (navigator.connection) to
           warn users on 2G / slow-2G before they start a heavy action.
           <SlowNetworkWarning />
      */}
    </>
  );
}git checkout -b feat/284-global-network-status-indicator