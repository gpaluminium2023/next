import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { BankTransferSettingsForm } from "@/components/admin/bank-transfer-settings-form";

export const dynamic = "force-dynamic";

export default async function BankTransferSettingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/admin/login");
  if (session.user.role !== "admin") redirect(session.user.role === "staff" ? "/admin/orders" : "/");

  const settings = await prisma.bankTransferSettings.findUnique({ where: { id: "singleton" } });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="container mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Link href="/admin/orders">Back to Orders</Link>
          </Button>
          <span className="font-heading font-bold uppercase">Bank Transfer Settings</span>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-2 font-heading text-2xl font-bold uppercase">Bank Transfer Settings</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          These details are shown to customers who choose to pay by bank transfer at checkout, and
          sent to them by email once they place the order.
        </p>

        <BankTransferSettingsForm
          defaultValues={{
            bankName: settings?.bankName ?? "",
            accountNumber: settings?.accountNumber ?? "",
            accountName: settings?.accountName ?? "",
            instructions: settings?.instructions ?? "",
          }}
        />
      </main>
    </div>
  );
}
