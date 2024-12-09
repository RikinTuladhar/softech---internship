import axios from "axios";
import Cookies from "js-cookie";
// export const baseurl = "http://localhost:8000/api/v1";
const baseurl = "https://hariyali-inventory-backend.onrender.com/api/v1";

const apiClient = axios.create({
  baseURL: baseurl,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

export const mainApi = async (method: string, url: string, data?: any) => {
  try {
    const response = await apiClient({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error with API call:",
        error.response?.data || error.message,
      );
      throw error.response?.data || error;
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
};
