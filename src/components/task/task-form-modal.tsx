"use client";

import { forwardRef, useEffect } from "react";
import Modal from "../modal";
import { Task, TaskStatus } from "@/db/schema";
import TaskIconSelector from "./task-icon-selector";
import TaskStatusSelector from "./task-status-selector";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "../button";
import CheckIcon from "../vector/check-icon";
import TrashIcon from "../vector/trash-icon";

interface TaskFormModalProps {
  task?: Task;
  onClose?: () => void;
}

type TaskFormInputs = {
  name: string;
  description: string;
  icon: string | null;
  status: TaskStatus | null;
};

const TaskFormModal = forwardRef<HTMLDialogElement, TaskFormModalProps>(
  ({ task, onClose }, ref) => {
    const { register, handleSubmit, control, reset } = useForm<TaskFormInputs>({
      defaultValues: {
        name: "",
        description: "",
        icon: null,
        status: null,
      },
      mode: "onChange",
    });

    useEffect(() => {
      if (!task) {
        return;
      }

      reset({
        name: task.name,
        description: task.description ?? "",
        icon: task.icon,
        status: task.status,
      });
    }, [task, reset]);

    const onSubmit: SubmitHandler<TaskFormInputs> = (data) => {
      console.log(data);
    };

    return (
      <Modal title="Task details" dialogRef={ref} onClose={onClose}>
        <form
          className="flex flex-col justify-between h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4">
            <label htmlFor="name" className="flex flex-col gap-2">
              <span className="input-label">Task Name</span>
              <input
                type="text"
                id="name"
                className="px-4 py-2 rounded-xl border-2 border-neutral-400"
                placeholder="Enter a task name"
                {...register("name")}
              />
            </label>

            <label htmlFor="description" className="flex flex-col gap-2">
              <span className="input-label">Description</span>
              <textarea
                id="description"
                rows={6}
                className="px-4 py-2 rounded-xl border-2 border-neutral-400"
                placeholder="Enter a short description"
                {...register("description")}
              />
            </label>

            <Controller
              control={control}
              name="icon"
              render={({ field: { onChange, ref, value } }) => (
                <TaskIconSelector
                  ref={ref}
                  defaultSelected={value}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="status"
              render={({ field: { onChange, ref, value } }) => (
                <TaskStatusSelector
                  ref={ref}
                  defaultSelected={value}
                  onChange={onChange}
                />
              )}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="secondary" icon={<TrashIcon />}>
              Delete
            </Button>

            <Button type="submit" variant="primary" icon={<CheckIcon />}>
              Save
            </Button>
          </div>
        </form>
      </Modal>
    );
  }
);

TaskFormModal.displayName = "TaskFormModal";

export default TaskFormModal;
