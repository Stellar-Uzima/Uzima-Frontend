'use client';

import { useEffect } from 'react';
import { logError } from '@/lib/error-logger';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logError(error, {
      digest: error.digest,
      type: 'contribute_error',
    });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4 pt-28 pb-20">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-6xl" aria-hidden="true">⚠️</div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-earth">
            Something went wrong
          </h1>
          <p className="text-muted-foreground">
            We encountered an error loading the contribution form. Please try again.
          </p>
        </div>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
