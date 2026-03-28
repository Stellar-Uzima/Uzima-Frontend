import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { getTaskById } from "@/lib/mock/tasks";

const TaskDetailPage = dynamic(
  () => import("@/components/tasks/TaskDetailPage").then((mod) => mod.TaskDetailPage),
  {
    loading: () => <div className="min-h-[520px] bg-cream" aria-hidden="true" />,
  },
);

interface TaskPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TaskPage({ params }: TaskPageProps) {
  const { id } = await params;
  const task = getTaskById(id);

  if (!task) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <TaskDetailPage task={task} />
      <Footer />
    </>
  );
}
