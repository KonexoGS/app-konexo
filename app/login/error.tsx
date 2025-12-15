'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // TODO: INSERIR O ERRO NO BANCO E MOSTRAR EM UM PAINEL
    // loga o erro pra equipe de desenvolvedores
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Ocorreu um erro interno ao tentar realizar seu login. Tente novamente mais tarde.</h2>
      <button
        onClick={
          // tentativa de recuperação re-renderizando a rota
          () => reset()
        }
      >
        Tentar novamente
      </button>
    </div>
  )
}