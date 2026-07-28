"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

let freighterApi: any = null;

export function useWallet() {
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>(() => {
    try {
      return typeof window !== "undefined" ? window.localStorage.getItem("freighterAddress") : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const installed = (window as any).freighter !== undefined;
    setIsInstalled(installed);
    // lazy require so SSR won't break
    try {
      freighterApi = require("@stellar/freighter-api");
    } catch (err) {
      // ignore
    }
  }, []);

  const connect = useCallback(async () => {
    if (!isInstalled) {
      toast?.({ title: "Freighter not installed", description: "Install Freighter to connect your wallet", variant: "default" });
      return null;
    }

    setIsConnecting(true);
    try {
      const { requestAccess, getAddress } = freighterApi || (await import("@stellar/freighter-api"));
      await requestAccess();
      const addr = await getAddress();
      if (addr && addr.address) {
        setAddress(addr.address);
        try {
          window.localStorage.setItem("freighterAddress", addr.address);
        } catch {}
        // attempt to persist server-side if route exists
        try {
          await fetch("/api/wallet/connect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address: addr.address }),
          });
        } catch {}
        toast?.({ title: "Wallet connected" });
        return addr.address;
      }
      throw new Error("No address returned");
    } catch (err: any) {
      const message = err?.message || String(err);
      if (/locked|extension locked/i.test(message)) {
        toast?.({ title: "Freighter locked", description: "Unlock Freighter and try again", variant: "error" });
      } else if (/denied|user rejected/i.test(message)) {
        toast?.({ title: "Connection rejected", description: "You rejected the wallet connection", variant: "error" });
      } else {
        toast?.({ title: "Error", description: message, variant: "error" });
      }
      return null;
    } finally {
      setIsConnecting(false);
    }
  }, [isInstalled]);

  const disconnect = useCallback(async () => {
    try {
      setAddress(null);
      try {
        window.localStorage.removeItem("freighterAddress");
      } catch {}
      await fetch("/api/wallet/disconnect", { method: "POST" });
      toast?.({ title: "Wallet disconnected" });
    } catch {
      toast?.({ title: "Error", description: "Could not disconnect", variant: "error" });
    }
  }, []);

  return {
    isInstalled,
    isConnecting,
    address,
    connect,
    disconnect,
  } as const;
}

export default useWallet;
