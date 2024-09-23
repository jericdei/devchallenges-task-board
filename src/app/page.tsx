import Board from "@/components/board/board";
import { defaultBoard } from "@/constants/defaults";
import { db } from "@/db";
import { Board as TBoard, boards, tasks } from "@/db/schema";

export default async function Page() {
  let board: TBoard;

  const [insertedBoard] = await db
    .insert(boards)
    .values({
      name: defaultBoard.name,
      description: defaultBoard.description,
    })
    .returning();

  board = insertedBoard;

  const insertedTasks = await db
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

  board.tasks = insertedTasks;

  return <Board board={insertedBoard} />;
}
