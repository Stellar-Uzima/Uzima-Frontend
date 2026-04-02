
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
    <div className="bg-white rounded-3xl border border-terra/10 shadow-sm p-6 animate-scaleIn">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-serif text-xl font-bold text-earth">Healer Verification</h3>
          <p className="text-sm text-muted">Review and verify traditional health practitioners.</p>
        </div>
        <Badge className="bg-amber/10 text-amber border-none font-bold px-3 py-1 rounded-full">
          {requests.length} Pending
        </Badge>
      </div>

      <div className="space-y-4">
        {loading ? (
          [...Array(2)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-50 rounded-2xl animate-pulse" />
          ))
        ) : requests.length === 0 ? (
          <div className="py-20 text-center text-muted">No pending verification requests.</div>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              className="p-6 rounded-2xl border border-terra/5 bg-cream/5 flex flex-col md:flex-row items-center gap-6"
            >
              <div className="flex-1 w-full">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-earth text-lg">{request.name}</h4>
                  <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider text-muted border-muted/20">
                    {request.region}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {request.specialties.map((s, i) => (
                    <span key={i} className="text-xs text-sage font-medium bg-sage/10 px-2 py-0.5 rounded-md">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Submitted: {request.submittedAt}
                  </span>
                  <span className="flex items-center gap-1 hover:text-terra transition-colors cursor-pointer font-medium underline decoration-terra/30 underline-offset-4">
                    <Info className="w-3 h-3" /> View Credentials
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Button
                  onClick={() => handleAction(request.id, 'reject')}
                  variant="outline"
                  className="rounded-xl border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all font-medium py-5 px-6"
                >
                  <XCircle className="w-4 h-4 mr-2" /> Reject
                </Button>
                <Button
                  onClick={() => handleAction(request.id, 'approve')}
                  className="rounded-xl bg-sage hover:bg-forest text-white transition-all font-medium py-5 px-6"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
