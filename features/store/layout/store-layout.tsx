import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { StoreSidebar } from "./store-sidebar";
import { StoreHeader } from "./store-header";
import { Suspense } from "react";

export function StoreLayout(props: LayoutProps<"/">) {
  return (
    <SidebarProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <StoreSidebar variant="sidebar" collapsible="icon" />
      </Suspense>
      <SidebarInset>
        <main>
          <Suspense fallback={<div>loading...</div>}>
            <StoreHeader />
          </Suspense>
          <div className="px-4 pb-10 md:px-6 lg:px-12 lg:pt-4 ">
            {props.children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
