"use client"

import { createContext, useContext } from 'react'
import { User } from '@/interfaces/user'

// Tipo de resposta da API
interface ApiResponse {
  success: boolean
  data: User | User[] | []
  error?: string
}

interface UserContextType {
  user: User | null
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
    ? userData.data
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