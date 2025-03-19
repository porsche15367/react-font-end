import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "./axios";

interface AuthState {
  token: string | null;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  setToken: (token: string | null) => void;
  setUser: (user: AuthState["user"]) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setToken: (token) => set({ token, isAuthenticated: !!token }),
      setUser: (user) => set({ user }),
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
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

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  try {
    const { data } = await api.post<AuthResponse>("/auth/login", credentials);
    return data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const signup = async (
  credentials: SignupCredentials
): Promise<AuthResponse> => {
  try {
    const { data } = await api.post<AuthResponse>(
      "/auth/register",
      credentials
    );
    return data;
  } catch (error) {
    throw new Error("Signup failed");
  }
};
