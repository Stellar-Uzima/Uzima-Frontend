
import { NextResponse } from 'next/server';
import {
  decideVerificationRequest,
  getPendingVerificationRequests,
} from '@/lib/server/data/healer-verifications';

export async function GET() {
  const requests = await getPendingVerificationRequests();
  return NextResponse.json(requests);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { id, action } = body;

  if (!id || !['approve', 'reject'].includes(action)) {
    return NextResponse.json({ error: 'ID and a valid action are required' }, { status: 400 });
  }

  const updated = await decideVerificationRequest(id, action);
  if (!updated) return NextResponse.json({ error: 'Verification request not found' }, { status: 404 });

  return NextResponse.json({ success: true, id, action });
}
