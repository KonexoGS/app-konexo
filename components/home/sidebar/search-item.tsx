import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/shadcn/item"
import { useExploreStore } from "@/hooks/stores/use-explore-store";
import { User } from "@/interfaces/user"
import Link from "next/link";
import { UserAvatar } from "./user-avatar";
import { getInitials } from "@/utils/get-initials";

export function SearchItem({ user }: { user: User }) {

  const closeExplore = useExploreStore((state) => state.closeExplore);

  return (
    <Item onClick={closeExplore} variant="outline" asChild role="listitem">
      <Link href={`/dev/${user.username}`}>
        <ItemMedia variant="image">
          <UserAvatar
            initials={getInitials(user.full_name)}
            // TODO: COLOCAR URL QUANDO ESTIVER PRONTA NA API
            src={user.username}
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">
            {user.full_name} • {" "}
            <span className="text-muted-foreground">@{user.username}</span>
          </ItemTitle>
          <ItemDescription>{user.headline}</ItemDescription>
        </ItemContent>
        {/* <ItemContent className="flex-none text-center">
          <ItemDescription>{song.duration}</ItemDescription>
        </ItemContent> */}
      </Link>
    </Item>
  )
}