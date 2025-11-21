import React, { ForwardRefExoticComponent, RefAttributes, useState, useEffect, useCallback, useRef } from 'react'
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn'
import { cn } from '@/app/lib/utils'
import { LucideProps } from 'lucide-react';
import Link from 'next/link';
import { useExploreStore } from '@/hooks/stores/use-explore-store';

interface SidebarIteratorProps {
  isClosed: boolean;
  pathname: string;
  sidebarControl: 'open' | 'closed' | 'hover';
  setOpen: (open: boolean) => void;
  items: {
    id: string;
    title: string;
    url?: string;
    onClick?: () => void;
    disabled?: boolean;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  }[];
}

export default function SidebarIterator({
  isClosed,
  pathname,
  items,
}: SidebarIteratorProps) {

  // store do explore
  const openExplore = useExploreStore((state) => state.openExplore);
  const isExploreOpen = useExploreStore((state) => state.isExploreOpen);
  const closeExplore = useExploreStore((state) => state.closeExplore);

  const [openTooltipId, setOpenTooltipId] = useState<string | null>(null);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  // salva o item anterior para retornar a ela quando o explorer fechar
  const previousActiveItemId = useRef<string | null>(null);

  // determina o item ativo baseado no pathname
  useEffect(() => {
    const activeItem = items.find(item => item.url === pathname);
    if (activeItem) {
      setActiveItemId(activeItem.id);

      // salva o item ativo apenas se não for o explore
      if (activeItem.id !== "explore") {
        previousActiveItemId.current = activeItem.id;
      }
    }
  }, [pathname, items]);

  // restaura o item ativo anterior quando o explore fecha
  useEffect(() => {
    if (!isExploreOpen && previousActiveItemId.current) {
      setActiveItemId(previousActiveItemId.current);
    }
  }, [isExploreOpen]);

  // reseta o tooltip quando a sidebar muda de estado
  useEffect(() => setOpenTooltipId(null), [isClosed]);

  const handleClick = useCallback((e: React.MouseEvent, item: typeof items[0]) => {
    if (item.id === "explore") {
      e.preventDefault();

      if (isExploreOpen) {
        closeExplore();
        return;
      }

      // salva o item ativo atual antes de abrir o explore
      if (activeItemId && activeItemId !== "explore") {
        previousActiveItemId.current = activeItemId;
      }

      setOpenTooltipId(null);
      setActiveItemId(item.id);
      openExplore();
    } else {
      // define o item ativo ao clicar em outros itens
      setActiveItemId(item.id);
      previousActiveItemId.current = item.id;
    }
  }, [isExploreOpen, closeExplore, openExplore, activeItemId]);

  // função helper para verificar se o item está ativo
  const isItemActive = (item: typeof items[0]) => {
    return activeItemId === item.id;
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = isItemActive(item);

            return (
              <Tooltip
                delayDuration={500}
                key={item.id}
                open={isClosed && openTooltipId === item.id}
                onOpenChange={(open) => setOpenTooltipId(open ? item.id : null)}
              >
                <TooltipTrigger asChild>
                  <SidebarMenuItem key={item.title}>
                    {item.disabled ? (
                      <SidebarMenuButton disabled={true} isActive={isActive}>
                        <item.icon />
                        <span className="font-light">{item.title} - Coming soon</span>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton isActive={isActive} asChild>
                        <Link
                          href={item.url ?? "#"}
                          onClick={(e) => handleClick(e, item)}
                          data-sidebar-button-id={item.id}
                          className="cursor-pointer py-2! text-sidebar-primary"
                        >
                          <item.icon />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                </TooltipTrigger>
                <TooltipContent className="z-52 bg-sidebar-accent text-sidebar-primary" side="right">
                  {item.title}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}