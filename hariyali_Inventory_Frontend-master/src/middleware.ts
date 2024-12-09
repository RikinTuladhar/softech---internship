import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("access_token")?.value as string;
  const isPublicPath = path === "/login";
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

export const config = {
  // matcher: ["/", "/login"],
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
