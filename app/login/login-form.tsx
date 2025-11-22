"use client"

import { cn } from "@/app/lib/utils"
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
} from "@/components/shadcn/field"
import { Input } from "@/components/shadcn/input"
import Image from "next/image"
import Link from "next/link"
import { loginFormSchema, LoginFormSchema } from "@/validation/login-schema"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { login } from "@/server/auth/login"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/form"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: 'elaine.ramos0@example.com',
      password: 'Drifter@92Mirage',
    },
    mode: "onSubmit",
  })

  const router = useRouter();

  const handleSubmit = async (data: LoginFormSchema) => {
    const res = await login(data);
    
    if(!res.success && res.error) {
      console.log(res.error);
      
      form.setError('root', {
        type: 'manual',
        message: 'Usuário ou senha inválidos'
      })
    }else{
       router.push('/home');
    }
  }

  return (
    <div className={cn("flex justify-center selection:bg-purple-950 selection:text-white dark:selection:text-[#260135] dark:selection:bg-primary", className)} {...props}>
      <Card className="min-w-sm dark:bg-[#ffffff0e] dark:backdrop-blur-[5px] dark:border-[#ffffff30]">
        <CardHeader className="flex flex-col items-center gap-4">
          <Image
            className="dark:invert"
            alt="Logo da Konexo"
            src='/logo.svg'
            width={40}
            height={40}
            priority
          />
          <CardTitle className="text-center text-purple-950 dark:text-white text-lg">Entre na sua conta</CardTitle>
          <CardDescription className="dark:text-white/80">
            Insira seu e-mail abaixo para entrar na sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-10">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='not-dark:text-purple-950 font-medium!'>Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Digite seu e-mail"
                        className="dark:placeholder:text-white/70 dark:focus-visible:border-[#ffffff4c] dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='not-dark:text-purple-950 font-medium!'>Senha</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        className="dark:placeholder:text-white/70 dark:focus-visible:border-[#ffffff4c] dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0"
                        placeholder="Digite sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <Field className="gap-4">
                <Button className="cursor-pointer bg-purple-950 hover:bg-purple-900 dark:text-[#260135] dark:bg-primary dark:hover:bg-primary/90" type="submit">Login</Button>
                {form.formState.errors.root && (
                  <div className="text-red-500 text-sm text-center">
                    {form.formState.errors.root.message}
                  </div>
                )}
                <FieldDescription className="text-center dark:text-white/70">
                  Não tem uma conta? <Link href="/register" className="not-dark:hover:text-purple-950">Registre-se</Link>
                </FieldDescription>
              </Field>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}