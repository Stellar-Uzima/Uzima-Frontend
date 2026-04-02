
import { NextResponse } from 'next/server';

const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', joined: '2026-01-10' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'healer', status: 'active', joined: '2026-02-15' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'suspended', joined: '2026-03-01' },
  // ... more users
];

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
