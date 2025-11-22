'use server'

import { cookies } from 'next/headers'
import { deleteSession } from '@/app/lib/session'
import { redirect } from 'next/navigation'

export async function logoutAction() {
  await deleteSession()
  redirect('/login')
}