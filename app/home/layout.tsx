import { SidebarProvider } from "@/components/shadcn/sidebar"
import { AppSidebar } from "@/components/home/app-sidebar"

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="w-full">
        {children}
      </main>
    </SidebarProvider>
  )
}