import { LoginForm } from "./login-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full bg-muted items-center justify-center p-6 md:p-10 dark:bg-radial from-[#260135] from-5% to-[#060010]">
      <Link 
        href="/" 
        className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Voltar</span>
      </Link>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}