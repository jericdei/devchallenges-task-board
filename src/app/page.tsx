import { defaultBoard } from "@/constants/defaults";
import { db } from "@/db";
import { boards, tasks } from "@/db/schema";
import { redirect } from "next/navigation";

export default async function Page() {
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

  redirect(`/board/${insertedBoard.id}`);
}
