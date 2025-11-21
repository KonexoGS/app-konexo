import z from "zod";

export const registerFormSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter no mínimo 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, insira um endereço de e-mail válido.",
  }),
  password: z.string().min(8, {
    message: "A senha deve ter no mínimo 8 caracteres.",
  }),
  confirmPassword: z.string().min(8, {
    message: "A confirmação de senha deve ter no mínimo 8 caracteres.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
