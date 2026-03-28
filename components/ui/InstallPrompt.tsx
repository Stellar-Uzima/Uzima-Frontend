"use client";

import { usePwaInstall } from "../../hooks/usePwaInstall";

export default function InstallPrompt() {
  const {
    deferredPrompt,
    dismissPrompt,
    handleInstall,
    isIos,
    showPrompt,
  } = usePwaInstall();

  if (isIos && showPrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 bg-white border rounded-md shadow-lg p-4">
        <h2 className="text-lg font-bold mb-2">Install this app</h2>
        <p className="mb-2">On iOS Safari:</p>
        <ol className="list-decimal list-inside mb-2">
          <li>Tap the Share button (⬆)</li>
          <li>Scroll down and tap "Add to Home Screen"</li>
          <li>Tap "Add"</li>
        </ol>
        <button
          className="mt-2 px-4 py-2 bg-gray-200 rounded"
          onClick={dismissPrompt}
        >
          Dismiss
        </button>
      </div>
    );
  }

  if (showPrompt && deferredPrompt) {
    return (
      <button
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md"
        onClick={handleInstall}
      >
        Install App
      </button>
    );
  }

  return null;
}
