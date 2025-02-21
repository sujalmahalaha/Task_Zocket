"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Task } from "../types/task";

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  updateTask: (id: number, status: Task["status"]) => void;
  deleteTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status: "todo",
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: number, status: Task["status"]) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, status } : task)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within TaskProvider");
  return context;
};
