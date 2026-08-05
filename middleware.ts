import { NextResponse } from "next/server";
import { auth } from "./auth";

const authRoutes = ["/login", "/register"];

const protectedRoutes = ["/dashboard", "/chat", "/documents", "/settings"];

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  const pathname = req.nextUrl.pathname;

  const isAuthRoute = authRoutes.includes(pathname);

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Reverse protection
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // (Dashboard) protection
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/chat/:path*",
    "/documents/:path*",
    "/settings/:path*",
  ],
};
