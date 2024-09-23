"use server";

import { TaskFormInputs } from "@/components/task/task-form-modal";
import { icons } from "@/constants/defaults";
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

  redirect(`/board/${updatedTask.boardId}`);
}

export async function createDefaultTask(boardId: string) {
  const [insertedTask] = await db
    .insert(tasks)
    .values({
      boardId,
      name: "New Task",
      status: "TODO",
      icon: icons.sort(() => 0.5 - Math.random())[0],
    })
    .returning();

  redirect(`/board/${insertedTask.boardId}`);
}

export async function deleteTask(id: string) {
  const [deletedTask] = await db
    .delete(tasks)
    .where(eq(tasks.id, id))
    .returning();

  redirect(`/board/${deletedTask.boardId}`);
}
