import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const session = await getSession();
  
  if (!session?.userId) {
    redirect('/login');
  }
  
  return session;
}

export async function getCurrentUser() {
  const session = await getSession();
  return session;
}