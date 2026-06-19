import {
  BookOpen,
  ChartPie,
  Handshake,
  LucideIcon,
  Server,
  Settings,
  ShoppingBag,
  Store,
  UserSearch,
} from "lucide-react";

export interface SidebarMenuType {
  url: string;
  title: string;
  icon?: LucideIcon;
  subMenu?: SidebarMenuType[];
}

export const storeSidebarMenu: SidebarMenuType[] = [
  { title: "Dashboard", icon: ChartPie, url: "/store/dashboard" },
  {
    title: "Products",
    icon: ShoppingBag,
    url: "/store/products",
  },
  {
    title: "Inventory",
    icon: Store,
    url: "/store/inventory",
  },
  {
    title: "Categories",
    icon: BookOpen,
    url: "/store/categories",
  },
  {
    title: "Orders",
    icon: Server,
    url: "/store/orders",
  },
  {
    title: "Manual Sells",
    icon: Handshake,
    url: "/store/manual-sells",
  },
  {
    title: "Users",
    icon: UserSearch,
    url: "/store/users",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/store/settings",
  },
];
