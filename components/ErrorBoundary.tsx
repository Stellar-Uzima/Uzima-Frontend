'use client';

import React from 'react';
import { logError } from '@/lib/error-logger';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  componentName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError(error, {
      componentStack: errorInfo.componentStack ?? undefined,
      componentName: this.props.componentName,
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-destructive/10 border border-destructive/20 text-center">
          <div className="mb-3 text-4xl" aria-hidden="true">⚠️</div>
          <h3 className="text-lg font-semibold text-destructive mb-1">
            Something went wrong
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {this.props.componentName 
              ? `Error loading ${this.props.componentName}.` 
              : 'This section encountered an error.'}{' '}
            Please try again.
          </p>
          <button
            onClick={this.handleRetry}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
