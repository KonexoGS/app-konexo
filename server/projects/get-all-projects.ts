"use server";

import axios from "axios";

export async function getAllProjects() {
  try {
    const res = await axios.get(
      "http://konexoapi.chilecentral.cloudapp.azure.com/projects"
    );

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: error,
    };
  }
}
