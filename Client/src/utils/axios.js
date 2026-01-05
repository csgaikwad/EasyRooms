import axios from "axios";

const api = axios.create({
   baseURL: import.meta.env.VITE_BACKEND_URL || "https://easyrooms-ssg.koyeb.app/api/v1",
  // baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1",

  withCredentials: false, // No cookies
});

// Automatically add Bearer token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global 401 handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default api;