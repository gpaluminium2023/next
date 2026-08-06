/**
 * Pre-deploy check: does the live database actually have the schema the
 * committed code expects?
 *
 * The bank-transfer work added a BankTransferSettings model, a PaymentMethod
 * enum and new Order columns; the branch-pricing work added Branch,
 * BranchVariantPrice, BranchProductPrice and two more Order columns. If those
 * were never pushed with `prisma db push`, deploying the code that reads them
 * breaks checkout on a live store.
 *
 * Run with: npx tsx --tsconfig tsconfig.json scripts/check-schema-drift.ts
 */
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { PrismaNeonHttp } from "@prisma/adapter-neon";
import { PrismaClient } from "../lib/generated/prisma/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: resolve(__dirname, "../.env") });

const dbUrl = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL / DIRECT_URL not set");
  process.exit(1);
}
const adapter = new PrismaNeonHttp(dbUrl, {});
const prisma = new PrismaClient({ adapter } as never);

async function check(label: string, fn: () => Promise<unknown>) {
  try {
    await fn();
    console.log(`OK      ${label}`);
    return true;
  } catch (err) {
    console.log(`MISSING ${label}  -> ${(err as Error).message.split("\n").pop()?.trim()}`);
    return false;
  }
}

async function main() {
  const results = [
    await check("BankTransferSettings table", () => prisma.bankTransferSettings.findFirst()),
    await check("Order.paymentMethod column", () =>
      prisma.order.findFirst({ select: { id: true, paymentMethod: true } })
    ),
    await check("Order.source / calculatorDetails", () =>
      prisma.order.findFirst({ select: { id: true, source: true, calculatorDetails: true } })
    ),
    await check("User.role column", () => prisma.user.findFirst({ select: { id: true, role: true } })),
    // Branch pricing. Same hazard as paymentMethod: the checkout route resolves
    // a branch on every order, so a missing Branch table breaks all checkouts,
    // not just Enugu ones.
    await check("Branch table", () => prisma.branch.findFirst()),
    await check("BranchVariantPrice table", () => prisma.branchVariantPrice.findFirst()),
    await check("BranchProductPrice table", () => prisma.branchProductPrice.findFirst()),
    await check("Order.branchId / branchSnapshot", () =>
      prisma.order.findFirst({ select: { id: true, branchId: true, branchSnapshot: true } })
    ),
  ];
  const missing = results.filter((r) => !r).length;
  console.log(
    missing === 0
      ? "\nSchema is in sync — safe to deploy."
      : `\n${missing} check(s) failed — run \`prisma db push\` BEFORE deploying.`
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
