"use client";

import AddIcon from "../vector/add-icon";

export default function TaskNewButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      className={`rounded-xl bg-warning-200 p-4`}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-4">
          <div className={`rounded-xl bg-warning-700 p-3`}>
            <AddIcon />
          </div>

          <div>
            <p className="task-button">Add new task</p>
          </div>
        </div>
      </div>
    </button>
  );
}
