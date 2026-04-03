import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { neon } from "@neondatabase/serverless";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../.env") });

const sql = neon(process.env.DATABASE_URL);

const columns = [
  [`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "banned" BOOLEAN DEFAULT false`, "banned"],
  [`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "banReason" TEXT`, "banReason"],
  [`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "banExpires" TIMESTAMP(3)`, "banExpires"],
];

for (const [query, name] of columns) {
  try {
    await sql.query(query);
    console.log(`✓ ${name} column added`);
  } catch (e) {
    console.error(`✗ ${name}: ${e.message}`);
  }
}
