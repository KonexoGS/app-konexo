"use client"

import React, { useState } from 'react'
import { Button, Popover, PopoverContent, PopoverTrigger } from '../shadcn'
import { Circle, PanelLeftIcon } from 'lucide-react'
import { SidebarControlOptions } from './app-sidebar';

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

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          data-sidebar="trigger"
          data-slot="sidebar-trigger"
          variant="ghost"
          size="icon"
          className="size-7 cursor-pointer hover:bg-sidebar-accent"
        >
          <PanelLeftIcon className="text-gray-800" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="text-xs border-b p-2 px-4 font-medium text-gray-500">
          Sidebar control
        </div>
        <div className="flex flex-col w-auto p-1">
          <Button
            onClick={() => handleSelection("open")}
            variant="ghost"
            className="text-gray-700 py-1 h-7 text-xs justify-start hover:bg-sidebar-accent hover:text-shadow-gray-700"
          >
            <span className="min-w-2">
              {sidebarState === "open" && <Circle className="size-2" fill="#364153" />}
            </span>
            Expandido
          </Button>
          <Button
            onClick={() => handleSelection("closed")}
            variant="ghost"
            className="text-gray-700 py-1 h-7 text-xs justify-start hover:bg-sidebar-accent hover:text-shadow-gray-700"
          >
            <span className="min-w-2">
              {sidebarState === "closed" && <Circle className="size-2" fill="#364153" />}
            </span>
            Encolhido
          </Button>
          <Button
            onClick={() => handleSelection("hover")}
            variant="ghost"
            className="text-gray-700 py-1 h-7 text-xs justify-start hover:bg-sidebar-accent hover:text-shadow-gray-700"
          >
            <span className="min-w-2">
              {sidebarState === "hover" && <Circle className="size-2" fill="#364153" />}
            </span>
            Expande ao passar o mouse
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}