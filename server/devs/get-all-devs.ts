"use server";

import axios from "axios";

export async function getAllDevs() {
  try {
    const res = await axios.get(
      `${process.env.API_URL}/devs`
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
