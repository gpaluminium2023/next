/**
 * Seed the admin user into the database.
 * Run with: pnpm seed:admin
 *
 * Uses ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME from .env
 * Uses DATABASE_URL for the Prisma connection.
 */
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { PrismaNeonHttp } from "@prisma/adapter-neon";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { PrismaClient } from "../lib/generated/prisma/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: resolve(__dirname, "../.env") });

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
const name = process.env.ADMIN_NAME ?? "Admin";

if (!email || !password) {
  console.error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env");
  process.exit(1);
}

const dbUrl = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL / DIRECT_URL not set");
  process.exit(1);
}
const adapter = new PrismaNeonHttp(dbUrl, {});
const prisma = new PrismaClient({ adapter } as never);

const auth = betterAuth({
  appName: "GPA Admin",
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true, requireEmailVerification: false },
  plugins: [admin()],
});

async function main() {
  console.log(`Seeding admin user: ${email}`);

  // Check if user already exists
  const existing = await prisma.user.findUnique({ where: { email: email! } });
  if (existing) {
    // Ensure role is admin
    if (existing.role !== "admin") {
      await prisma.user.update({
        where: { email: email! },
        data: { role: "admin" },
      });
      console.log("✓ Existing user promoted to admin.");
    } else {
      console.log("✓ Admin user already exists — nothing to do.");
    }
    return;
  }

  // Create the user via Better Auth (hashes password correctly)
  const result = await auth.api.signUpEmail({
    body: { email: email!, password: password!, name },
  });

  if (!result || !("user" in result)) {
    console.error("Failed to create admin user:", result);
    process.exit(1);
  }

  // Set role to admin
  await prisma.user.update({
    where: { email: email! },
    data: { role: "admin" },
  });

  console.log(`✓ Admin user created and role set: ${email}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
