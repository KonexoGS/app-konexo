import { SidebarProvider } from "@/components/shadcn/sidebar"
import { AppSidebar } from "@/components/home/sidebar/app-sidebar"
import SearchTab from "@/components/home/sidebar/search-tab"
import { cookies } from "next/headers"
import { MobileSidebarTrigger } from "@/components/home/sidebar/mobile-sidebar-trigger"
import { requireAuth } from "@/auth/auth"
import { getUserByEmail } from "@/server/users/get-user-by-email"
import { UserProvider } from "@/contexts/UserContext"

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  const session = await requireAuth();
  
  const user = await getUserByEmail(session.email!);

  return (
    <UserProvider userData={user}>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SearchTab />
        <MobileSidebarTrigger />
        <main className="w-full">
          {children}
        </main>
      </SidebarProvider>
    </UserProvider>
  )
}