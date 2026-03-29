"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type WalletConnectModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function WalletConnectModal({
  open,
  onOpenChange,
}: WalletConnectModalProps) {
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
          >
            Freighter
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
