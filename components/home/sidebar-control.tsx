"use client"

import React, { useState } from 'react'
import { Button, Popover, PopoverContent, PopoverTrigger } from '../shadcn'
import { Circle, PanelLeftIcon } from 'lucide-react'
import { SidebarControlOptions } from './app-sidebar';
import { useTheme } from '@/contexts/ThemeContext';

interface SidebarControlProps {
  sidebarState: SidebarControlOptions;
  selectOption: (option: SidebarControlOptions) => void;
}

export default function SidebarControl({ sidebarState, selectOption }: SidebarControlProps) {

  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleSelection = (selection: SidebarControlOptions) => {
    setPopoverOpen(false);
    selectOption(selection)
  }

  const { theme } = useTheme();

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          data-sidebar="trigger"
          data-slot="sidebar-trigger"
          variant="ghost"
          size="icon"
          className="size-8 cursor-pointer hover:bg-sidebar-accent"
        >
          <PanelLeftIcon className="text-sidebar-primary size-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="text-xs border-b p-2 px-4 font-medium text-sidebar-primary-foreground">
          Sidebar control
        </div>
        <div className="flex flex-col w-auto p-1">
          <Button
            onClick={() => handleSelection("open")}
            variant="ghost"
            className="text-sidebar-primary py-1 h-7 text-xs justify-start hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <span className="min-w-2">
              {sidebarState === "open" && <Circle className="size-2" fill={theme !== "dark"? "#364153" : "oklch(70.9% 0.01 56.259)"} />}
            </span>
            Expandido
          </Button>
          <Button
            onClick={() => handleSelection("closed")}
            variant="ghost"
            className="text-sidebar-primary py-1 h-7 text-xs justify-start hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <span className="min-w-2">
              {sidebarState === "closed" && <Circle className="size-2" fill={theme !== "dark"? "#364153" : "oklch(70.9% 0.01 56.259)"} />}
            </span>
            Encolhido
          </Button>
          <Button
            onClick={() => handleSelection("hover")}
            variant="ghost"
            className="text-sidebar-primary py-1 h-7 text-xs justify-start hover:bg-sidebar-accent hover:text-shadow-gray-700"
          >
            <span className="min-w-2">
              {sidebarState === "hover" && <Circle className="size-2" fill={theme !== "dark"? "#364153" : "oklch(70.9% 0.01 56.259)"} />}
            </span>
            Expande ao passar o mouse
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}