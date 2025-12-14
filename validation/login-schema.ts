import z from "zod";

export const loginFormSchema = z.object({
  email: z.email({
    message: "Insira um endereço de e-mail válido.",
  }),
  password: z.string().nonempty("Insira a senha").min(8, {
    message: "A senha deve ter no mínimo 8 caracteres.",
  }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;