import axios from "axios";
const BASE = import.meta.env.VITE_ENDPOINT;
const api = axios.create({
  baseURL: BASE,
});
console.log("API Endpoint:", import.meta.env.ENDPOINT);
// Optional: attach token if user logs in
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // token set after login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle API responses
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API error:", error);
    return { code: "500", data: [], message: "Server Error" };
  }
);

export default api;
