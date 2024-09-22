import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const boards = sqliteTable("boards", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export const tasks = sqliteTable("tasks", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  boardId: text("board_id")
    .notNull()
    .references(() => boards.id),
  name: text("name").notNull(),
  description: text("description"),
  icon: text("icon"),
  status: text("status", {
    enum: ["IN_PROGRESS", "COMPLETED", "WONT_DO"],
  }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});
