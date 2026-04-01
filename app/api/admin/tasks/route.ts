
import { NextResponse } from 'next/server';

const mockTasks = [
  { id: '1', title: 'Daily Meditation', category: 'Mental Health', rewardXLM: 10, status: 'active', createdAt: '2026-03-30' },
  { id: '2', title: 'Hygiene Check', category: 'Hygiene', rewardXLM: 5, status: 'active', createdAt: '2026-03-29' },
  { id: '3', title: 'Morning Exercise', category: 'Exercise', rewardXLM: 15, status: 'inactive', createdAt: '2026-03-28' },
];

export async function GET() {
  return NextResponse.json(mockTasks);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newTask = {
    id: Math.random().toString(36).substr(2, 9),
    ...body,
    status: 'active',
    createdAt: new Date().toISOString().split('T')[0],
  };
  return NextResponse.json(newTask, { status: 201 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

  // Simulate soft-delete
  return NextResponse.json({ success: true, id });
}
