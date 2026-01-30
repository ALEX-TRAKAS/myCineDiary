import { Redirect } from "expo-router";
import { useAuth } from "../../auth/AuthContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/" />;
  }

  return <>{children}</>;
}
