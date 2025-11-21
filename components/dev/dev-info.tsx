"use client"

import { iconsMap } from '@/constants/icon-map'
import { getInitials } from '@/utils/get-initials'
import { BadgeCheck, MapPin, Send } from 'lucide-react';
import Image from 'next/image'
import React, { useState } from 'react'
import { Button, Separator, Tooltip, TooltipTrigger, TooltipContent } from '../shadcn';
import { recommendDev } from '@/server/devs/recommend-dev';
import { toast } from 'sonner';
import { useTheme } from '@/contexts/ThemeContext';

interface DevInfoProps {
  profile_photo: string;
  full_name: string;
  headline: string;
  tech_skills: string[];
  is_recommend: boolean;
  dev_id: string;
  address: string;
  dev_level: "junior" | "pleno" | "senior";
  experience: {
    company: string;
    role: string;
    begin: string;
    end: string | null;
    description: string;
  }[];
  languages: {
    name: string;
    level: string;
  }[];
  social_medias: {
    linkedin?: string;
    github?: string;
  };
}

export default function DevInfo({
  profile_photo,
  full_name,
  headline,
  tech_skills,
  is_recommend: initialIsRecommend,
  dev_id,
  address,
  dev_level,
  experience,
  languages,
  social_medias
}: DevInfoProps) {

  const [isRecommend, setIsRecommend] = useState(initialIsRecommend);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const tooltipColor = theme === 'dark' ? '#8FE479' : '#6e11b0';
  const tooltipTextColor = theme === 'dark' ? '#000000' : '#ffffff';

  const handleToggleRecommend = async () => {
    setIsLoading(true);
    try {
      const res = await recommendDev(dev_id, !isRecommend);
      if (res.success) {
        setIsRecommend(!isRecommend);
      }

      if (!isRecommend) {
        toast.success('Recomendado!', {
          position: 'top-right',
        });
      } else {
        toast('Removida!', {
          position: 'top-right'
        });
      }

    } catch (error) {
      console.error('erro ao alterar recomendação:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-w-full p-6 md:p-10 bg-linear-to-l to-accent">
      <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-10">
        {profile_photo ? (
          <Image
            src={profile_photo}
            alt={`foto de perfil de ${full_name}`}
            width={96}
            height={96}
            className="w-24 h-24 md:w-40 md:h-40 rounded-full object-cover"
          />
        ) : (
          <div
            className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-linear-to-br from-[#421A60] via-[#711B87] to-[#DD2BAD] dark:from-[#29D757] dark:via-[#8FE479] dark:to-[#BEE49F] text-background flex items-center justify-center text-4xl md:text-6xl font-medium"
          >
            {getInitials(full_name)}
          </div>
        )}
        
        <div className="flex flex-col gap-3 md:gap-5 items-center md:items-start text-center md:text-left">
          <div className="flex flex-col gap-1 md:gap-2">
            
            <div className="flex items-center gap-3 md:gap-5">
              <h1 className="text-3xl md:text-5xl font-semibold">{full_name}</h1>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleToggleRecommend}
                    variant={'ghost'}
                    className='mt-1 cursor-pointer p-0! h-fit hover:bg-transparent!'
                    disabled={isLoading}
                  >
                    <BadgeCheck
                      className={`size-6 md:size-7 transition-colors ${isRecommend
                        ? "text-purple-800 dark:text-[#8FE479]"
                        : "text-muted-foreground hover:text-[#8FE479]"
                        }`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side='right'
                  arrowColor={tooltipColor}
                  style={{
                    backgroundColor: tooltipColor,
                    color: tooltipTextColor,
                    border: 'none'
                  }}
                >
                  {!isRecommend ? 'Recomendar' : 'Remover'}
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 md:h-5 md:gap-4">
              
              <h3 className="text-sm md:text-base text-sidebar-primary font-medium">{headline}</h3>
              
              <Separator orientation='vertical' className='max-h-4 bg-sidebar-accent-foreground hidden sm:block' />
              
              <span className="text-xs md:text-sm font-medium px-2 py-1 text-sidebar-primary rounded-full">
                {dev_level.charAt(0).toUpperCase() + dev_level.slice(1)}
              </span>
              
              <Separator orientation='vertical' className='max-h-4 bg-sidebar-accent-foreground' />
              
              <h4 className='font-medium text-xs md:text-sm text-sidebar-primary'>
                <MapPin className="w-3 h-3 md:w-4 md:h-4 inline mr-1 text-sidebar-primary" />
                {address}
              </h4>
            </div>
          </div>
          
          <div className="flex gap-2">
            {tech_skills.map((skill) => {
              const skillKey = skill.toLowerCase() as keyof typeof iconsMap;
              const iconKey = iconsMap[skillKey] || skill.toLowerCase();
              return (
                <Tooltip key={skill}>
                  <TooltipTrigger asChild>
                    <i className={`devicon-${iconKey}-plain bg-linear-to-br from-[#421A60] via-[#711B87] to-[#DD2BAD] dark:from-[#29D757] dark:via-[#8FE479] dark:to-[#BEE49F] text-transparent bg-clip-text`} style={{ fontSize: 16 }}></i>
                  </TooltipTrigger>
                  <TooltipContent
                    side='bottom'
                    arrowColor={tooltipColor}
                    style={{
                      backgroundColor: tooltipColor,
                      color: tooltipTextColor,
                      border: 'none'
                    }}
                  >
                    {skill}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
          
          <Button className='w-full md:w-1/2 cursor-pointer  bg-linear-to-br from-[#421A60] via-[#711B87] to-[#DD2BAD] dark:from-[#29D757] dark:via-[#8FE479] dark:to-[#BEE49F]'>
            <Send/>
            Enviar mensagem
          </Button>
        </div>
      </div>
    </div>
  )
}