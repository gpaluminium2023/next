import type { Prisma } from "@/lib/generated/prisma/client";

export type OrderWithItems = Prisma.OrderGetPayload<{ include: { items: true } }>;
