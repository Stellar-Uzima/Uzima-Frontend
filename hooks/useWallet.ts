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

  // The server is the source of truth for "is a wallet connected", keyed by
  // the wallet_session cookie - not localStorage, which is just a client
  // cache for a snappier first paint. This makes a connection survive a
  // localStorage clear or opening the app in a new tab on the same session.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/wallet/connect", { method: "GET" });
        if (!res.ok || cancelled) return;

        const data = await res.json();
        if (cancelled) return;

        const persistedAddress: string | null = data?.address ?? null;
        setAddress(persistedAddress);

        try {
          if (persistedAddress) {
            window.localStorage.setItem("freighterAddress", persistedAddress);
          } else {
            window.localStorage.removeItem("freighterAddress");
          }
        } catch {}
      } catch {
        // Couldn't reach the server - keep whatever we already loaded from
        // localStorage rather than clearing a possibly-valid connection.
      }
    })();

    return () => {
      cancelled = true;
    };
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
        // Persist server-side so the connection survives a localStorage
        // clear or a reload on a different device with the same session.
        try {
          const res = await fetch("/api/wallet/connect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address: addr.address }),
          });
          if (!res.ok) {
            toast?.({
              title: "Wallet connected locally only",
              description: "Could not save this connection to your account; it may not persist across devices.",
              variant: "default",
            });
          }
        } catch {
          toast?.({
            title: "Wallet connected locally only",
            description: "Could not save this connection to your account; it may not persist across devices.",
            variant: "default",
          });
        }
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
      const res = await fetch("/api/wallet/disconnect", { method: "POST" });
      if (!res.ok) {
        toast?.({
          title: "Disconnected locally",
          description: "Could not clear this connection on the server; it may reappear next time you load the app.",
          variant: "default",
        });
      } else {
        toast?.({ title: "Wallet disconnected" });
      }
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
