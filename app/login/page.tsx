import { LoginForm } from "./login-form"
export default function Page() {
  return (
    <div className="flex min-h-svh w-full bg-muted items-center justify-center p-6 md:p-10 dark:bg-radial from-purple-800 via-purple-950 to-purple-950/30">
      <div className="w-full max-w-sm">
        <LoginForm/>
      </div>
    </div>
  )
}