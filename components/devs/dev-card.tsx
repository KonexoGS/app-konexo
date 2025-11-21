"use client"

import { Developer } from '@/interfaces/developer'
import { getInitials } from '@/utils/get-initials'
import { iconsMap } from '@/constants/icon-map'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/shadcn/badge'
import { MapPin, Star } from 'lucide-react'

interface DevCardProps {
  developer: Developer
}

export default function DevCard({ developer }: DevCardProps) {
  const {
    username,
    profile_photo,
    full_name,
    headline,
    tech_skills,
    address,
    dev_level,
    is_recommend
  } = developer

  return (
    <Link 
      href={`/dev/${username}`} 
      className="group block bg-linear-to-br from-card to-sidebar-accent backdrop-blur-sm border rounded-xl p-6 hover:bg-background/80 transition-all duration-300 hover:shadow-lg hover:scale-105"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Profile Photo */}
        <div className="relative">
          {profile_photo ? (
            <Image
              src={profile_photo}
              alt={`Foto de perfil de ${full_name}`}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-[#421A60] via-[#711B87] to-[#DD2BAD] dark:from-[#29D757] dark:via-[#8FE479] dark:to-[#BEE49F] text-background flex items-center justify-center text-xl font-medium">
              {getInitials(full_name)}
            </div>
          )}
          
          {is_recommend && (
            <div className="absolute -top-1 -right-1">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            </div>
          )}
        </div>

        {/* Name and Level */}
        <div className="space-y-1">
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
            {full_name}
          </h3>
          <Badge variant="secondary" className="text-xs">
            {dev_level?.charAt(0).toUpperCase() + dev_level?.slice(1)}
          </Badge>
        </div>

        {/* Headline */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {headline}
        </p>

        {/* Location */}
        {address && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>{address}</span>
          </div>
        )}

        {/* Tech Skills */}
        <div className="flex flex-wrap justify-center gap-1 max-h-12 overflow-hidden">
          {tech_skills.slice(0, 6).map((skill, index) => {
            const skillKey = skill.toLowerCase() as keyof typeof iconsMap;
            const iconKey = iconsMap[skillKey] || skill.toLowerCase();
            return (
              <div
                key={skill}
                className="flex items-center justify-center w-6 h-6"
                title={skill}
              >
                <i 
                  className={`devicon-${iconKey}-plain bg-[linear-gradient(90deg,#421A60,#711B87,#9F1882,#DD2BAD)] dark:bg-[linear-gradient(90deg,#29D757,#72EB8B,#8FE479,#BEE49F)] bg-clip-text text-transparent transition-colors`} 
                  style={{ fontSize: 16 }}
                />
              </div>
            );
          })}
          {tech_skills.length > 6 && (
            <div className="flex items-center justify-center w-6 h-6">
              <span className="text-xs text-muted-foreground">
                +{tech_skills.length - 6}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}