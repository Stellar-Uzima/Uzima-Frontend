'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Info, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface VerificationRequest {
  id: string;
  name: string;
  specialties: string[];
  region: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export default function HealerVerificationQueue() {
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const response = await fetch('/api/admin/healers/verification');
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Failed to fetch requests:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, []);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      const response = await fetch('/api/admin/healers/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action }),
      });
      if (response.ok) {
        setRequests(prev => prev.filter(r => r.id !== id));
        toast.success(`Healer ${action === 'approve' ? 'approved' : 'rejected'} successfully.`);
      }
    } catch (error) {
      toast.error('Failed to process action.');
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-terra/10 shadow-sm p-4 sm:p-6 animate-scaleIn">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="font-serif text-xl font-bold text-earth">Healer Verification</h3>
          <p className="text-sm text-muted">Review and verify traditional health practitioners.</p>
        </div>
        {/*
          FIX: Badge moves below title on mobile (flex-col) so it never
          overlaps or clips the heading on narrow screens.
        */}
        <Badge className="bg-amber/10 text-amber border-none font-bold px-3 py-1 rounded-full self-start sm:self-auto shrink-0">
          {requests.length} Pending
        </Badge>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {loading ? (
          [...Array(2)].map((_, i) => (
            <div key={i} className="h-28 sm:h-32 bg-gray-50 rounded-2xl animate-pulse" />
          ))
        ) : requests.length === 0 ? (
          <div className="py-16 sm:py-20 text-center text-muted">
            No pending verification requests.
          </div>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              /*
                FIX: Changed from flex-col md:flex-row to always flex-col on
                mobile. Info block is full-width, action buttons sit in their
                own row below it — preventing the buttons from being pushed
                off-screen on narrow phones.
              */
              className="p-4 sm:p-5 rounded-2xl border border-terra/5 bg-cream/5 flex flex-col gap-4"
            >
              {/* Info block */}
              <div className="flex-1 min-w-0">
                {/*
                  FIX: Name + region badge wrap on very small screens instead
                  of overflowing. Name truncates with min-w-0.
                */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h4 className="font-bold text-earth text-base sm:text-lg truncate min-w-0">
                    {request.name}
                  </h4>
                  <Badge
                    variant="outline"
                    className="text-[10px] font-bold uppercase tracking-wider text-muted border-muted/20 shrink-0"
                  >
                    {request.region}
                  </Badge>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {request.specialties.map((s, i) => (
                    <span
                      key={i}
                      className="text-xs text-sage font-medium bg-sage/10 px-2 py-0.5 rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 shrink-0" />
                    Submitted: {request.submittedAt}
                  </span>
                  <span className="flex items-center gap-1 hover:text-terra transition-colors cursor-pointer font-medium underline decoration-terra/30 underline-offset-4">
                    <Info className="w-3 h-3 shrink-0" /> View Credentials
                  </span>
                </div>
              </div>

              {/*
                FIX: Action buttons are full-width on mobile so they're easy
                to tap. On sm+ they sit inline at auto width.
              */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                <Button
                  onClick={() => handleAction(request.id, 'reject')}
                  variant="outline"
                  className="rounded-xl border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all font-medium w-full sm:w-auto"
                >
                  <XCircle className="w-4 h-4 mr-2 shrink-0" /> Reject
                </Button>
                <Button
                  onClick={() => handleAction(request.id, 'approve')}
                  className="rounded-xl bg-sage hover:bg-forest text-white transition-all font-medium w-full sm:w-auto"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2 shrink-0" /> Approve
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}