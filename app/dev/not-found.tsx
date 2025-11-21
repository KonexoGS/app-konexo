import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center text-center space-y-8">
        <Image
          className="dark:invert"
          src="/logo.svg"
          alt="Logo da Konexo"
          width={80}
          height={80}
          priority
        />
        <h1 className="text-6xl font-bold bg-[linear-gradient(90deg,#421A60,#711B87,#9F1882,#DD2BAD)] dark:bg-[linear-gradient(90deg,#29D757,#72EB8B,#8FE479,#BEE49F)] bg-clip-text text-transparent">404</h1>
        <h2 className="text-2xl font-semibold">Usuário não encontrado</h2>
        <p className="text-muted-foreground">
          A usuário que você está procurando não existe ou foi removido.
        </p>
        <a
          href="/home"
          className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Voltar ao início
        </a>
      </div>
    </div>
  )
}