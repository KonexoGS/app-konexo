'use server'

import { LoginFormSchema, loginFormSchema } from "@/validation/login-schema";
import axios from 'axios';
import z, { success } from "zod";

export async function login(data: LoginFormSchema) {
  const validation = loginFormSchema.safeParse({
    email: data.email,
    password: data.password
  });

  if (!validation.success) {
    return {
      success: false,
      validation_errors: z.treeifyError(validation.error)
    }
  }

  try {
    const res = await axios.post("https://localhost:8000/auth/token", {
      email: data.email,
      password: data.password,
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