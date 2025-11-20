import React, { ForwardRefExoticComponent, RefAttributes } from 'react'
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, Tooltip, TooltipContent, TooltipTrigger } from '../shadcn'
import { cn } from '@/lib/utils'
import { LucideProps } from 'lucide-react';

interface SidebarContentProps {
  isClosed: boolean;
  pathname: string;
  items: {
    title: string;
    url: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  }[];
}

export default function SidebarIterator({
  isClosed,
  pathname,
  items
}: SidebarContentProps) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <Tooltip key={item.title} disableHoverableContent open={isClosed ? undefined : false}>
              <TooltipTrigger asChild>
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className={cn("py-2! text-sidebar-primary", (pathname === item.url && "bg-sidebar-accent!"))}>
                      <item.icon className={cn(pathname === item.url && "text-sidebar-accent-foreground")} />
                      <span className={cn("font-medium", (pathname === item.url && "text-sidebar-accent-foreground"))}>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </TooltipTrigger>
              <TooltipContent className="bg-sidebar-accent text-sidebar-primary" side="right">
                {item.title}
              </TooltipContent>
            </Tooltip>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}