"use client";
// Disable a rule for the entire file
/* eslint-disable @typescript-eslint/no-explicit-any */

// Disable a rule for a specific line
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unusedVar = 'This will not trigger an error';
import { useTaskStore } from "../../store/taskStore";
import { useState } from "react";
import AiChat from "../../components/AiChat";
import { Plus, Trash2 } from "lucide-react";

export default function Dashboard() {
  const { tasks, addTask, updateTask, deleteTask } = useTaskStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = () => {
    if (title.trim() && description.trim()) {
      addTask(title, description);
      setTitle("");
      setDescription("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'bg-amber-50 text-amber-700';
      case 'in-progress':
        return 'bg-purple-50 text-purple-700';
      case 'done':
        return 'bg-emerald-50 text-emerald-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Task Dashboard</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Task Input Form */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task title"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Task description"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors outline-none min-h-32 resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                onClick={handleAddTask}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus size={20} />
                Add Task
              </button>
            </div>
          </div>

          {/* AI Chat Feature */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <AiChat />
          </div>
        </div>

        {/* Task List */}
        <div className="mt-8 grid gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{task.description}</p>
                </div>

                <div className="flex items-center gap-4">
                  <select
                    className={`px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all outline-none ${getStatusColor(task.status)}`}
                    value={task.status}
                    onChange={(e) => updateTask(task.id, e.target.value as "todo" | "in-progress" | "done")}
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
