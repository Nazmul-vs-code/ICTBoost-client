import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Safely get session — if auth fails, treat as no session
  let session = null;
  try {
    session = await auth.api.getSession({
      headers: request.headers,
    });
  } catch {
    // Auth call failed (e.g. DB unavailable) — continue without session
  }

  // Redirect logged-in users away from auth pages
  if (
    session &&
    (pathname === "/auth/login" || pathname === "/auth/register")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protected routes — require login
  const protectedRoutes = ["/dashboard", "/profile"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Teacher dashboard — only teacher role
  if (
    pathname.startsWith("/dashboard/teacher") &&
    session?.user?.role !== "teacher"
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Admin dashboard — only admin role
  if (
    pathname.startsWith("/dashboard/admin") &&
    session?.user?.role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Student dashboard — only student role
  if (
    pathname.startsWith("/dashboard/student") &&
    session?.user?.role !== "student"
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/login",
    "/auth/register",
    "/dashboard/:path*",
    "/profile/:path*",
  ],
};
