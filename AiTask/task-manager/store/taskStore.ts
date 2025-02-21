import { create } from "zustand";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
}

interface TaskStore {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  updateTask: (id: number, status: Task["status"]) => void;
  deleteTask: (id: number) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [
    { id: 1, title: "Example Task", description: "This is a sample task", status: "todo" },
  ],

  addTask: (title, description) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { id: Date.now(), title, description, status: "todo" },
      ],
    })),

  updateTask: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));
