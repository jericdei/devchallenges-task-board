"use client";

import { Task } from "@/db/schema";
import TaskItem from "./task-item";
import TaskNewButton from "./task-new-button";
import { useRef, useState } from "react";
import TaskFormModal from "./task-form-modal";

interface TaskListProps {
  boardId: string;
  tasks?: Task[];
}

export default function TaskList({ boardId, tasks }: TaskListProps) {
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();

  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <TaskFormModal
        ref={modalRef}
        boardId={boardId}
        task={selectedTask}
        isEdit={!!selectedTask}
        onClose={() => {
          modalRef.current?.close();
        }}
      />

      <div className="flex flex-col gap-4">
        {tasks?.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={() => {
              setSelectedTask(task);
              modalRef.current?.showModal();
            }}
          />
        ))}

        <TaskNewButton
          onClick={() => {
            setSelectedTask(undefined);
            modalRef.current?.showModal();
          }}
        />
      </div>
    </>
  );
}
