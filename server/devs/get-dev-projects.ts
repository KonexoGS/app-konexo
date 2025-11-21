"use server"

import { Project } from "@/interfaces/project";
import axios from "axios";

export async function getDeveloperProjects(ownerId: string) {
  try {
    const res = await axios.get(`http://localhost:8000/devs/projects/${ownerId}`);

    return {
      success: true,
      data: res.data as Project[],
    }
  } catch (error: any) {

    if (error?.response?.status === 404) {
      return {
        success: false,
        status: 404,
      }
    }

    console.error(error);

    return {
      success: false,
      error: error
    }
  }
}