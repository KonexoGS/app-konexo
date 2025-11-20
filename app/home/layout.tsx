import { SidebarProvider } from "@/components/shadcn/sidebar"
import { AppSidebar } from "@/components/home/app-sidebar"
import SearchTab from "@/components/home/search-tab"
import { cookies } from "next/headers"

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SearchTab/>
      <main className="w-full">
        {children}
      </main>
    </SidebarProvider>
  )
}