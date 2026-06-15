"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { CreditCard, LogOut, Settings, User, UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { toast } from "sonner";

interface UserButtonProps {
  children: ReactNode;
  type: "MOBILE" | "DESKTOP";
}

export function UserButton({ children, type }: UserButtonProps) {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <Button
        size={"icon"}
        variant={"ghost"}
        className={"animate-pulse flex-col"}
      >
        <UserIcon className="size-5" />
        <span className="text-xs">Account</span>
      </Button>
    );
  }

  if (!data) {
    return (
      <Button
        size={"icon"}
        variant={"ghost"}
        className={"flex flex-col"}
        onClick={() => router.push("/signin")}
      >
        {children}
        <span>Signin</span>
      </Button>
    );
  }
  if (data && type === "MOBILE") {
    return (
      <Button
        size={"icon-lg"}
        variant={"ghost"}
        className={"flex flex-col"}
        onClick={() => router.push("/account")}
      >
        {children}
        <span>Account</span>
      </Button>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button size={"icon"} variant={"ghost"}>
            {children}
          </Button>
        }
      />

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem
              render={
                <Link
                  href="/account/profile"
                  className="w-full flex items-center cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              }
            />

            <DropdownMenuItem
              render={
                <Link
                  href="/account/billing"
                  className="w-full flex items-center cursor-pointer"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </Link>
              }
            />

            <DropdownMenuItem
              render={
                <Link
                  href="/account/settings"
                  className="w-full flex items-center cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              }
            />
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            className="text-destructive focus:text-destructive cursor-pointer"
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.success("Signout successfully");
                  },
                },
              })
            }
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
