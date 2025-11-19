"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/shadcn/sidebar"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import SidebarControl from "./sidebar-control"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { NavUser } from "./nav-user"
import SidebarIterator from "./sidebar-iterator"
import { sidebarItems } from "@/constants/sidebar-items"

export type SidebarControlOptions = 'open' | 'closed' | 'hover';

export function AppSidebar() {

  const pathname = usePathname();

  const { state, setOpen } = useSidebar();

  const [sidebarControl, setSidebarControl] = useLocalStorage<SidebarControlOptions>('sidebar-control', 'hover');

  const isOpen = sidebarControl === 'open';
  const isClosed = sidebarControl === 'closed';
  const isHover = sidebarControl === 'hover';

  useEffect(() => {

    if (isHover) return;
    setOpen(isOpen);

  }, [sidebarControl, isOpen, setOpen]);

  const handleMouseEnter = () => state === "collapsed" && isHover && setOpen(true);

  const handleMouseLeave = () => state === "expanded" && isHover && setOpen(false);

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
  }

  return (
    <Sidebar
      onMouseEnter={isHover ? handleMouseEnter : undefined}
      onMouseLeave={isHover ? handleMouseLeave : undefined}
      collapsible="icon"
      className="data-[slot='sidebar-container']:group-data-[collapsible=icon]:hover:w-(--sidebar-width-icon)!"
    >
      <SidebarHeader>
        <div className="flex w-full items-center h-8 gap-2 p-1.5 overflow-hidden rounded-md transition-[width,height,padding]">
          <Image
            className="dark:invert shrink-0 min-w-5 min-h-5 max-w-5 max-h-5"
            src="/logo.svg"
            alt="Logo da Konexo"
            width={20}
            height={20}
            priority
            style={{ width: '20px', height: '20px' }}
          />
          <span className="truncate font-medium leading-tight tracking-tight bg-clip-text text-transparent bg-linear-to-r from-purple-950 via-purple-900 to-purple-700">Konexo</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarIterator
          items={sidebarItems}
          isClosed={isClosed}
          pathname={pathname}
        />
      </SidebarContent>
      <SidebarFooter>
        <SidebarControl
          sidebarState={sidebarControl}
          selectOption={setSidebarControl}
        />
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}