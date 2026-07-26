import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_COOKIE, hasValidAccessToken } from "@/lib/passwordAuth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAccess = await hasValidAccessToken(request.cookies.get(ACCESS_COOKIE)?.value);

  if (pathname === "/unlock") {
    return hasAccess
      ? NextResponse.redirect(new URL("/", request.url))
      : NextResponse.next();
  }

  if (hasAccess) return NextResponse.next();

  return NextResponse.redirect(new URL("/unlock", request.url));
}

export const config = {
  matcher: ["/((?!api/unlock|_next/static|_next/image|favicon.ico|manifest.webmanifest).*)"],
};
