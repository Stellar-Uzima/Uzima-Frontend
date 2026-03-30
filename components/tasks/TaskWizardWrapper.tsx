"use client";

import { useRouter } from "next/navigation";
import { TaskWizard } from "@/components/tasks/TaskWizard";

interface Task {
  id: string;
  title: string;
  description: string;
  whyItMatters: string;
  instructions: string[];
  proofType: "photo" | "self_report";
  rewardXLM: number;
}

export default function TaskWizardWrapper({ task }: { task: Task }) {
  const router = useRouter();

  const handleSubmit = async (data: {
    proofType: "photo" | "self_report";
    file?: File;
    confirmed?: boolean;
  }) => {
    try {
      if (data.proofType === "photo" && data.file) {
        const formData = new FormData();
        formData.append("taskId", task.id);
        formData.append("proof", data.file);
        const res = await fetch(`/api/tasks/${task.id}/submit`, { method: "POST", body: formData });
        if (!res.ok) throw new Error("Failed to submit photo proof");
      }
      if (data.proofType === "self_report" && data.confirmed) {
        const res = await fetch(`/api/tasks/${task.id}/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ taskId: task.id, confirmed: true }),
        });
        if (!res.ok) throw new Error("Failed to submit self report");
      }
      router.push(`/tasks?submitted=${task.id}`);
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  return <TaskWizard task={task} onSubmit={handleSubmit} onClose={() => router.back()} />;
}
