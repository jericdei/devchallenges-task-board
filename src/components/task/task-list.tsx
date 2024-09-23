"use client";

import { Task } from "@/db/schema";
import TaskItem from "./task-item";
import NewTaskButton from "./new-task-button";
import { useRef, useState } from "react";
import TaskFormModal from "./task-form-modal";

interface TaskListProps {
  tasks?: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const [isEdit, setIsEdit] = useState(false);

  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = (edit: boolean) => {
    setIsEdit(edit);
    modalRef.current?.showModal();
  };

  return (
    <>
      <TaskFormModal
        isEdit={isEdit}
        ref={modalRef}
        onClose={() => modalRef.current?.close()}
      />

      <div className="flex flex-col gap-4">
        {tasks?.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={() => {
              openModal(true);
            }}
          />
        ))}

        <NewTaskButton
          onClick={() => {
            openModal(false);
          }}
        />
      </div>
    </>
  );
}
