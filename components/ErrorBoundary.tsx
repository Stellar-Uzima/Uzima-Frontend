'use client';

import React from 'react';
import { logError } from '@/lib/error-logger';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  componentName?: string;
  variant?: 'section' | 'page';
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

      if (this.props.variant === 'page') {
        return (
          <div className="min-h-screen flex items-center justify-center bg-cream px-4 py-16">
            <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-white border border-terra/10 shadow-xl">
              <div className="text-6xl animate-bounce" aria-hidden="true">⚠️</div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-earth font-serif">
                  Something went wrong
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {this.props.componentName
                    ? `We encountered an error loading the ${this.props.componentName}.`
                    : 'We encountered an error loading this page.'}{' '}
                  Your progress is safe. Please try again.
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={this.handleRetry}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-full bg-terra text-white hover:bg-terra/90 transition-all hover:shadow-md active:scale-95"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-terra/5 border border-terra/10 text-center">
          <div className="mb-3 text-4xl" aria-hidden="true">⚠️</div>
          <h3 className="text-lg font-semibold text-earth mb-1 font-serif">
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
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-terra text-white hover:bg-terra/90 transition-all active:scale-95"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
