"use client";

import { Task } from "@/db/schema";
import TimeIcon from "../vector/time-icon";
import DoneIcon from "../vector/done-icon";
import WontDoIcon from "../vector/wont-do-icon";

interface TaskItemProps {
  task: Task;
  onEdit?: () => void;
}

export default function TaskItem({ task, onEdit }: TaskItemProps) {
  let status: {
    bg: string;
    icon: React.ReactElement | null;
    iconBg?: string;
  } = {
    bg: "bg-neutral-200",
    icon: null,
  };

  switch (task.status) {
    case "TODO":
      status = { bg: "bg-neutral-200", icon: null };
      break;
    case "IN_PROGRESS":
      status = {
        bg: "bg-warning-300",
        icon: <TimeIcon />,
        iconBg: "bg-warning-700",
      };
      break;
    case "COMPLETED":
      status = {
        bg: "bg-success-200",
        icon: <DoneIcon />,
        iconBg: "bg-success-700",
      };
      break;
    case "WONT_DO":
      status = {
        bg: "bg-danger-200",
        icon: <WontDoIcon />,
        iconBg: "bg-danger-700",
      };
      break;
  }

  return (
    <button
      className={`p-4 rounded-xl text-left ${status.bg}`}
      onClick={onEdit}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 flex-1">
          <div className="bg-neutral-100 px-3 py-2 rounded-xl self-start">
            <p className="text-xl">{task.icon}</p>
          </div>

          <div>
            <p className="task-title">{task.name}</p>
            <p className="max-w-72 mt-2">{task.description}</p>
          </div>
        </div>

        <div className={`p-3 rounded-xl ${status.iconBg}`}>{status.icon}</div>
      </div>
    </button>
  );
}
