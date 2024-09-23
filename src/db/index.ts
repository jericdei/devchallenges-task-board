import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
  throw new Error("DB_URL is not set");
}

const queryClient = postgres(dbUrl);

export const db = drizzle(queryClient, { schema });
