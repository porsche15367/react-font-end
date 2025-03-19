import axios from "axios";
import { getAuthToken } from "./auth";
import { useLoadingStore } from "./loading";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
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

    const token = getAuthToken();
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
      // Handle unauthorized error (e.g., redirect to login)
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
