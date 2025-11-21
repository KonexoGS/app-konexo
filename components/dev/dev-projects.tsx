import React from 'react'
import SectionProjects from '../home/projects/section-projects'
import { Project } from '@/interfaces/project'

interface DevProjectsProps {
  participatingProjects: Project[];
  ownProjects: Project[];
}

export default function DevProjects({ participatingProjects, ownProjects }: DevProjectsProps) {
  return (
    <div className='w-full flex flex-col gap-5 p-10'>
      <h1 className='text-2xl font-semibold mb-4'>Projetos</h1>
      <SectionProjects title='Participando' projects={participatingProjects} />
      {ownProjects.length > 0 && <SectionProjects title='Projetos próprios' projects={ownProjects} />}
    </div>
    
  )
}
