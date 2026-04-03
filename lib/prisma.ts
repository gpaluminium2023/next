import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";

// Neon HTTP adapter — works in serverless, edge, and Node.js without WebSocket
function createPrismaClient() {
  const adapter = new PrismaNeonHttp(process.env.DATABASE_URL!, {});
  return new PrismaClient({ adapter });
}

declare global {
  var prismaGlobal: ReturnType<typeof createPrismaClient> | undefined;
}

// Reuse client across hot reloads in dev
const prisma = globalThis.prismaGlobal ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export { prisma };
