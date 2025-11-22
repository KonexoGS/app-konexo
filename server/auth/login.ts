"use server";

import { LoginFormSchema, loginFormSchema } from "@/validation/login-schema";
import { createSession } from "@/app/lib/session";
import axios from "axios";
import z from "zod";

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
      "http://konexoapi.chilecentral.cloudapp.azure.com/auth/token",
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const user = await axios.get(`http://konexoapi.chilecentral.cloudapp.azure.com/devs/profile/${res.data.username}`);    

    await createSession(user.data.user_id, data.email);

    return {
      success: true,
      data: res.data,
      user: user.data,
    };
  } catch (error: any) {
    console.error(error.message);

    return {
      success: false,
      error: error.message,
    };
  }
}