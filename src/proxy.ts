import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let session = null;
  try {
    session = await auth.api.getSession({
      headers: request.headers,
    });
  } catch {
    // continue without session
  }

  if (session && (pathname === "/auth/login" || pathname === "/auth/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const protectedRoutes = ["/dashboard", "/profile"];
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (pathname.startsWith("/dashboard/teacher") && session?.user?.role !== "teacher") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/dashboard/admin") && session?.user?.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/dashboard/student") && session?.user?.role !== "student") {
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
