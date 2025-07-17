import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Load environment variables if not in Next.js context
if (typeof window === "undefined" && !process.env.NEXT_RUNTIME) {
  config({ path: ".env.local" });
  config({ path: ".env" });
}

declare global {
  // eslint-disable-next-line no-var
  var __db: ReturnType<typeof drizzle> | undefined;
}

let db: ReturnType<typeof drizzle>;

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set");
}

if (process.env.NODE_ENV === "production") {
  db = drizzle(postgres(databaseUrl), { schema });
} else {
  if (!global.__db) {
    global.__db = drizzle(postgres(databaseUrl), { schema });
  }
  db = global.__db;
}

export { db };
