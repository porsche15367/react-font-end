import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "./axios";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthResponse {
  user: User;
  access_token: string;
  token?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<AuthResponse>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      login: async (email: string, password: string) => {
        try {
          const response = await api.post<AuthResponse>("/auth/login", {
            email,
            password,
          });
          set({ token: response.data.access_token, user: response.data.user });
          return response.data;
        } catch {
          throw new Error("Login failed");
        }
      },
      signup: async (name: string, email: string, password: string) => {
        try {
          const response = await api.post<AuthResponse>("/auth/register", {
            name,
            email,
            password,
          });
          set({ token: response.data.access_token, user: response.data.user });
          return response.data;
        } catch {
          throw new Error("Signup failed");
        }
      },
      logout: () => set({ token: null, user: null }),
      isAuthenticated: false,
    }),
    {
      name: "auth-storage",
    }
  )
);

export const getAuthToken = () => useAuthStore.getState().token;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  name: string;
  confirmPassword: string;
}
