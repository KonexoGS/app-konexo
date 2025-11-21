import React from 'react'

import { Project } from '@/interfaces/project'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/shadcn';
import { CardContent, CardFooter } from '@/components/shadcn/card';

interface CardProjectProps {
  project: Project;
}

export default function CardProject({ project }: CardProjectProps) {
  return (
    <Card className='bg-linear-to-br from-card to-sidebar-accent h-full flex flex-col'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-base md:text-lg line-clamp-2'>{project.project_name}</CardTitle>
        <CardDescription className='flex flex-col gap-2 text-xs md:text-sm'>
          Tecnologias utilizadas
          <i className="devicon-javascript-plain colored" style={{ fontSize: 18 }}></i>
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-3'>
        <p className='text-xs md:text-sm line-clamp-3'>{project.full_description}</p>
      </CardContent>
      <CardFooter className='pt-3'>
        <p className='text-xs md:text-sm'>Luis Scaccheti</p>
      </CardFooter>
    </Card>
  )
}
