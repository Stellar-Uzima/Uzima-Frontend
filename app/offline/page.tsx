"use client";

import React from "react";
import { WifiOff, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function OfflinePage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FDF5E8] p-4">
      <Card className="max-w-md w-full shadow-2xl border-2 border-[#B84E20]/10">
        <CardContent className="pt-12 pb-8 text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="bg-[#B84E20]/10 p-6 rounded-full">
              <WifiOff className="w-16 h-16 text-[#B84E20]" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-[#1A1A1A]">
              You're Offline
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              No internet connection detected. Don't worry — tasks you complete
              will be saved locally and synced automatically when you reconnect.
            </p>
          </div>

          {/* Info Card */}
          <div className="bg-[#5A7A4A]/10 border border-[#5A7A4A]/20 rounded-lg p-4 text-left">
            <h3 className="font-semibold text-[#5A7A4A] mb-2 text-sm">
              What you can do offline:
            </h3>
            <ul className="space-y-1 text-sm text-[#5A7A4A]">
              <li className="flex items-start gap-2">
                <span className="text-lg leading-none">•</span>
                <span>View cached health tasks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg leading-none">•</span>
                <span>Complete and log activities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg leading-none">•</span>
                <span>Browse previously loaded content</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={handleRefresh}
              className="w-full bg-[#B84E20] hover:bg-[#A04020] text-white font-semibold h-12 text-base rounded-xl"
            >
              <RefreshCcw className="w-5 h-5 mr-2" />
              Try Again
            </Button>
            
            <Link href="/" className="block">
              <Button
                variant="outline"
                className="w-full border-2 border-[#B84E20]/20 hover:bg-[#B84E20]/5 font-semibold h-12 text-base rounded-xl"
              >
                <Home className="w-5 h-5 mr-2" />
                Go to Home
              </Button>
            </Link>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-muted-foreground pt-4">
            Stellar Uzima works offline to serve communities with limited
            connectivity
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
