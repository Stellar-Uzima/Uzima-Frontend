'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarClock, Clock3 } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import type { Healer, HealerAvailabilitySlot } from '@/lib/mock/healers';

interface AvailabilityCalendarProps {
  healer: Healer;
  onSelectSlot: (slot: HealerAvailabilitySlot) => void;
}

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateLabel(date: string) {
  const [year, month, day] = date.split('-').map(Number);
  const parsedDate = new Date(Date.UTC(year, month - 1, day));

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(parsedDate);
}

function getStatusClasses(status: HealerAvailabilitySlot['status']) {
  switch (status) {
    case 'available':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    case 'requested':
      return 'border-amber-200 bg-amber-50 text-amber-700';
    default:
      return 'border-slate-200 bg-slate-50 text-slate-500';
  }
}

function getStatusLabel(status: HealerAvailabilitySlot['status']) {
  switch (status) {
    case 'available':
      return 'Open';
    case 'requested':
      return 'Requested';
    default:
      return 'Booked';
  }
}

export function AvailabilityCalendar({ healer, onSelectSlot }: AvailabilityCalendarProps) {
  const availability = healer.availability ?? [];

  const initialDate = useMemo(() => {
    const firstOpenSlot = availability.find((slot) => slot.status === 'available');

    if (firstOpenSlot) {
      const [year, month, day] = firstOpenSlot.date.split('-').map(Number);
      return new Date(Date.UTC(year, month - 1, day));
    }

    return new Date();
  }, [availability]);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate);

  useEffect(() => {
    setSelectedDate(initialDate);
  }, [initialDate]);

  const slotsByDate = useMemo(() => {
    const grouped = new Map<string, HealerAvailabilitySlot[]>();

    availability.forEach((slot) => {
      const existing = grouped.get(slot.date) ?? [];
      existing.push(slot);
      grouped.set(slot.date, existing);
    });

    return grouped;
  }, [availability]);

  const selectedDateKey = selectedDate ? formatDateKey(selectedDate) : null;
  const slotsForSelectedDate = selectedDateKey ? (slotsByDate.get(selectedDateKey) ?? []) : [];

  const hasDayWithStatus = (date: Date, status: HealerAvailabilitySlot['status']) => {
    const key = formatDateKey(date);
    return (slotsByDate.get(key) ?? []).some((slot) => slot.status === status);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-terra/15 bg-cream/70 p-4 shadow-sm sm:p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-terra/10 p-2 text-terra">
            <CalendarClock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-earth">Book a consultation</p>
            <p className="mt-1 text-sm text-muted">
              Choose an open slot below and confirm the request in one step.
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-terra/10 bg-white/90 p-3 sm:p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={selectedDate ?? initialDate}
            fromDate={new Date()}
            className="mx-auto w-full"
            modifiers={{
              available: (date) => hasDayWithStatus(date, 'available'),
              booked: (date) => hasDayWithStatus(date, 'booked'),
              requested: (date) => hasDayWithStatus(date, 'requested'),
            }}
            modifiersClassNames={{
              available: 'text-emerald-700 bg-emerald-50',
              booked: 'text-slate-400 bg-slate-100 opacity-70',
              requested: 'text-amber-700 bg-amber-50',
            }}
          />
        </div>
      </div>

      <div className="rounded-3xl border border-terra/15 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-earth">
              {selectedDate ? formatDateLabel(selectedDateKey ?? formatDateKey(selectedDate)) : 'Select a date'}
            </p>
            <p className="mt-1 text-sm text-muted">
              {slotsForSelectedDate.length > 0
                ? `${slotsForSelectedDate.length} consultation slots available for this day.`
                : 'No consultation slots have been scheduled for this date yet.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-medium text-earth">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1">Available</span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">Booked</span>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1">Requested</span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {slotsForSelectedDate.length > 0 ? (
            slotsForSelectedDate.map((slot) => {
              const isAvailable = slot.status === 'available';

              return (
                <Button
                  key={slot.id}
                  type="button"
                  variant="outline"
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left ${getStatusClasses(slot.status)} ${isAvailable ? 'hover:bg-cream' : ''}`}
                  onClick={() => isAvailable && onSelectSlot(slot)}
                  disabled={!isAvailable}
                >
                  <span className="flex items-center gap-2 font-medium">
                    <Clock3 className="h-4 w-4" />
                    {slot.startTime} – {slot.endTime}
                  </span>
                  <span className="rounded-full border border-current/20 px-2.5 py-1 text-[11px] uppercase tracking-[0.2em]">
                    {getStatusLabel(slot.status)}
                  </span>
                </Button>
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-terra/20 bg-cream/60 p-4 text-sm text-muted">
              Try another day to see a different consultation window.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
