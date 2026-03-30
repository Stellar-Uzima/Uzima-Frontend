import TaskWizardWrapper from "@/components/tasks/TaskWizardWrapper";

interface Task {
  id: string;
  title: string;
  description: string;
  whyItMatters: string;
  instructions: string[];
  proofType: "photo" | "self_report";
  rewardXLM: number;
}

async function getTask(id: string): Promise<Task | null> {
  const tasks: Record<string, Task> = {
    "task-photo-1": {
      id: "task-photo-1",
      title: "Handwashing Verification",
      description: "Demonstrate proper 20-second handwashing technique.",
      whyItMatters: "Handwashing with soap reduces diarrhoeal disease risk by up to 47% and is one of the most effective ways to prevent the spread of infections in your community.",
      instructions: [
        "Wet hands with clean running water (warm or cold).",
        "Apply soap and lather well — backs of hands, between fingers, under nails.",
        "Scrub for at least 20 seconds (hum Happy Birthday twice).",
        "Rinse thoroughly und running water.",
        "Dry with a clean towel or air dry.",
      ],
      proofType: "photo",
      rewardXLM: 0.5,
    },
    "task-self-1": {
      id: "task-self-1",
      title: "Daily Blood Pressure Log",
      description: "Record your morning blood pressure reading.",
      whyItMatters: "Regular monitoring helps detect hypertension early, reducing stroke and heart attack risk by up to 40% when managed correctly.",
      instructions: [
        "Sit quietly for 5 minutes before measuring.",
        "Wrap cuff snugly 2-3 cm above the elbow.",
        "Keep feet flat on the floor, arm at heart level.",
        "Take reading and note: systolic / diastolic / pulse.",
        "Record in your health diary or app.",
      ],
      proofType: "self_report",
      rewardXLM: 0.25,
    },
  };

  return tasks[id] ?? null;
}

export default async function TaskPage({ params }: { params: { id: string } }) {
  const task = await getTask(params.id);

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="text-center max-w-xs">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-xl font-bold text-slate-800 mb-2">Task not found</h1>
          <p className="text-slate-500 text-sm">This task may have been completed or removed.</p>
        </div>
      </div>
    );
  }

  return <TaskWizardWrapper task={task} />;
}

