import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/store/auth";

export default function Profile() {
  const { toast } = useToast();
  const { user, signOut, signInWithEmail, startPhoneSignIn, verifyPhoneOtp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const onEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await signInWithEmail(email, password);
    if (ok) toast({ title: "Signed in", description: `Welcome, ${email}` });
    else toast({ title: "Login failed", description: "Check your email/password", variant: "destructive" });
  };

  const onSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = await startPhoneSignIn(phone);
    setOtpSent(true);
    toast({ title: "OTP sent", description: `Demo OTP: ${code}` });
  };

  const onVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await verifyPhoneOtp(phone, otp);
    if (ok) toast({ title: "Signed in", description: `Welcome, ${phone}` });
    else toast({ title: "Invalid OTP", description: "Please try again", variant: "destructive" });
  };

  const startGoogle = () => {
    window.location.assign("/api/auth/google/start");
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="heading-display text-3xl font-semibold text-center">Your Profile</h1>
      <p className="mt-2 text-center text-muted-foreground">Sign in to view and manage your profile details, orders, and preferences.</p>

      {user ? (
        <div className="mt-8 rounded-2xl border p-6">
          <p className="text-sm text-muted-foreground">Signed in as</p>
          <p className="mt-1 font-semibold">{user.email || user.phone}</p>
          <button onClick={signOut} className="mt-4 inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold hover:bg-muted">Sign out</button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border p-6">
            <h2 className="heading-display text-xl font-semibold">Sign in with Email</h2>
            <form className="mt-4 grid gap-3" onSubmit={onEmailLogin}>
              <div className="grid gap-2 text-left">
                <label className="text-sm font-medium" htmlFor="email">Email</label>
                <input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="h-11 rounded-md border px-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="you@example.com" required />
              </div>
              <div className="grid gap-2 text-left">
                <label className="text-sm font-medium" htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="h-11 rounded-md border px-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="••••••••" required />
              </div>
              <button type="submit" className="mt-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90">Sign in</button>
              <button type="button" onClick={startGoogle} className="rounded-md border px-5 py-3 text-sm font-semibold hover:bg-muted">Sign in with Google</button>
            </form>
          </div>

          <div className="rounded-2xl border p-6">
            <h2 className="heading-display text-xl font-semibold">Sign in with Phone</h2>
            <form className="mt-4 grid gap-3" onSubmit={otpSent ? onVerifyOtp : onSendOtp}>
              <div className="grid gap-2 text-left">
                <label className="text-sm font-medium" htmlFor="phone">Phone number</label>
                <input id="phone" type="tel" value={phone} onChange={(e)=>setPhone(e.target.value)} className="h-11 rounded-md border px-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="+91 98765 43210" required />
              </div>
              {otpSent && (
                <div className="grid gap-2 text-left">
                  <label className="text-sm font-medium" htmlFor="otp">OTP</label>
                  <input id="otp" value={otp} onChange={(e)=>setOtp(e.target.value)} className="h-11 rounded-md border px-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter 6-digit code" required />
                </div>
              )}
              <div className="flex items-center gap-2">
                <button type="submit" className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90">{otpSent ? "Verify & Sign in" : "Send OTP"}</button>
                {otpSent && (
                  <button type="button" onClick={onSendOtp} className="rounded-md border px-4 py-3 text-sm font-semibold hover:bg-muted">Resend</button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">Demo only: OTP is shown in a toast.</p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
