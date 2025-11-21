"use client"

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllDevs } from '@/server/devs/get-all-devs'
import { Input } from '@/components/shadcn'
import { Search } from 'lucide-react'
import DevCard from '@/components/devs/dev-card'
import { Developer } from '@/interfaces/developer'

export default function DevsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: devsData, isLoading, error } = useQuery({
    queryKey: ['developers'],
    queryFn: getAllDevs,
    select: (data) => {
      if (!data.success || !data.data) return []
      
      const developers = data.data as Developer[]
      
      if (!searchTerm.trim()) return developers
      
      return developers.filter((dev) =>
        dev.full_name.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
    }
  })

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Erro ao carregar desenvolvedores</h2>
          <p className="text-muted-foreground">Tente novamente mais tarde</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-10 bg-linear-to-br from-background to-accent/20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col gap-2 mb-4">
            <h1 className="text-4xl w-fit font-semibold bg-linear-to-r from-[#421A60] via-[#711B87] to-[#DD2BAD] dark:from-[#29D757] dark:via-[#8FE479] dark:to-[#BEE49F] text-transparent bg-clip-text">
            Desenvolvedores
          </h1>
          <h3 className="text-sm md:text-base text-sidebar-accent-foreground font-light">
            Encontre e conecte-se com desenvolvedores talentosos
          </h3>
          </div>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-80"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {devsData?.map((dev) => (
              <DevCard key={dev.dev_id} developer={dev} />
            ))}
          </div>
        )}

        {devsData?.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Nenhum desenvolvedor encontrado</h3>
            <p className="text-muted-foreground">
              {searchTerm.trim() 
                ? 'Tente buscar por outro nome'
                : 'Não há desenvolvedores cadastrados'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}