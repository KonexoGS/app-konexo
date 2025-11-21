import React from 'react'
import { Project } from '@/interfaces/project';
import CardProject from './card-project';
import { Separator } from '@/components/shadcn';

interface SectionProjectsProps {
  title?: string;
  description?: string;
  projects: Project[]
}

export default function SectionProjects({ title, description, projects }: SectionProjectsProps) {
  return (
    <div className="w-full flex flex-col gap-3 md:gap-5">
      <div className="flex w-full items-center gap-3 md:gap-5">
        <span className="text-sm text-sidebar-primary font-light">{title}</span>
        <Separator className='flex-1' />
      </div>
      {description && <h3 className="text-sm text-sidebar-accent-foreground font-base">{description}</h3>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
        {projects.map((project, index) => (
          <CardProject
            key={`${project.owner_id}-${project.project_name}-${index}`}
            project={project}
          />
        ))}
      </div>
    </div>
  )
}
