
import { NextResponse } from 'next/server';
import { getUsers, updateUserStatuses } from '@/lib/server/data/users';

export async function PATCH(request: Request) {
  const body = await request.json();
  const { ids, action }: { ids: string[]; action: 'suspend' | 'reactivate' } = body;

  if (!Array.isArray(ids) || !['suspend', 'reactivate'].includes(action)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const newStatus = action === 'suspend' ? 'suspended' : 'active';
  const updated = await updateUserStatuses(ids, newStatus);
  return NextResponse.json({ updated });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const size = 20;

  const search = searchParams.get('search')?.toLowerCase() || '';
  const users = await getUsers();
  const filteredUsers = users.filter(u =>
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
