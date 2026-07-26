const encoder = new TextEncoder();

export const ACCESS_COOKIE = "wishflow_access";
const SESSION_MARKER = "wishflow-story-access";

function passwordSecret() {
  // Keep APP_PASSWORD in Vercel for a deploy-specific secret. The fallback is
  // the password selected for this private birthday site.
  return process.env.APP_PASSWORD ?? "Hope@123";
}

async function signature() {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(passwordSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const bytes = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, encoder.encode(SESSION_MARKER))
  );
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function createAccessToken() {
  return signature();
}

export async function hasValidAccessToken(token?: string) {
  if (!token) return false;
  return token === (await signature());
}

export function isCorrectPassword(password: unknown) {
  return typeof password === "string" && password === passwordSecret();
}
