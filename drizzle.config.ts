import { config } from "dotenv";
import { defineConfig, type Config } from "drizzle-kit";

// Load environment variables from .env.local (Next.js convention) and .env
config({ path: ".env.local" });
config({ path: ".env" });

const drizzleConfig = {
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;

export default defineConfig(drizzleConfig);
