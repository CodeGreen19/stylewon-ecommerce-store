"use client";

import { Logo } from "@/components/logo";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import {
  LucideIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  X,
} from "lucide-react";
import { useState } from "react";

export function DesktopNav() {
  const [value, setValue] = useState<string>("");
  return (
    <div className="px-4 xl:px-0 max-w-7xl m-auto space-y-1.5">
      <div className="flex items-center justify-between pt-3 gap-10">
        <Logo />

        <InputGroup>
          <InputGroupInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search..."
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end" className="cursor-pointer">
            <X />
          </InputGroupAddon>
        </InputGroup>

        <Navitems />
      </div>
      <NavigationMenuDemo />
    </div>
  );
}

type NavItem = {
  label: string;
  icon: LucideIcon;
};
const items: NavItem[] = [
  { label: "Cart", icon: ShoppingCartIcon },
  { label: "Account", icon: UserIcon },
];
function Navitems() {
  return (
    <div className="flex items-center justify-between gap-2">
      {items.map((item) =>
        item.label === "Account" ? (
          <UserButton key={item.label}>
            <NavItem icon={item.icon} label={item.label} />
          </UserButton>
        ) : item.label === "Cart" ? (
          <CartSheet key={item.label}>
            <NavItem icon={item.icon} label={item.label} />
          </CartSheet>
        ) : (
          <NavItem key={item.label} icon={item.icon} label={item.label} />
        ),
      )}
    </div>
  );
}

function NavItem({ icon: Icon }: NavItem) {
  return (
    <div
      className={cn(
        "flex items-center flex-col gap-0.1 p-3 hover:bg-accent-foreground",
      )}
    >
      <Icon className="size-5" />
    </div>
  );
}

import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { UserButton } from "./user-button";
import { CartSheet } from "../../cart/components/cart-sheet";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96">
              <ListItem href="/docs" title="Introduction">
                Re-usable components built with Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:flex">
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px]">
              <li>
                <NavigationMenuLink
                  render={
                    <Link href="#" className="flex-row items-center gap-2">
                      <CircleAlertIcon />
                      Backlog
                    </Link>
                  }
                />
                <NavigationMenuLink
                  render={
                    <Link href="#" className="flex-row items-center gap-2">
                      <CircleDashedIcon />
                      To Do
                    </Link>
                  }
                />
                <NavigationMenuLink
                  render={
                    <Link href="#" className="flex-row items-center gap-2">
                      <CircleCheckIcon />
                      Done
                    </Link>
                  }
                />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<Link href="/docs">Docs</Link>}
          />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link href={href}>
            <div className="flex flex-col gap-1 text-sm">
              <div className="leading-none font-medium">{title}</div>
              <div className="line-clamp-2 text-muted-foreground">
                {children}
              </div>
            </div>
          </Link>
        }
      />
    </li>
  );
}
