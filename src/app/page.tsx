import Modal from "@/components/modal";
import NewTaskButton from "@/components/task/new-task-button";
import TaskItem from "@/components/task/task-item";
import TaskList from "@/components/task/task-list";
import Logo from "@/components/vector/logo";
import PencilIcon from "@/components/vector/pencil-icon";
import { defaultBoard } from "@/constants/defaults";
import { db } from "@/db";
import { boards, tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { boardId: string };
}) {
  let board;

  if (searchParams.boardId) {
    const boardQuery = await db.query.boards.findFirst({
      with: {
        tasks: true,
      },
      where: eq(boards.id, searchParams.boardId),
    });

    if (!boardQuery) {
      notFound();
    }

    board = boardQuery;
  } else {
    const [insertedBoard] = await db
      .insert(boards)
      .values({
        name: defaultBoard.name,
        description: defaultBoard.description,
      })
      .returning();

    await db
      .insert(tasks)
      .values(
        defaultBoard.tasks?.map((task) => ({
          boardId: insertedBoard.id,
          name: task.name,
          description: task.description,
          icon: task.icon ?? "",
          status: task.status,
        })) ?? []
      )
      .returning();

    redirect(`/?boardId=${insertedBoard.id}`);
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div>
        <div className="grid grid-cols-[min-content_1fr] grid-rows-2 gap-x-4 gap-y-2">
          <Logo className="row-span-1 self-center justify-self-end" />

          <div className="flex items-center gap-2">
            <h1 className="title">{board.name}</h1>
            <PencilIcon />
          </div>

          <p className="description col-start-2">{board.description}</p>
        </div>

        <TaskList tasks={board.tasks} />
      </div>
    </main>
  );
}
