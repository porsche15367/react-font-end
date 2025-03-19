import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RootLayout } from "@/layouts/RootLayout";
import { Home } from "@/pages/Home";
import { Products } from "@/pages/Products";
import { Categories } from "@/pages/Categories";
import { Profile } from "@/pages/Profile";
import { Wishlist } from "@/pages/Wishlist";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import { useAuthStore } from "@/lib/auth";
import { Loader } from "./components/ui/loader";

// Create a client
const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Loader />
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <div>Dashboard (Protected)</div>
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
