import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type User = { email?: string; phone?: string } | null;

type AuthContextType = {
  user: User;
  signOut: () => void;
  signInWithEmail: (email: string, password: string) => Promise<boolean>;
  startPhoneSignIn: (phone: string) => Promise<string>; // returns demo OTP
  verifyPhoneOtp: (phone: string, code: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | null>(null);
const KEY = "demo_auth_user_v1";
const OTP_KEY = "demo_auth_otp_v1";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(user));
    } catch {}
  }, [user]);

  const signOut = () => setUser(null);

  const signInWithEmail: AuthContextType["signInWithEmail"] = async (email, password) => {
    const ok = /.+@.+\..+/.test(email) && password.length >= 6;
    if (ok) setUser({ email });
    return ok;
  };

  const startPhoneSignIn: AuthContextType["startPhoneSignIn"] = async (phone) => {
    const code = (Math.floor(100000 + Math.random() * 900000)).toString();
    const payload = { phone, code, exp: Date.now() + 10 * 60 * 1000 };
    localStorage.setItem(OTP_KEY, JSON.stringify(payload));
    return code;
  };

  const verifyPhoneOtp: AuthContextType["verifyPhoneOtp"] = async (phone, code) => {
    try {
      const raw = localStorage.getItem(OTP_KEY);
      if (!raw) return false;
      const payload = JSON.parse(raw) as { phone: string; code: string; exp: number };
      const ok = payload.phone === phone && payload.code === code && payload.exp > Date.now();
      if (ok) setUser({ phone });
      return ok;
    } catch {
      return false;
    }
  };

  const value = useMemo<AuthContextType>(() => ({ user, signOut, signInWithEmail, startPhoneSignIn, verifyPhoneOtp }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
