"use client";

import { forwardRef } from "react";
import Modal from "../modal";
import { Task } from "@/db/schema";
import TaskIconSelector from "./task-icon-selector";
import TaskStatusSelector from "./task-status-selector";

interface TaskFormModalProps {
  task?: Task;
  onClose?: () => void;
}

const TaskFormModal = forwardRef<HTMLDialogElement, TaskFormModalProps>(
  ({ task, onClose }, ref) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      console.log("nice");
    };

    return (
      <Modal title="Task details" dialogRef={ref} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <label htmlFor="name" className="flex flex-col gap-2">
              <span className="input-label">Task Name</span>
              <input
                type="text"
                id="name"
                className="px-4 py-2 rounded-xl border-2 border-neutral-400"
                placeholder="Enter a task name"
                defaultValue={task?.name}
              />
            </label>

            <label htmlFor="description" className="flex flex-col gap-2">
              <span className="input-label">Description</span>
              <textarea
                id="description"
                rows={6}
                className="px-4 py-2 rounded-xl border-2 border-neutral-400"
                placeholder="Enter a short description"
                defaultValue={task?.description || ""}
              />
            </label>

            <TaskIconSelector id="icon" />
            <TaskStatusSelector id="status" />
          </div>

          <div className="flex justify-end gap-4">
            <input type="submit" value="Save" />
          </div>
        </form>
      </Modal>
    );
  }
);

TaskFormModal.displayName = "TaskFormModal";

export default TaskFormModal;
