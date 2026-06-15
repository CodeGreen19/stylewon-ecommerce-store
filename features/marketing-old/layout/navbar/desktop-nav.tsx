import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Home,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";
import { UserButton } from "./user-button";
import Link from "next/link";
import { CartButton } from "./cart-button";

export function DeskTopNav() {
  return (
    <nav className="border-b bg-secondary">
      <div className=" flex items-center justify-between max-w-7xl m-auto  h-20 ">
        <div>Categories</div>

        <Logo />
        <div className="flex items-center justify-between gap-2">
          <Button variant={"ghost"} size={"icon-lg"}>
            <SearchIcon className="size-5" />
          </Button>
          <Button variant={"ghost"} size={"icon-lg"}>
            <Heart className="size-5" />
          </Button>
          <CartButton />
          <UserButton type="DESKTOP">
            <UserIcon className="size-5" />
          </UserButton>
        </div>
      </div>
    </nav>
  );
}
