import BoardCard from "@/components/board/board-card";
import TaskList from "@/components/task/task-list";
import { db } from "@/db";
import { boards } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: { id: string } }) {
  const board = await db.query.boards.findFirst({
    with: {
      tasks: {
        orderBy: (tasks, { desc }) => [desc(tasks.createdAt)],
      },
    },
    where: eq(boards.id, params.id),
  });

  if (!board) {
    notFound();
  }

  return (
    <main className="flex min-h-screen items-center justify-center py-8">
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
