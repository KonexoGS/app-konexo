import { SidebarProvider } from "@/components/shadcn/sidebar"
import { AppSidebar } from "@/components/home/app-sidebar"
import { getAllUsers } from "@/server/get-all-users"

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="w-full">
        {children}
      </main>
    </SidebarProvider>
  )
}