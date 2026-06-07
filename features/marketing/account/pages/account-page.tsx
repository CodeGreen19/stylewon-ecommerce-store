"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { accountLinks } from "../layout/account-layout";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function AccountPage() {
  const router = useRouter();
  return (
    <div className="min-h-[calc(100vh-4rem)] space-y-7 py-5 md:hidden">
      <div className="flex flex-col">
        {accountLinks.map((item) => {
          const Icon = item.icon;

          return (
            <>
              {item.link && (
                <Link
                  key={item.label}
                  href={item.link}
                  className="flex items-center justify-between border-b px-4 py-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="size-5 text-muted-foreground" />

                    <span className="text-sm font-medium">{item.label}</span>
                  </div>

                  <ChevronRight className="size-4 text-muted-foreground" />
                </Link>
              )}
              {item.isButtton && (
                <Button
                  key={item.label}
                  onClick={() =>
                    authClient.signOut({
                      fetchOptions: { onSuccess: () => router.push("/") },
                    })
                  }
                  className="flex items-center justify-between border-b px-4 py-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="size-5 text-muted-foreground" />

                    <span className="text-sm font-medium">{item.label}</span>
                  </div>

                  <ChevronRight className="size-4 text-muted-foreground" />
                </Button>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
