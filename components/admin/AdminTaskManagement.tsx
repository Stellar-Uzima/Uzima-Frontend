'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Task {
  id: string;
  title: string;
  category: string;
  rewardXLM: number;
  status: 'active' | 'inactive';
}

export default function AdminTaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const [newTask, setNewTask] = useState({
    title: '',
    category: 'Nutrition',
    rewardXLM: 0,
  });

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch('/api/admin/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      const task = await response.json();
      setTasks(prev => [...prev, task]);
      setIsAdding(false);
      setNewTask({ title: '', category: 'Nutrition', rewardXLM: 0 });
      toast.success('Task created successfully!');
    } catch (error) {
      toast.error('Failed to create task.');
    }
  };

  const handleDeactivate = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus as any } : t));
    toast.info(`Task marked as ${newStatus}.`);
  };

  return (
    <div className="bg-white rounded-3xl border border-terra/10 shadow-sm p-4 sm:p-6 animate-scaleIn">

      {/*
        FIX: Header row wraps on mobile — title stacks above the button
        instead of overflowing or squishing the button text.
      */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <h3 className="font-serif text-xl font-bold text-earth">Task Management</h3>
          <p className="text-sm text-muted">Create and manage health challenges.</p>
        </div>

        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            {/*
              FIX: Button is full-width on mobile (w-full sm:w-auto) so it
              doesn't clip. shrink-0 prevents it from squishing on sm+.
            */}
            <Button className="bg-terra hover:bg-earth text-white rounded-xl flex items-center justify-center gap-2 w-full sm:w-auto shrink-0">
              <Plus className="w-4 h-4" /> Create New Task
            </Button>
          </DialogTrigger>

          {/*
            FIX: Dialog is near-full-width on mobile (w-[calc(100vw-2rem)])
            with mx-4 so it never bleeds off-screen on 375 px phones.
          */}
          <DialogContent className="bg-white rounded-2xl border-terra/10 w-[calc(100vw-2rem)] max-w-md p-6 sm:p-8">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl sm:text-2xl text-earth">
                New Health Task
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleCreateTask} className="space-y-5 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-earth font-medium">Task Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Drink 2L of water"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="rounded-xl"
                  required
                />
              </div>

              {/*
                FIX: Category + Reward grid is single-column on mobile so the
                Select and Input have enough room to render properly at 320 px.
              */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-earth font-medium">Category</Label>
                  <Select
                    value={newTask.category}
                    onValueChange={(val) => setNewTask({ ...newTask, category: val })}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-terra/10 rounded-xl">
                      <SelectItem value="Nutrition">Nutrition</SelectItem>
                      <SelectItem value="Exercise">Exercise</SelectItem>
                      <SelectItem value="Mental Health">Mental Health</SelectItem>
                      <SelectItem value="Hygiene">Hygiene</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reward" className="text-earth font-medium">Reward (XLM)</Label>
                  <Input
                    id="reward"
                    type="number"
                    value={newTask.rewardXLM}
                    onChange={(e) => setNewTask({ ...newTask, rewardXLM: Number(e.target.value) })}
                    className="rounded-xl"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-terra hover:bg-earth text-white rounded-xl py-5 sm:py-6"
              >
                Save & Publish Task
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/*
        FIX: Cards go single-column on mobile, 2-col on sm, 3-col on lg.
        Original skipped single-column entirely (grid-cols-1 sm:grid-cols-2)
        which still caused overflow on very narrow phones with long titles.
        gap-3 on mobile keeps cards from feeling crammed.
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="h-40 sm:h-48 bg-gray-50 rounded-2xl animate-pulse" />
          ))
        ) : tasks.length === 0 ? (
          <div className="col-span-full py-16 sm:py-20 text-center text-muted">
            No tasks available.
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 sm:p-6 rounded-2xl border transition-all ${
                task.status === 'active'
                  ? 'bg-white border-terra/10 hover:shadow-md'
                  : 'bg-gray-50 border-gray-200 opacity-75'
              }`}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <Badge
                  variant="outline"
                  className="border-terra/20 text-terra bg-terra/5 rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                >
                  {task.category}
                </Badge>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-base sm:text-lg font-bold text-earth">{task.rewardXLM}</span>
                  <span className="text-xs text-muted">XLM</span>
                </div>
              </div>

              {/*
                FIX: Title uses line-clamp-2 so long task names don't push
                the action buttons off the bottom of the card.
              */}
              <h4 className="font-bold text-earth text-base sm:text-lg mb-2 leading-tight line-clamp-2">
                {task.title}
              </h4>

              <div className="flex items-center justify-between mt-4 sm:mt-6">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeactivate(task.id, task.status)}
                    className={`h-9 w-9 rounded-xl ${
                      task.status === 'active'
                        ? 'text-terra hover:bg-terra/5'
                        : 'text-sage hover:bg-sage/5'
                    }`}
                    title={task.status === 'active' ? 'Deactivate Task' : 'Activate Task'}
                    aria-label={task.status === 'active' ? 'Deactivate task' : 'Activate task'}
                  >
                    {task.status === 'active'
                      ? <XCircle className="w-4 h-4" />
                      : <CheckCircle className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl text-muted hover:text-earth hover:bg-gray-100"
                    aria-label="Edit task"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl text-red-400 hover:text-red-600 hover:bg-red-50"
                  title="Delete Permanently"
                  aria-label="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}