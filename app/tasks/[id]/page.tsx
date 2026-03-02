import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { notFound } from 'next/navigation'

import { getTaskById } from '@/lib/mock/tasks'
import { TaskDetailPage } from '@/components/tasks/TaskDetailPage'

interface TaskPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function TaskPage({ params }: TaskPageProps) {
  const { id } = await params
  const task = getTaskById(id)

  if (!task) {
    notFound()
  }

  return (
    <>
      <Navigation />
      <TaskDetailPage task={task} />
      <Footer />
    </>
  )
}

