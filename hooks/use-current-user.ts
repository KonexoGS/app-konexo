import { useUser } from '@/contexts/UserContext'

/**
 * Hook para acessar os dados do usuário em qualquer componente dentro da rota /home
 * 
 * @returns {object} Objeto contendo:
 *   - user: Os dados do usuário logado ou null se não estiver disponível
 *   - isLoading: Boolean indicando se ainda está carregando (sempre false neste caso)
 *   - isLoggedIn: Boolean indicando se o usuário está logado
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { user, isLoggedIn } = useCurrentUser()
 *   
 *   if (!isLoggedIn) {
 *     return <div>Usuário não encontrado</div>
 *   }
 *   
 *   return (
 *     <div>
 *       <h1>Olá, {user.full_name}!</h1>
 *       <p>Email: {user.email}</p>
 *     </div>
 *   )
 * }
 * ```
 */
export function useCurrentUser() {
  const { user } = useUser()
  
  return {
    user,
    isLoading: false,
    isLoggedIn: !!user,
  }
}