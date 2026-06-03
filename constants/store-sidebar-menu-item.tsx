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
    subMenu: [
      { title: "Add new product", url: "/store/products/add-new" },
      {
        title: "Update product",
        url: "/store/products/[productId]/update",
      },

      {
        title: "Product details",
        url: "/store/products/[productId]/view",
      },
    ],
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
