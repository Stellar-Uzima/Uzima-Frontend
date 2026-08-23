"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthHeader() {
  const router = useRouter();
  const [hasHistory, setHasHistory] = useState(true);

  useEffect(() => {
    setHasHistory(window.history.length > 1);
  }, []);

  const handleBack = () => {
    if (hasHistory) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <header className="relative flex w-full flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <button
        type="button"
        onClick={handleBack}
        aria-label="Go back"
        className="flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-terra"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <Link
        href="/"
        className="flex items-center gap-2.5 no-underline sm:absolute sm:left-1/2 sm:-translate-x-1/2"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-terra text-xs font-semibold text-gold">
          ★
        </div>
        <span className="font-serif text-lg font-bold tracking-tight text-foreground">
          Stellar Uzima
        </span>
      </Link>
    </header>
  );
}