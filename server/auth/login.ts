'use server'
import 'server-only'

import z from "zod";
import axios from "axios";
import { LoginFormSchema, loginFormSchema } from "@/validation/login-schema";
import { createSession } from "@/app/lib/session";

export async function login(data: LoginFormSchema) {
  const validation = loginFormSchema.safeParse({
    email: data.email,
    password: data.password,
  });

  if (!validation.success) {
    return {
      success: false,
      validation_errors: z.treeifyError(validation.error),
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('username', data.email);
    formData.append('password', data.password);

    const res = await axios.post(
      `${process.env.API_URL}/auth/token`,
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const user = await axios.get(
      `${process.env.API_URL}/devs/profile/${res.data.username}`
    );

    await createSession(user.data.user_id, data.email);

    console.log(user.data);

    return {
      success: true,
    };
  } catch (error: any) {
    console.error(error.message);

    return {
      success: false,
      error: error.message,
    };
  }
}