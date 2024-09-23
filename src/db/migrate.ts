import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
const dbUrl = process.env.DB_URL;

if (!dbUrl) {
  throw new Error("DB_URL is not set");
}

const migrationsClient = postgres(dbUrl, {
  max: 1,
});

const db = drizzle(migrationsClient);

await migrate(db, { migrationsFolder: "./src/db/migrations" });
await migrationsClient.end();

console.log("Migrations completed.");
