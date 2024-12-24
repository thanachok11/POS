import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategory = async (name: string) => {
  try {
    const response = await axios.post(`${API_URL}/categories`, { name });
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};
