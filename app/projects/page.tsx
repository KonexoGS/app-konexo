"use client"

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllProjects } from '@/server/projects/get-all-projects'
import { Input } from '@/components/shadcn'
import { Search } from 'lucide-react'
import { Project } from '@/interfaces/project'
import CardProject from '@/components/home/projects/card-project'

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: projectsData, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: getAllProjects,
    select: (data) => {
      if (!data.success || !data.data) return []
      
      const projects = data.data as Project[]
      
      if (!searchTerm.trim()) return projects
      
      return projects.filter((project) =>
        project.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.short_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase())) ||
        project.stacks.some(stack => stack.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
  })

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Erro ao carregar projetos</h2>
          <p className="text-muted-foreground">Tente novamente mais tarde</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-linear-to-br from-background to-accent/20 p-4 md:p-10 pt-6 md:pt-12 h-screen space-y-6 md:space-y-8 overflow-y-auto scrollbar-custom sidebar-custom-without-radius">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col gap-2 mb-4">
            <h1 className="text-4xl w-fit font-semibold bg-linear-to-r from-[#421A60] via-[#711B87] to-[#DD2BAD] dark:from-[#29D757] dark:via-[#8FE479] dark:to-[#BEE49F] text-transparent bg-clip-text">
            Projetos
          </h1>
          <h3 className="text-sm md:text-base text-sidebar-accent-foreground font-light">
            Explore projetos incríveis desenvolvidos pela comunidade
          </h3>
          </div>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar projetos..."
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
            {projectsData?.map((project, index) => (
              <CardProject key={`${project.owner_id}-${project.project_name}-${index}`} project={project} />
            ))}
          </div>
        )}

        {projectsData?.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Nenhum projeto encontrado</h3>
            <p className="text-muted-foreground">
              {searchTerm.trim() 
                ? 'Tente buscar com outros termos'
                : 'Não há projetos cadastrados'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}