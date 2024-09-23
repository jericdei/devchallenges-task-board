"use client";

import { forwardRef } from "react";
import Modal from "../modal";
import { Task, TaskStatus } from "@/db/schema";
import TaskIconSelector from "./task-icon-selector";
import TaskStatusSelector from "./task-status-selector";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "../button";
import CheckIcon from "../vector/check-icon";
import TrashIcon from "../vector/trash-icon";
import { updateTask } from "@/lib/actions";

interface TaskFormModalProps {
  task?: Task;
  onClose?: () => void;
}

export type TaskFormInputs = {
  name: string;
  description: string;
  icon: string;
  status?: TaskStatus;
};

const TaskFormModal = forwardRef<HTMLDialogElement, TaskFormModalProps>(
  ({ task, onClose }, ref) => {
    const { register, handleSubmit, control, watch } = useForm<TaskFormInputs>({
      defaultValues: {
        name: task?.name,
        description: task?.description ?? "",
        icon: task?.icon ?? undefined,
        status: task?.status ?? undefined,
      },
      mode: "onChange",
    });

    const onSubmit: SubmitHandler<TaskFormInputs> = async (data) => {
      if (task?.id) {
        await updateTask(task?.id, data);
      }

      onClose?.();
    };

    return (
      <Modal
        title="Task details"
        dialogRef={ref}
        onClose={onClose}
      >
        <form
          className="flex h-full flex-col justify-between"
          onSubmit={handleSubmit(onSubmit)}
        >
          {JSON.stringify(task, null, 2)}
          <br />
          {JSON.stringify(watch(), null, 2)}
          <div className="flex flex-col gap-4">
            <label
              htmlFor="name"
              className="flex flex-col gap-2"
            >
              <span className="input-label">Task Name</span>
              <input
                type="text"
                id="name"
                className="rounded-xl border-2 border-neutral-400 px-4 py-2"
                placeholder="Enter a task name"
                {...register("name", { value: task?.name })}
              />
            </label>

            <label
              htmlFor="description"
              className="flex flex-col gap-2"
            >
              <span className="input-label">Description</span>
              <textarea
                id="description"
                rows={6}
                className="rounded-xl border-2 border-neutral-400 px-4 py-2"
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
            <Button
              type="button"
              variant="secondary"
              icon={<TrashIcon />}
            >
              Delete
            </Button>

            <Button
              type="submit"
              variant="primary"
              icon={<CheckIcon />}
            >
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
