import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/store/auth"; // ✅ make sure path matches your project

export default function GoogleAuthCallback() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Save token
      localStorage.setItem("auth_token", token);

      // ✅ Refresh user from backend & redirect to profile
      refreshUser().then(() => navigate("/profile"));
    } else {
      // No token → redirect to login
      navigate("/profile");
    }
  }, [navigate, refreshUser]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-lg font-medium">Logging in with Google...</p>
    </div>
  );
}
