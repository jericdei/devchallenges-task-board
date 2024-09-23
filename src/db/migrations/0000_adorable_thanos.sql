CREATE SCHEMA "task_board";
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "task_board"."task_statuses" AS ENUM('TODO', 'IN_PROGRESS', 'COMPLETED', 'WONT_DO');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task_board"."boards" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task_board"."tasks" (
	"id" uuid PRIMARY KEY NOT NULL,
	"board_id" uuid,
	"name" text NOT NULL,
	"description" text,
	"icon" text,
	"status" "task_board"."task_statuses" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_board"."tasks" ADD CONSTRAINT "tasks_board_id_boards_id_fk" FOREIGN KEY ("board_id") REFERENCES "task_board"."boards"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
