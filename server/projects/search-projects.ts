"use server"

import { Project } from "@/interfaces/project";
import axios from "axios";

type SearchProjectsQueryParams = 'category' | 'project_id' | 'name';

export async function searchProjects(queryParam: SearchProjectsQueryParams, term: string) {

  try {
    const res = await axios.get(`http://localhost:8000/projects/search?category=api`);

    return {
      success: true,
      data: res.data as Project[]
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