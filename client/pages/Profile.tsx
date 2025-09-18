import { useState } from "react";
// The useNavigate hook is no longer needed as we will stay on the same page.

// Define the structure of the user object for clarity
interface User {
  id: string;
  name: string;
  email: string;
}

// Define the structure of the successful login response
interface LoginResponse {
  token: string;
  user: User;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // This function would typically live in an auth context or store.
  // For simplicity, it's included here.
  const loginUser = (token: string, user: User) => {
    // Store the token and user details in localStorage to persist the session
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    console.log("User logged in and session saved.");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // --- Form Validation ---
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // --- API Call to Backend ---
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        // --- Successful Login ---
        const { token, user } = data as LoginResponse;

        // Save the token and user data
        loginUser(token, user);
        
        // Set the logged-in user state to update the UI
        setLoggedInUser(user);

        // Notify user of success in the console
        console.log(`Login Successful. Welcome back, ${user.name}!`);

        // Reset form fields
        setEmail("");
        setPassword("");

      } else {
        // --- Failed Login ---
        setError(data.msg || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      // --- Network or Server Error ---
      setLoading(false);
      setError("Something went wrong. Please check your connection and try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {loggedInUser ? (
        // --- Show this view if the user IS logged in ---
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Welcome Back!</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            You are logged in as:
          </p>
          <p className="mt-2 text-xl font-medium text-primary">
            {loggedInUser.email}
          </p>
          <button
            onClick={() => {
              localStorage.clear();
              setLoggedInUser(null);
            }}
            className="mt-8 rounded-md bg-primary px-5 py-3 text-white hover:bg-primary/90"
          >
            Log Out
          </button>
        </div>
      ) : (
        // --- Show this view if the user is NOT logged in ---
        <div>
          <h1 className="text-3xl font-semibold text-center">Login or Create Account</h1>
          <p className="mt-2 text-center text-muted-foreground">
            Enter your details to sign in. New users will be registered automatically.
          </p>
          <form
            className="mt-8 max-w-md mx-auto border rounded-xl p-6 grid gap-4"
            onSubmit={handleLogin}
          >
            {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 rounded-md border px-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11 rounded-md border px-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-primary px-5 py-3 text-white hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? "Logging In..." : "Login / Sign Up"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

