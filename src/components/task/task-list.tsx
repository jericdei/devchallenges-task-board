"use client";

import { Task } from "@/db/schema";
import TaskItem from "./task-item";
import TaskNewButton from "./task-new-button";
import { useRef, useState } from "react";
import TaskFormModal from "./task-form-modal";
import { createDefaultTask } from "@/lib/actions";

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
        onClose={() => {
          modalRef.current?.close();
        }}
      />

      <div className="flex flex-col gap-4">
        {tasks?.length ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={() => {
                setSelectedTask(task);
                modalRef.current?.showModal();
              }}
            />
          ))
        ) : (
          <p className="p-16 text-center">No tasks.</p>
        )}

        <TaskNewButton onClick={() => createDefaultTask(boardId)} />
      </div>
    </>
  );
}
