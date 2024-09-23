"use client";

import AddIcon from "../vector/add-icon";

export default function NewTaskButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button className={`p-4 rounded-xl bg-warning-200`} {...props}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 flex-1">
          <div className={`bg-warning-700 p-3 rounded-xl`}>
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
