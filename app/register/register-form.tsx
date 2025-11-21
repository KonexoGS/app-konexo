"use client"

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
} from "@/components/shadcn/field"
import { Input } from "@/components/shadcn/input"
import Image from "next/image"
import Link from "next/link"
import { registerFormSchema, RegisterFormSchema } from "@/validation/register-schema"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { register } from "@/server/auth/register"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/form"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: "onSubmit",
  })

  const handleSubmit = async (data: RegisterFormSchema) => {
    const res = await register(data);

    if (res?.validation_errors?.properties) {
      Object.entries(res.validation_errors.properties).forEach(([property, val]) => {
        const errorMessage = val?.errors?.[0] || 'Campo inválido';
        form.setError(property as 'name' | 'email' | 'password' | 'confirmPassword', { message: errorMessage });
      });
      return;
    }
    
    console.log(res.data);
    
  }

  return (
    <div className={cn("flex justify-center items-center selection:bg-purple-950 selection:text-white dark:selection:text-[#260135] dark:selection:bg-primary", className)} {...props}>
      <Card className="w-full max-w-lg px-2 sm:px-5 dark:bg-[#ffffff0e] dark:backdrop-blur-[5px] dark:border-[#ffffff30]">
        <CardHeader className="flex flex-col items-center gap-2">
          <Image
            className="dark:invert"
            alt="Logo da Konexo"
            src='/logo.svg'
            width={40}
            height={40}
            priority
          />
          <CardTitle className="text-center text-purple-950 dark:text-white text-lg">Crie sua conta</CardTitle>
          <CardDescription className="dark:text-white/80 text-sm">
            Preencha os dados abaixo para criar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 sm:space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='not-dark:text-purple-950 font-medium!'>Nome</FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Digite seu nome"
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
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='not-dark:text-purple-950 font-medium!'>Confirmar Senha</FormLabel>
                      <FormControl>
                        <Input
                          id="confirmPassword"
                          type="password"
                          className="dark:placeholder:text-white/70 dark:focus-visible:border-[#ffffff4c] dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0"
                          placeholder="Confirme sua senha"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </div>
              <Field className="gap-4">
                <Button className="cursor-pointer bg-purple-950 hover:bg-purple-900 dark:text-[#260135] dark:bg-primary dark:hover:bg-primary/90" type="submit">Registrar</Button>
                <FieldDescription className="text-center dark:text-white/70">
                  Já tem uma conta? <Link href="/login" className="not-dark:hover:text-purple-950">Entrar</Link>
                </FieldDescription>
              </Field>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}