'use client';

import { CalendarCheck2, Clock3, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Healer, HealerAvailabilitySlot } from '@/lib/mock/healers';

interface BookingRequestModalProps {
  healer: Healer;
  slot: HealerAvailabilitySlot | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function BookingRequestModal({
  healer,
  slot,
  open,
  onOpenChange,
  onConfirm,
}: BookingRequestModalProps) {
  if (!slot) {
    return null;
  }

  const dateLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${slot.date}T12:00:00`));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-terra/15 bg-cream sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-terra">
            <CalendarCheck2 className="h-5 w-5" />
            <DialogTitle className="font-serif text-xl text-earth">
              Confirm consultation request
            </DialogTitle>
          </div>
          <DialogDescription className="mt-2 text-sm text-muted">
            Your request will be shared with {healer.name} for review.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 rounded-2xl border border-terra/10 bg-white p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-terra/10 p-2 text-terra">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-earth">{healer.name}</p>
              <p className="mt-1 text-sm text-muted">{healer.country} · {healer.region}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-cream/70 px-3 py-3 text-sm text-earth">
            <Clock3 className="h-4 w-4 text-terra" />
            <span>
              {dateLabel} · {slot.startTime} – {slot.endTime}
            </span>
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm} className="rounded-full bg-terra text-white hover:bg-earth">
            Request slot
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
