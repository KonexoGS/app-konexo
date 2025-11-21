"use server"

import axios from "axios";

export async function recommendDev(devId: string, is_recommend: boolean = true) {
  try {
    const res = await axios.patch(`http://localhost:8000/devs/recommend?dev_id=${devId}&is_recommend=${is_recommend}`);

    return {
      success: true,
    }

  } catch (error: any) {
    console.error(error);

    return {
      success: false,
      error: error
    }

  }
}