"use server"

import axios from "axios";

export async function getAllUsers() {
  try {
    const res = await axios.get("http://localhost:8000/default-profiles");

    if (!res.data) {
      return {
        success: false,
        error: res.status
      }
    }

    return {
      success: true,
      data: res.data
    }

  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: error
    }
  }
}