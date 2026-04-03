"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function AdminSignOut() {
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <Button size="sm" variant="outline" onClick={handleSignOut}>
      Sign out
    </Button>
  );
}
