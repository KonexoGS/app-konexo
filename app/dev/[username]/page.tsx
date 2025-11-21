import { searchUsers } from "@/server/users/search-user"
import { notFound } from "next/navigation";

export default async function DeveloperProfile({
  params,
}: {
  params: Promise<{ username: string }>
}) {

  const { username } = await params

  const res = await searchUsers('username', username);
  
  if(res.data.length === 0) notFound();

  return <div>My Post: {username}</div>
}