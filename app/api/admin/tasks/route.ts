
import { NextResponse } from 'next/server';
import { createTask, getTasks, softDeleteTask } from '@/lib/server/data/tasks';

export async function GET() {
  const tasks = await getTasks();
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();
  const task = await createTask(body);
  return NextResponse.json(task, { status: 201 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

  const deleted = await softDeleteTask(id);
  if (!deleted) return NextResponse.json({ error: 'Task not found' }, { status: 404 });

  return NextResponse.json({ success: true, id });
}
