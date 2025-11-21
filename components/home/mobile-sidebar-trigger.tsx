"use client";

import { SidebarTrigger, useSidebar } from "@/components/shadcn/sidebar";
import { Button } from "@/components/shadcn";

export function MobileSidebarTrigger() {
  const { isMobile } = useSidebar();

  if (!isMobile) return null;

  return (
    <Button variant="outline" className="absolute w-0.5 right-4 top-4">
      <SidebarTrigger />
    </Button>
  );
}