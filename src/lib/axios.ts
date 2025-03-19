import axios from "axios";
import { useAuthStore } from "./auth";
import { useLoadingStore } from "./loading";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let requestCount = 0;

const updateLoadingState = () => {
  const setIsLoading = useLoadingStore.getState().setIsLoading;
  requestCount = Math.max(0, requestCount);
  setIsLoading(requestCount > 0);
};

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    requestCount++;
    updateLoadingState();

    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    requestCount--;
    updateLoadingState();
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    requestCount--;
    updateLoadingState();
    return response;
  },
  async (error) => {
    requestCount--;
    updateLoadingState();

    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;
