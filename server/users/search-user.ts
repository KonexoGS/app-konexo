"use server"

import axios from "axios";

export async function searchUsers(term: string) {
  try {
    const res = await axios.get(`http://localhost:8000/default-profiles/search?username=${term}`);

    return {
      success: true,
      data: res.data || []
    }

  } catch (error: any) {

    if (error?.response?.status === 404) {
      return {
        success: true,
        data: []
      }
    }

    console.error(error);

    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
}