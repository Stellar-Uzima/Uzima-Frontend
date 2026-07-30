"use client";

import { useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RedeemCouponModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  code: string;
  onConfirm: () => void;
}

export function RedeemCouponModal({
  isOpen,
  onOpenChange,
  code,
  onConfirm,
}: RedeemCouponModalProps) {
  const qrValue = useMemo(() => `coupon:${code};manual:${code}`, [code]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Coupon code copied to clipboard");
    } catch {
      toast.error("Unable to copy coupon code");
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Redeem coupon</DialogTitle>
          <DialogDescription>
            Show the QR code or the manual code to the healer to complete the
            redemption.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center">
            <div className="mb-3 flex justify-center">
              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <QRCodeSVG value={qrValue} size={220} level="M" includeMargin />
              </div>
            </div>
            <p className="text-sm font-semibold text-emerald-700">
              Scan to redeem
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
              Manual code
            </p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="font-mono text-lg tracking-[0.3em] text-emerald-700">
                {code}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="rounded-md border border-emerald-200 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                Copy code
              </button>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <button
            type="button"
            onClick={handleCopyCode}
            className="rounded-md border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Copy code
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-md border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Confirm redemption
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
