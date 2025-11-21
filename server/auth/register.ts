'use server'

import { RegisterFormSchema, registerFormSchema } from "@/validation/register-schema";
import axios from 'axios';
import z from "zod";

export async function register(data: RegisterFormSchema) {
  const validation = registerFormSchema.safeParse({
    name: data.name,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword
  });

  if (!validation.success) {
    return {
      success: false,
      validation_errors: z.treeifyError(validation.error)
    }
  }

  try {
    const res = await axios.post("https://localhost:8000/auth/register", {
      name: data.name,
      email: data.email,
      password: data.password
    })
    
    console.log(res.data);

    return {
      success: true,
      data: res.data
    }

  } catch (error: any) {
    console.error(error.message);

    return {
      success: false,
      error: error.message
    }
  }
}
