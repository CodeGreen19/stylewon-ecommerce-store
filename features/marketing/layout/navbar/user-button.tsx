"use client";

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
import { CreditCard, LogOut, MapPinHouse, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { toast } from "sonner";

interface UserButtonProps {
  children: ReactNode;
}

export function UserButton({ children }: UserButtonProps) {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return <span className="animate-pulse">{children}</span>;
  }
  if (!data) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          nativeButton={false}
          render={<span>{children}</span>}
        />

        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                render={
                  <Link
                    href="/signup"
                    className="w-full flex items-center cursor-pointer"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Sign up</span>
                  </Link>
                }
              />

              <DropdownMenuItem
                render={
                  <Link
                    href="/signin"
                    className="w-full flex items-center cursor-pointer"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Sign in</span>
                  </Link>
                }
              />
            </DropdownMenuGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton={false}
        render={<span>{children}</span>}
      />

      <DropdownMenuContent className="w-56 " align="end">
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
                  href="/account/orders"
                  className="w-full flex items-center cursor-pointer"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Orders</span>
                </Link>
              }
            />
            <DropdownMenuItem
              render={
                <Link
                  href="/account/address"
                  className="w-full flex items-center cursor-pointer"
                >
                  <MapPinHouse className="mr-2 h-4 w-4" />
                  <span>Address</span>
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
