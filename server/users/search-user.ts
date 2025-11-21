"use server";

import axios from "axios";

type SearchProjectsQueryParams = "username" | "name";

export async function searchUsers(
  queryParam: SearchProjectsQueryParams,
  term: string
) {
  try {
    const res = await axios.get(
      `http://konexoapi.chilecentral.cloudapp.azure.com/devs/search?${queryParam}=${term}`
    );

    return {
      success: true,
      data: res.data || [],
    };
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return {
        success: true,
        data: [],
      };
    }

    console.error(error);

    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
