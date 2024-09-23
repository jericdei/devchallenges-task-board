"use server";

import { TaskFormInputs } from "@/components/task/task-form-modal";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function updateTask(id: string, task: TaskFormInputs) {
  const [updatedTask] = await db
    .update(tasks)
    .set({
      ...task,
    })
    .where(eq(tasks.id, id))
    .returning();

  redirect(`/?boardId=${updatedTask.boardId}`);
}

export async function createDefaultTask(boardId: string) {
  const [insertedTask] = await db
    .insert(tasks)
    .values({ boardId, name: "New Task", status: "TODO", icon: "📚" })
    .returning();

  redirect(`/?boardId=${insertedTask.boardId}`);
}

export async function deleteTask(id: string) {
  const [deletedTask] = await db
    .delete(tasks)
    .where(eq(tasks.id, id))
    .returning();

  redirect(`/?boardId=${deletedTask.boardId}`);
}
