"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useWallet from "@/hooks/useWallet";
import { toast } from "@/components/ui/use-toast";

type WalletConnectModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function WalletConnectModal({
  open,
  onOpenChange,
}: WalletConnectModalProps) {
  const { isInstalled, isConnecting, connect } = useWallet();

  async function handleFreighter() {
    if (!isInstalled) {
      // Link to Freighter install page
      window.open("https://www.freighterwallet.com/", "_blank");
      return;
    }

    try {
      const addr = await connect();
      if (addr) {
        onOpenChange(false);
        // give parent a chance to refresh profile
        try {
          // small delay then reload so server-backed profile can pick up persisted address
          setTimeout(() => window.location.reload(), 400);
        } catch {}
      }
    } catch (err) {
      toast?.({ title: "Error", description: "Could not connect to Freighter", variant: "error" });
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-terra/15 bg-cream">
        <DialogHeader>
          <DialogTitle className="font-serif text-earth text-xl">
            Connect wallet
          </DialogTitle>
          <DialogDescription>
            Choose a Stellar-compatible wallet. This is a placeholder flow until
            live wallet integration is enabled.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            className="justify-start rounded-xl border-terra/20 h-12"
            onClick={handleFreighter}
            disabled={isConnecting}
          >
            {isInstalled ? (isConnecting ? 'Connecting…' : 'Freighter') : 'Install Freighter'}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="justify-start rounded-xl border-terra/20 h-12"
          >
            xBull Wallet
          </Button>
          <Button
            type="button"
            variant="outline"
            className="justify-start rounded-xl border-terra/20 h-12"
          >
            Albedo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
