import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar"

interface UserAvatarProps {
  initials: string;
  src: string;
  alt?: string;
}

export function UserAvatar({ initials, src, alt="avatar" }: UserAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className="bg-linear-to-br from-[#421A60] via-[#711B87] to-[#DD2BAD] dark:from-[#29D757] dark:via-[#8FE479] dark:to-[#BEE49F] text-background">{initials}</AvatarFallback>
    </Avatar>
  )
}