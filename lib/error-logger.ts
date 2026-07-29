interface ErrorLogContext {
  componentStack?: string;
  componentName?: string;
  [key: string]: unknown;
}

export function logError(error: Error, context?: ErrorLogContext): void {
  console.error('[Error]', {
    message: error.message,
    name: error.name,
    stack: error.stack,
    ...context,
  });

  if (typeof window !== 'undefined' && 'Sentry' in window) {
    const Sentry = (window as unknown as { Sentry: { captureException: (error: Error, context?: { extra?: ErrorLogContext }) => void } }).Sentry;
    Sentry.captureException(error, {
      extra: context,
    });
  }
}

export function logInfo(message: string, context?: Record<string, unknown>): void {
  console.info('[Info]', message, context);
}

export function logWarning(message: string, context?: Record<string, unknown>): void {
  console.warn('[Warning]', message, context);
}
