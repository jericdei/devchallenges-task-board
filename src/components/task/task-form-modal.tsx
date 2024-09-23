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
import { deleteTask, updateTask } from "@/lib/actions";

interface TaskFormModalProps {
  boardId: string;
  task?: Task;
  onClose?: () => void;
}

export type TaskFormInputs = {
  name: string;
  description: string;
  icon: string;
  status: TaskStatus;
};

const defaultValues: TaskFormInputs = {
  name: "",
  description: "",
  icon: "",
  status: "TODO",
};

const TaskFormModal = forwardRef<HTMLDialogElement, TaskFormModalProps>(
  ({ task, onClose }, ref) => {
    const { register, handleSubmit, control, reset } = useForm<TaskFormInputs>({
      defaultValues,
      mode: "onChange",
      shouldUnregister: true,
    });

    useEffect(() => {
      if (task?.id) {
        reset({
          name: task?.name ?? "",
          description: task?.description ?? "",
          icon: task?.icon ?? "",
          status: task?.status ?? undefined,
        });
      } else {
        reset(defaultValues);
      }
    }, [task, reset]);

    const onSubmit: SubmitHandler<TaskFormInputs> = async (data) => {
      if (!task?.id) {
        return;
      }

      await updateTask(task?.id, data);
      onClose?.();
    };

    const removeTask = async () => {
      if (!task?.id) {
        return;
      }

      await deleteTask(task.id);
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
              onClick={removeTask}
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
