"use client"

import { createContext, useContext } from 'react'
import { User as UserInterface } from '@/interfaces/user'

// Tipo de resposta da API
interface ApiResponse {
  success: boolean
  data: UserInterface | UserInterface[] | []
  error?: string
}

interface UserContextType {
  user: UserInterface | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ 
  children, 
  userData 
}: { 
  children: React.ReactNode
  userData: ApiResponse
}) {
  // Extrair o usuário dos dados da API
  const user = userData.success && Array.isArray(userData.data) && userData.data.length > 0 
    ? userData.data[0] 
    : userData.success && !Array.isArray(userData.data) 
    ? userData.data as UserInterface
    : null

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}