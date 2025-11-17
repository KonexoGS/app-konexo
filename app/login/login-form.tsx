import { cn } from "@/lib/utils"
import { Button } from "@/components/shadcn/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/shadcn/field"
import { Input } from "@/components/shadcn/input"
import Image from "next/image"
import Link from "next/link"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6 font-sans selection:bg-purple-950 selection:text-white dark:selection:text-purple-800 dark:selection:bg-primary", className)} {...props}>
      <Card className="dark:bg-[#ffffff0e] dark:backdrop-blur-[5px] dark:border-[#ffffff30]">
        <CardHeader className="flex flex-col items-center gap-4">
          <Image
            className="dark:invert"
            alt="Logo da Konexo"
            src='/logo.svg'
            width={50}
            height={50}
            priority
          />
          <CardTitle className="text-center text-purple-950 dark:text-white">Entre na sua conta</CardTitle>
          <CardDescription className="dark:text-white/80">
            Insira seu e-mail abaixo para entrar na sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email" className="text-purple-950 dark:text-white">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  className="dark:placeholder:text-white/70 dark:focus-visible:border-[#ffffff4c] dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-purple-950 dark:text-white">Password</FieldLabel>
                  <a
                    href="#"
                    className="text-purple-950 dark:text-white ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password"
                  className="dark:placeholder:text-white/60 dark:focus-visible:border-[#ffffff4c] dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0"
                  placeholder="Digite sua senha"
                  type="password"
                  required
                />
              </Field>
              <Field>
                <Button className="cursor-pointer bg-purple-950 hover:bg-purple-900 dark:text-purple-900 dark:bg-primary dark:hover:bg-primary/90" type="submit">Login</Button>
                <FieldDescription className="text-center dark:text-white/70">
                  Não tem uma conta? <Link href="/register" className="not-dark:hover:text-purple-950">Registre-se</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}