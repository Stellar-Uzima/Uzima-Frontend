import React, { useState, useEffect } from 'react';

// Structured Task Data Interface
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
  assignedTo: string;
}

interface TaskDetailProps {
  taskId: string;
}

export const TaskDetail: React.FC<TaskDetailProps> = ({ taskId }) => {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Re-trigger loading sequence if taskId changes
    setIsLoading(true);
    
    // Simulate asynchronous data pipeline fetch execution
    const fetchTaskDetails = async () => {
      try {
        // Replace with your real API endpoint orchestration layer:
        // const res = await fetch(`/api/tasks/${taskId}`);
        // const data = await res.json();
        
        await new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5s simulated network lag
        
        const mockTask: Task = {
          id: taskId,
          title: "Implement Secure Multi-Signer Ledger Escrow",
          description: "Develop the Soroban smart contract logic to track structural budget boundaries and validate atomic verification weights across multisig states.",
          status: "In Progress",
          dueDate: "2026-07-15",
          assignedTo: "Muhammad A. Yahaya"
        };
        
        setTask(mockTask);
      } catch (err) {
        setError("Failed to resolve task specification parameters.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  // 1. Structural Skeleton Loading State (Prevents Layout Shifting)
  if (isLoading) {
    return (
      <div className="p-6 max-w-3xl mx-auto space-y-6 animate-pulse">
        {/* Top Breadcrumb Skeleton */}
        <div className="h-4 w-24 bg-gray-200 rounded"></div>

        <div className="border border-gray-200 rounded-xl p-6 bg-white space-y-6">
          {/* Header Block & Badge Skeletons */}
          <div className="flex justify-between items-start">
            <div className="space-y-3 w-3/4">
              <div className="h-7 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
          </div>

          <hr className="border-gray-100" />

          {/* Core Body Paragraph Skeletons */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          </div>

          {/* Bottom Meta Parameters Skeleton */}
          <div className="pt-4 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              <div className="h-5 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              <div className="h-5 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Error Fallback State
  if (error || !task) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center py-12 text-red-500 font-medium">
        ⚠️ {error || "Task records could not be recovered."}
      </div>
    );
  }

  // 3. Complete Data Content Render Layout
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <button className="text-sm font-medium text-blue-600 hover:underline">
        &larr; Back to Dashboard
      </button>

      <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm space-y-6">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">{task.title}</h1>
            <p className="text-xs text-gray-400">ID: {task.id}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${
            task.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' :
            task.status === 'In Progress' ? 'bg-amber-50 text-amber-700 border-amber-200' :
            'bg-gray-50 text-gray-700 border-gray-200'
          }`}>
            {task.status}
          </span>
        </div>

        <hr className="border-gray-100" />

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Description</h3>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">{task.description}</p>
        </div>

        <div className="pt-4 grid grid-cols-2 gap-4 border-t border-gray-50">
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Due Date</h4>
            <p className="text-sm font-medium text-gray-800 mt-0.5">📅 {task.dueDate}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Assignee</h4>
            <p className="text-sm font-medium text-gray-800 mt-0.5">👤 {task.assignedTo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};