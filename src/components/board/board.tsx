"use client";

import { Board as TBoard } from "@/db/schema";
import TaskList from "../task/task-list";
import BoardCard from "./board-card";

export default function Board({ board }: { board: TBoard }) {
  return (
    <main className="flex min-h-screen w-full items-center justify-center px-2 py-8">
      <div>
        <BoardCard board={board} />

        <TaskList
          boardId={board.id}
          tasks={board.tasks}
        />
      </div>
    </main>
  );
}
