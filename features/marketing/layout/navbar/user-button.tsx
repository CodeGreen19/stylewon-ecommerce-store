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
import { CreditCard, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

interface UserButtonProps {
  children: ReactNode;
  type: "MOBILE" | "DESKTOP";
}

export function UserButtonWrapper({ children, type }: UserButtonProps) {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );

  // 2. If user exists, render the full Shadcn Dropdown Menu
  if (!user) {
    return (
      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={() => router.push("/signin")}
      >
        {children}
      </Button>
    );
  }
  if (user && type === "MOBILE") {
    return (
      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={() => router.push("/account")}
      >
        {children}
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
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
