import { NextResponse } from "next/server";
import { ACCESS_COOKIE, createAccessToken, isCorrectPassword } from "@/lib/passwordAuth";

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: null }));

  if (!isCorrectPassword(password)) {
    return NextResponse.json({ error: "That password isn't quite right." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ACCESS_COOKIE,
    value: await createAccessToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
