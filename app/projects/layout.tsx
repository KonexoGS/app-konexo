import { SidebarProvider } from "@/components/shadcn/sidebar"
import { AppSidebar } from "@/components/home/sidebar/app-sidebar"
import SearchTab from "@/components/home/sidebar/search-tab"
import { cookies } from "next/headers"

import { MobileSidebarTrigger } from "@/components/home/sidebar/mobile-sidebar-trigger"

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SearchTab />
      <MobileSidebarTrigger />
      <main className="w-full">
        {children}
      </main>
    </SidebarProvider>
  )
}