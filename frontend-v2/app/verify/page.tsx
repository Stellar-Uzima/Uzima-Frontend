'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheckIcon, WalletIcon, ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { VerificationForm } from '@/components/verification';

export default function VerifyPage() {
  const [isWalletConnected, setIsWalletConnected] = useState<boolean | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Check wallet connection status on mount
  useEffect(() => {
    // Mock wallet connection check
    // In real app, this would check for Stellar wallet connection
    const checkWalletConnection = () => {
      const walletConnected = localStorage.getItem('wallet-connected') === 'true';
      setIsWalletConnected(walletConnected);
    };

    // Simulate checking wallet
    setTimeout(checkWalletConnection, 500);
  }, []);

  // Mock wallet connection
  const handleConnectWallet = async () => {
    setIsConnecting(true);
    
    try {
      // Simulate wallet connection delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Mock successful connection
      localStorage.setItem('wallet-connected', 'true');
      setIsWalletConnected(true);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Loading state
  if (isWalletConnected === null) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-4">
              <Spinner className="size-8" />
              <p className="text-muted-foreground">Checking wallet connection...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Wallet not connected - show connection prompt
  if (!isWalletConnected) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeftIcon className="size-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-md text-center">
              <CardHeader className="space-y-4">
                <div className="flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4">
                    <WalletIcon className="size-12 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Connect Your Wallet</CardTitle>
                <CardDescription className="text-base">
                  To apply for professional verification, you need to connect your
                  Stellar wallet first. This helps us verify your identity and
                  enables secure credential management.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                  size="lg"
                  className="w-full gap-2"
                >
                  {isConnecting ? (
                    <>
                      <Spinner className="size-4" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <WalletIcon className="size-4" />
                      Connect Stellar Wallet
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground">
                  Don&apos;t have a wallet?{' '}
                  <a
                    href="https://www.stellar.org/learn/the-power-of-stellar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    Learn more about Stellar
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    );
  }

  // Wallet connected - show verification form
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeftIcon className="size-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto mb-8 text-center space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-3">
              <ShieldCheckIcon className="size-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Professional Verification
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Get verified as a medical professional to unlock enhanced features
            and build trust with patients on Stellar Uzima.
          </p>
        </div>

        <VerificationForm />

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Your information is securely stored and will only be used for
            verification purposes. We take your privacy seriously.
          </p>
        </div>
      </div>
    </main>
  );
}
