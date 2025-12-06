"use server";

import { Developer } from "@/interfaces/developer";
import axios from "axios";

export async function getDeveloperByUsername(username: string) {
  try {
    const res = await axios.get(
      `${process.env.API_URL}/devs/profile/${username}`
    );

    return {
      success: true,
      data: res.data as Developer,
    };
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return {
        success: false,
        status: 404,
      };
    }

    console.error(error);

    return {
      success: false,
      error: error,
    };
  }
}
