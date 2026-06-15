import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Heart, Home, SearchIcon, UserIcon } from "lucide-react";
import { CartButton } from "./cart-button";
import { UserButton } from "./user-button";

export function MobileNav() {
  return (
    <div className="border-b bg-secondary">
      <nav className="flex items-center justify-between h-20 px-4">
        <div className="space-y-1">
          <div className="h-1 w-10 bg-foreground"></div>
          <div className="h-1 w-10 bg-foreground"></div>
        </div>
        <Logo />
        <div className="flex items-center gap-1">
          <SearchIcon />
        </div>
      </nav>
      <div className="flex items-center justify-between bg-secondary border-t  px-4 py-2 fixed bottom-0 left-0 w-full z-50">
        <Button variant={"ghost"} size={"icon-lg"} className={"flex flex-col"}>
          <Home className="size-5" />
          <span>Home</span>
        </Button>
        <Button variant={"ghost"} size={"icon-lg"} className={"flex flex-col"}>
          <Heart className="size-5" />
          <span className="text-xs">Favourite</span>
        </Button>
        <CartButton />
        <UserButton type="MOBILE">
          <UserIcon className="size-5" />
        </UserButton>
      </div>
    </div>
  );
}
