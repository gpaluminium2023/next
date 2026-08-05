"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BankTransferSettingsFormProps {
  defaultValues: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    instructions: string;
  };
}

export function BankTransferSettingsForm({ defaultValues }: BankTransferSettingsFormProps) {
  const router = useRouter();
  const [bankName, setBankName] = useState(defaultValues.bankName);
  const [accountNumber, setAccountNumber] = useState(defaultValues.accountNumber);
  const [accountName, setAccountName] = useState(defaultValues.accountName);
  const [instructions, setInstructions] = useState(defaultValues.instructions);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await fetch("/api/store/bank-settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bankName, accountNumber, accountName, instructions: instructions || undefined }),
      });
      if (!res.ok) {
        toast.error("Could not save bank details");
        return;
      }
      toast.success("Bank details saved");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="bankName">Bank Name</Label>
        <Input id="bankName" required value={bankName} onChange={(e) => setBankName(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="accountNumber">Account Number</Label>
        <Input
          id="accountNumber"
          required
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="accountName">Account Name</Label>
        <Input id="accountName" required value={accountName} onChange={(e) => setAccountName(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="instructions">Extra Instructions (optional)</Label>
        <Textarea
          id="instructions"
          rows={3}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Anything else customers should know when paying by transfer"
        />
      </div>
      <Button type="submit" disabled={isPending} className="bg-accent hover:bg-accent/90">
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save
      </Button>
    </form>
  );
}
