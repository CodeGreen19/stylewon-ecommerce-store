import {
  BookOpen,
  ChartPie,
  LucideIcon,
  ShoppingBag,
  Store,
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
];
