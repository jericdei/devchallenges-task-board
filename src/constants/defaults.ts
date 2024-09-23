import { Board, Task } from "@/db/schema";

const defaultBoardId = "default-board";

export const icons = ["👨‍💻", "💬", "☕", "🏋️", "📚", "⏰"];

export const defaultTasks: Task[] = [
  {
    id: "task-1",
    boardId: defaultBoardId,
    name: "Task in Progress",
    description: null,
    icon: "⏰",
    status: "IN_PROGRESS",
    createdAt: new Date(),
  },
  {
    id: "task-2",
    boardId: defaultBoardId,
    name: "Task Completed",
    description: null,
    icon: "🏋️",
    status: "COMPLETED",
    createdAt: new Date(),
  },
  {
    id: "task-3",
    boardId: defaultBoardId,
    name: "Task Wont Do",
    description: null,
    icon: "☕",
    status: "WONT_DO",
    createdAt: new Date(),
  },
  {
    id: "task-4",
    boardId: defaultBoardId,
    name: "Task To Do",
    description: "Work on a challenge on devChallenges.io, learn TypeScript.",
    icon: "📚",
    status: "TODO",
    createdAt: new Date(),
  },
];

export const defaultBoard: Board = {
  id: defaultBoardId,
  name: "My Task Board",
  description: "Tasks to keep organized.",
  createdAt: new Date(),
  tasks: defaultTasks,
};
