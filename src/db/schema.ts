import { InferSelectModel, relations } from "drizzle-orm";
import { createEnumObject } from "./utils";
import { pgSchema, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const schema = pgSchema("task_board");

export const TaskStatuses = [
  "TODO",
  "IN_PROGRESS",
  "COMPLETED",
  "WONT_DO",
] as const;

export const TaskStatusEnum = createEnumObject(TaskStatuses);
export type TaskStatus = keyof typeof TaskStatusEnum;
export const taskStatuses = schema.enum("task_statuses", TaskStatuses);

export const boards = schema.table("boards", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const boardsRelations = relations(boards, ({ many }) => ({
  tasks: many(tasks),
}));

export const tasks = schema.table("tasks", {
  id: uuid("id").primaryKey(),
  boardId: uuid("board_id").references(() => boards.id),
  name: text("name").notNull(),
  description: text("description"),
  icon: text("icon"),
  status: taskStatuses("status").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tasksRelations = relations(tasks, ({ one }) => ({
  board: one(boards),
}));

export type Task = InferSelectModel<typeof tasks> & {
  board?: Board;
};

export type Board = InferSelectModel<typeof boards> & {
  tasks?: Task[];
};
