
import { NextResponse } from 'next/server';

const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', joined: '2026-01-10' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'healer', status: 'active', joined: '2026-02-15' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'suspended', joined: '2026-03-01' },
  // ... more users
];

export async function PATCH(request: Request) {
  const body = await request.json();
  const { ids, action }: { ids: string[]; action: 'suspend' | 'reactivate' } = body;

  if (!Array.isArray(ids) || !['suspend', 'reactivate'].includes(action)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const newStatus = action === 'suspend' ? 'suspended' : 'active';
  const updatedIds = new Set(ids);

  mockUsers.forEach(u => {
    if (updatedIds.has(u.id)) u.status = newStatus;
  });

  const updated = mockUsers.filter(u => updatedIds.has(u.id));
  return NextResponse.json({ updated });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const size = 20;

  // Simulate search filter
  const search = searchParams.get('search')?.toLowerCase() || '';
  const filteredUsers = mockUsers.filter(u =>
    u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search)
  );

  const start = (page - 1) * size;
  const end = start + size;
  const paginatedUsers = filteredUsers.slice(start, end);

  return NextResponse.json({
    users: paginatedUsers,
    totalCount: filteredUsers.length,
    totalPages: Math.ceil(filteredUsers.length / size),
  });
}
