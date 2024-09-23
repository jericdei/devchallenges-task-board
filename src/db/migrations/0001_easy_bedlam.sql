ALTER TABLE "task_board"."boards" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "task_board"."tasks" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();