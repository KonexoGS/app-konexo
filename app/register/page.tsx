import { RegisterForm } from "./register-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full bg-muted items-center justify-center p-6 md:p-10 dark:bg-radial from-[#260135] from-5% to-[#060010]">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  )
}