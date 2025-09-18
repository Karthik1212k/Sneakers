import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
};

export type User = {
  _id?: string;
  email?: string;
  phone?: string;
  name?: string;
  image?: string;
  wishlist?: Product[];
  shared?: Product[];
} | null;

type AuthContextType = {
  user: User;
  signOut: () => void;
  signInWithEmail: (email: string, password: string) => Promise<boolean>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<boolean>;

  // Wishlist
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;

  // Shared products
  addSharedProduct: (product: Product) => Promise<void>;

  // Profile updates
  updateProfile: (updates: Partial<User>) => Promise<void>;

  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);
const TOKEN_KEY = "auth_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const signOut = () => {
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  // --- API HELPERS ---
  const getToken = () => localStorage.getItem(TOKEN_KEY);

  const signInWithEmail: AuthContextType["signInWithEmail"] = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem(TOKEN_KEY, data.token);
        setUser(data.user);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const signUpWithEmail: AuthContextType["signUpWithEmail"] = async (email, password, name) => {
    try {
      // Step 1: Register
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();

      if (data.success) {
        // Step 2: Auto-login
        const loginRes = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const loginData = await loginRes.json();

        if (loginData.success) {
          localStorage.setItem(TOKEN_KEY, loginData.token);
          setUser(loginData.user);
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  };

  const refreshUser = async () => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setUser(data.user);
    } catch {}
  };

  // --- Wishlist ---
  const addToWishlist = async (product: Product) => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch("http://localhost:5000/api/user/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      if (data.success) setUser(data.user);
    } catch {}
  };

  const removeFromWishlist = async (productId: string) => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:5000/api/user/wishlist/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setUser(data.user);
    } catch {}
  };

  // --- Shared Products ---
  const addSharedProduct = async (product: Product) => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch("http://localhost:5000/api/user/shared", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      if (data.success) setUser(data.user);
    } catch {}
  };

  // --- Profile Updates ---
  const updateProfile = async (updates: Partial<User>) => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (data.success) setUser(data.user);
    } catch {}
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      signOut,
      signInWithEmail,
      signUpWithEmail,
      addToWishlist,
      removeFromWishlist,
      addSharedProduct,
      updateProfile,
      refreshUser,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
