import { SidebarMenuType } from "@/constants/store-sidebar-menu-item";

type Breadcrumb = {
  title: string;
  url: string;
};

export function findBreadcrumbs(
  menus: SidebarMenuType[],
  pathname: string,
): Breadcrumb[] {
  for (const menu of menus) {
    const breadcrumbs = matchRoute(menu, pathname);

    if (breadcrumbs.length > 0) {
      return breadcrumbs;
    }

    if (menu.subMenu) {
      const child = findBreadcrumbs(menu.subMenu, pathname);

      if (child.length > 0) {
        return [
          {
            title: menu.title,
            url: menu.url,
          },

          ...child,
        ];
      }
    }
  }

  return [];
}
function matchRoute(menu: SidebarMenuType, pathname: string): Breadcrumb[] {
  const patternParts = menu.url.split("/");
  const pathParts = pathname.split("/");

  if (patternParts.length !== pathParts.length) {
    return [];
  }

  const breadcrumbs: Breadcrumb[] = [];

  for (let i = 0; i < patternParts.length; i++) {
    const pattern = patternParts[i];
    const path = pathParts[i];

    // dynamic segment
    if (pattern.startsWith("[") && pattern.endsWith("]")) {
      breadcrumbs.push({
        title: path,
        url: "",
      });

      continue;
    }

    // mismatch
    if (pattern !== path) {
      return [];
    }
  }

  // add current page title
  breadcrumbs.push({
    title: menu.title,
    url: menu.url,
  });

  return breadcrumbs;
}
