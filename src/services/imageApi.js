import axios from "axios";

const API_KEY = "47020901-c16cd9b40dcd0c1387a72a1fb";
const BASE_URL = "https://pixabay.com/api/";

export const searchImages = async (query) => {

  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: { q: query, key: API_KEY },
    });
    return response.data.hits;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};
