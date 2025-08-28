import type { RequestHandler } from "express";

function getBaseUrl(req: any) {
  const proto = (req.headers["x-forwarded-proto"] as string) || req.protocol || "http";
  const host = (req.headers["x-forwarded-host"] as string) || req.get("host");
  return `${proto}://${host}`;
}

export const handleGoogleStart: RequestHandler = (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    res.status(500).send(
      "Google OAuth not configured. Set GOOGLE_CLIENT_ID via environment and try again."
    );
    return;
  }
  const base = getBaseUrl(req);
  const redirectUri = `${base}/api/auth/google/callback`;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
  });
  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  res.redirect(url);
};

export const handleGoogleCallback: RequestHandler = (req, res) => {
  const { code, error } = req.query as { code?: string; error?: string };
  if (error) {
    res.status(400).send(`Google sign-in failed: ${error}`);
    return;
  }
  if (!code) {
    res.status(400).send("Missing authorization code");
    return;
  }
  // Normally exchange code for tokens here using GOOGLE_CLIENT_SECRET.
  // For this demo, just confirm receipt and instruct next steps.
  res.send(
    `<html><body style="font-family: sans-serif; padding: 24px;">
      <h1>Signed in with Google (code received)</h1>
      <p>Auth code received. To complete login, set GOOGLE_CLIENT_SECRET and implement token exchange, or connect Supabase for full auth.</p>
      <a href="/profile" style="display:inline-block;margin-top:12px;padding:10px 14px;background:#ef4444;color:#fff;border-radius:8px;text-decoration:none;">Return to Profile</a>
    </body></html>`
  );
};
