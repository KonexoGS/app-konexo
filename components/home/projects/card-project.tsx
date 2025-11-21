import React from 'react'

import { Project } from '@/interfaces/project'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/shadcn';
import { CardContent, CardFooter } from '@/components/shadcn/card';
import { iconsMap } from '@/constants/icon-map';

interface CardProjectProps {
  project: Project;
}

export default function CardProject({ project }: CardProjectProps) {
  return (
    <Card className='bg-linear-to-br from-card to-sidebar-accent backdrop-blur-sm border rounded-xl hover:bg-background/80 transition-all duration-300 hover:shadow-lg hover:scale-105 h-full flex flex-col'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-base md:text-lg line-clamp-2'>{project.project_name}</CardTitle>
        <CardDescription className='flex flex-col gap-2 text-xs md:text-xs'>
          Tecnologias utilizadas
          <div className="flex gap-2">
            {project.stacks.map((stack) => {
              const stackKey = stack.toLowerCase() as keyof typeof iconsMap;
              const iconKey = iconsMap[stackKey] || stack.toLowerCase();
              return (
                <i
                  key={stack}
                  className={`devicon-${iconKey}-plain bg-[linear-gradient(90deg,#421A60,#711B87,#9F1882,#DD2BAD)] dark:bg-[linear-gradient(90deg,#29D757,#72EB8B,#8FE479,#BEE49F)] bg-clip-text text-transparent`}
                  style={{ fontSize: 18 }}
                />
              );
            })}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-3'>
        <p className='text-xs md:text-sm line-clamp-3'>{project.short_description}</p>
      </CardContent>
      <CardFooter className='pt-3'>
        <p className='text-xs'><span className='text-sidebar-primary'>Project by </span>{project.owner_name}</p>
      </CardFooter>
    </Card>
  )
}