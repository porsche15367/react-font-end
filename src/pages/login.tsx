import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { login, useAuthStore } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      console.log("Attempting login...");
      const response = await login(data);
      console.log("Login successful:", response);

      if (!response.access_token) {
        throw new Error("No access token received");
      }

      console.log("Setting token and user...");
      setToken(response.access_token);
      setUser(response.user);

      console.log("Current auth state:", {
        token: useAuthStore.getState().token,
        user: useAuthStore.getState().user,
        isAuthenticated: useAuthStore.getState().isAuthenticated,
      });

      // Force a state update before navigation
      setTimeout(() => {
        console.log("Attempting navigation...");
        navigate("/products", { replace: true });
      }, 100);
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    }
  };

  // Log when component mounts or auth state changes
  console.log("Login page render - Auth state:", {
    isAuthenticated,
    token: useAuthStore.getState().token,
    user: useAuthStore.getState().user,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Button
              variant="link"
              onClick={() => navigate("/signup")}
              className="p-0"
            >
              Sign up
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
