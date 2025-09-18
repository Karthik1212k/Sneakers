import { useState } from "react";
import { useAuth } from "@/store/auth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const { createTemporaryAccount, user } = useAuth(); // temp account function
  const { toast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Create temporary account
      const tempAccountCreated = await createTemporaryAccount({ name, email, password });
      setLoading(false);

      if (tempAccountCreated) {
        toast({
          title: "Temporary Account Created",
          description: `Welcome, ${name}! You can now complete your profile.`,
        });

        // reset form
        setName("");
        setEmail("");
        setPassword("");

        // go to profile/account page
        navigate("/account");
      } else {
        toast({
          title: "Signup Failed",
          description: "Please try again with a different email.",
          variant: "destructive",
        });
      }
    } catch (err) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-center">Create Temporary Account</h1>
      <p className="mt-2 text-center text-muted-foreground">
        Fill in your details to start immediately.
      </p>

      <form
        className="mt-8 max-w-md mx-auto border rounded-xl p-6 grid gap-4"
        onSubmit={handleSignup}
      >
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="h-11 rounded-md border px-3 focus:outline-none focus:ring-2 focus:ring-primary"
        />
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
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
