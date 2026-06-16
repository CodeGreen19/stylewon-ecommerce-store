"use client";

import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileInfo() {
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return <ProfileInfoSkeleton />;
  }

  const user = data?.user;

  return (
    <Card>
      <CardHeader className="pb-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative size-24 shrink-0 overflow-hidden rounded-full border bg-muted">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name ?? "User"}
                  fill
                  className="object-cover"
                />
              ) : null}
            </div>

            <div className="min-w-0 space-y-2">
              <h1 className="truncate text-2xl font-semibold">{user?.name}</h1>

              <p className="truncate text-muted-foreground">{user?.email}</p>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={user?.emailVerified ? "default" : "secondary"}
                  className="rounded-none"
                >
                  {user?.emailVerified ? "Verified" : "Unverified"}
                </Badge>
              </div>
            </div>
          </div>

          <Button className="rounded-none w-full md:w-auto">
            Edit Profile
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-8 md:grid-cols-2">
          <InfoItem label="Full Name" value={user?.name} />

          <InfoItem label="Email Address" value={user?.email} />

          <InfoItem label="User ID" value={user?.id} />

          <InfoItem
            label="Email Status"
            value={user?.emailVerified ? "Verified" : "Not Verified"}
          />

          {"createdAt" in (user ?? {}) && (
            <InfoItem
              label="Joined"
              value={new Date((user as any).createdAt).toLocaleDateString()}
            />
          )}

          {"updatedAt" in (user ?? {}) && (
            <InfoItem
              label="Last Updated"
              value={new Date((user as any).updatedAt).toLocaleDateString()}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="break-all font-medium">{value || "-"}</p>
    </div>
  );
}

export function ProfileInfoSkeleton() {
  return (
    <Card className="rounded-none">
      <CardHeader className="pb-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="size-24 rounded-full" />

            <div className="space-y-3">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>

          <Skeleton className="h-10 w-full md:w-32" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-full max-w-[250px]" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
