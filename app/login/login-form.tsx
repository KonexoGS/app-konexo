"use client"

import { cn } from "@/app/lib/utils"
import { Button } from "@/components/shadcn/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/card"
import { Field, FieldDescription } from "@/components/shadcn/field"
import { Input } from "@/components/shadcn/input"
import Image from "next/image"
import Link from "next/link"
import { loginFormSchema, LoginFormSchema } from "@/validation/login-schema"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { login } from "@/server/auth/login"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Spinner } from "@/components/shadcn/spinner"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: 'elaine.ramos0@example.com',
      password: 'Drifter@92Mirage',
    },
    mode: "onSubmit",
  })

  const [error, setError] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (data: LoginFormSchema) => {

    const res = await login(data);

    if (!res.success) {
      // caso haja erro de validação
      if (res.validation_errors) {
        // caso haja um erro geral de validação
        if (res.validation_errors.errors) {
          form.setError('root', {
            type: 'manual',
            message: res.validation_errors.errors[0]
          })
        }
        // caso haja erro em campos específicos
        if (res.validation_errors.properties) {
          Object.keys(res.validation_errors.properties).forEach(key => {
            if (key === 'email' || key === 'password') {
              form.setError(key, {
                type: 'manual',
                message: res.validation_errors.properties![key]?.errors[0]
              });
            }
          })
        }

        return
      }

      if (res.error?.message) {
        form.setError('root', {
          type: 'manual',
          message: res.error.message
        });

        return
      }

      setError(true);

    } else {
      router.push('/home');
    }
  }

  if (error) throw new Error("Erro na página de login");

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
                    <FormLabel className='data-[error=true]:text-red-500 not-dark:text-purple-950 font-medium!'>Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Digite seu e-mail"
                        className="dark:placeholder:text-white/70 dark:focus-visible:border-[#ffffff4c] dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0 aria-invalid:border-red-500"
                        required
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 font-semibold" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='data-[error=true]:text-red-500 not-dark:text-purple-950 font-medium!'>Senha</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        className="dark:placeholder:text-white/70 dark:focus-visible:border-[#ffffff4c] dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0 aria-invalid:border-red-500"
                        placeholder="Digite sua senha"
                        required
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 font-semibold" />
                  </FormItem>
                )}
              />
              <Field className="gap-4">
                <Button
                  className="cursor-pointer bg-purple-950 hover:bg-purple-900 dark:text-[#260135] dark:bg-primary dark:hover:bg-primary/90"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? <Spinner /> : 'Login'}
                </Button>
                {form.formState.errors.root && (
                  <div className="text-red-500 text-sm text-center font-semibold">
                    {form.formState.errors.root.message}
                  </div>
                )}
                <FieldDescription className="flex justify-center gap-1 dark:text-white/70">
                  Não tem uma conta?
                  <Button
                    variant='link'
                    className="p-0 h-auto cursor-pointer not-dark:text-purple-950"
                    disabled={form.formState.isSubmitting}
                  >
                    <Link href="/register">
                      Registre-se
                    </Link>
                  </Button>
                </FieldDescription>
              </Field>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}