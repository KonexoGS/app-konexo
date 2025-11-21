"use client"

import React, { useState, useEffect } from 'react'
import { Separator, Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/shadcn'
import { useExploreStore } from '@/hooks/stores/use-explore-store'
import { useQuery } from '@tanstack/react-query'
import { searchUsers } from '@/server/users/search-user'
import { Search } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/shadcn/input-group'
import { Spinner } from '@/components/shadcn/spinner'
import { cn } from '@/app/lib/utils'
import { SearchItem } from './search-item'
import { ItemGroup } from '@/components/shadcn/item'
import { User } from '@/interfaces/user'

export default function SearchTab() {

  const isExploreOpen = useExploreStore((state) => state.isExploreOpen);
  const closeExplore = useExploreStore((state) => state.closeExplore);
  const [isMobile, setIsMobile] = useState(false);

  // estado fonte imediato
  const [search, setSearch] = useState('');

  // estado debounce para não buscar assim que muda
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Detecta se é mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // faz o debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);

    return () => clearTimeout(timer);
  }, [search]);

  // busca através do debounce
  const { data: filteredUsers, isLoading: isSearchingUsers, isError } = useQuery({
    queryKey: ['users', debouncedSearch],
    queryFn: () => searchUsers('name', debouncedSearch),
    select: (data) => {
      if (!data?.success || !data.data || !debouncedSearch) return data?.data || [];

      return data.data.filter((user: any) =>
        user.full_name?.toLowerCase().startsWith(debouncedSearch.toLowerCase())
      );
    },
    staleTime: Infinity,
    enabled: debouncedSearch.length > 0,
    refetchOnWindowFocus: false
  })

  const handleOpenChange = (open: boolean) => { if (!open) closeExplore() }

  return (
    <Sheet open={isExploreOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        aria-describedby='search'
        side={isMobile ? "right" : "left"}
        className={cn(
          "gap-0.5 flex flex-col",
          isMobile ? "w-full" : "w-[400px]"
        )}
        style={!isMobile ? {
          left: '3rem',
          width: '400px'
        } : undefined}
        onInteractOutside={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest('[data-sidebar-button-id="explore"]')) {
            e.preventDefault();
          }
        }}
      >
        <SheetHeader className='pt-3'>
          <SheetTitle>Explorar</SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground">
            Busque por usuários ou projetos na plataforma.
          </SheetDescription>
        </SheetHeader>

        <div className='px-4 pb-4 flex flex-col flex-1 min-h-0'>
          <InputGroup>
            <InputGroupInput
              value={search}
              placeholder="Pesquise por pessoas"
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              {isSearchingUsers
                ? <Spinner />
                : filteredUsers && `${filteredUsers?.length} resultado${filteredUsers?.length > 1 || filteredUsers?.length === 0 ? 's' : ''}`
              }
            </InputGroupAddon>
          </InputGroup>

          <Separator className='my-4 mt-5' />

          <div className='flex-1 pr-2 overflow-y-auto min-h-0 scrollbar-custom'>
            {!debouncedSearch && (
              // TODO: MOSTRAR HITÓRICO DE PESQUISA
              <p className="text-muted-foreground text-sm font-light text-center">Digite para pesquisar usuários</p>
            )}

            {debouncedSearch && !isSearchingUsers && filteredUsers && filteredUsers.length === 0 && (
              <p className="text-muted-foreground text-sm font-light text-center">Nenhum resultado encontrado</p>
            )}

            {debouncedSearch && !isSearchingUsers && isError && (
              <p className="text-destructive text-sm font-light text-center">
                Erro ao buscar usuários
              </p>
            )}

            {filteredUsers && filteredUsers.length > 0 && (
              <ItemGroup className="gap-2">
                {filteredUsers.map((user: User) => (
                  <SearchItem key={user.username} user={user} />
                ))}
              </ItemGroup>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}