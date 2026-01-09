import axios from "axios";
import {getToken} from "../pages/utils/auth";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default api;
