
import { NextResponse } from 'next/server';
import { getTasks } from '@/lib/server/data/tasks';
import { getUsers } from '@/lib/server/data/users';

export async function GET() {
  const [users, tasks] = await Promise.all([getUsers(), getTasks()]);
  const today = new Date().toISOString().split('T')[0];

  return NextResponse.json({
    totalUsers: users.length,
    tasksToday: tasks.filter(t => t.createdAt === today).length,
    xlmDistributed: tasks.reduce((sum, t) => sum + t.rewardXLM, 0),
    activeStreaks: users.filter(u => u.status === 'active').length,
  });
}
