import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/src/api/user";
import { clearTokens } from "@/src/lib/tokenStorage";

type AuthContextType = {
  user: any | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const me = await getCurrentUser();
      setUser(me);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await clearTokens();
    setUser(null);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, refreshUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
