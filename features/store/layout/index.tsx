import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { StoreSidebar } from "./store-sidebar";
import { StoreHeader } from "./store-header";
import { Suspense } from "react";

export function StoreLayout(props: LayoutProps<"/">) {
  return (
    <SidebarProvider>
      <Suspense>
        <StoreSidebar variant="sidebar" collapsible="icon" />
      </Suspense>
      <SidebarInset>
        <Suspense>
          <StoreHeader />
        </Suspense>
        <main className="pb-10 md:px-6 ">{props.children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
