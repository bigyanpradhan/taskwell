import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Conetent-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
