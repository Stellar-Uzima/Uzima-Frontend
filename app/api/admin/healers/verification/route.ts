
import { NextResponse } from 'next/server';

const mockVerificationRequests = [
  { id: '1', name: 'Dr. John Doe', specialties: ['Herbal Medicine'], region: 'West Africa', status: 'pending', submittedAt: '2026-03-25' },
  { id: '2', name: 'Dr. Jane Smith', specialties: ['Spiritual Healing'], region: 'East Africa', status: 'pending', submittedAt: '2026-03-26' },
];

export async function GET() {
  return NextResponse.json(mockVerificationRequests);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { id, action } = body;
  if (!id || !action) return NextResponse.json({ error: 'ID and action are required' }, { status: 400 });

  // Simulate approval/rejection
  return NextResponse.json({ success: true, id, action });
}
