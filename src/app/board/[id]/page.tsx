import TaskList from "@/components/task/task-list";
import Logo from "@/components/vector/logo";
import PencilIcon from "@/components/vector/pencil-icon";
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
        <div className="grid grid-cols-[min-content_1fr] grid-rows-2 gap-x-4 gap-y-2">
          <Logo className="row-span-1 self-center justify-self-end" />

          <div className="flex items-center gap-2">
            <h1 className="title">{board.name}</h1>
            <PencilIcon />
          </div>

          <p className="description col-start-2">{board.description}</p>
        </div>

        <TaskList
          boardId={board.id}
          tasks={board.tasks}
        />
      </div>
    </main>
  );
}
