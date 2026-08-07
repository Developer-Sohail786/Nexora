import { NextResponse } from "next/server";
import { auth } from "./auth";

const authRoutes = [
  "/login",
  "/register",
];

const protectedRoutes = [
  "/dashboard",
  "/chat",
  "/files",
  "/analytics",
  "/pricing",
  "/settings",
];

export default auth(function proxy(req) {
  const isLoggedIn = !!req.auth;

  const pathname =
    req.nextUrl.pathname;

  const isAuthRoute =
    authRoutes.includes(pathname);

  const isProtectedRoute =
    protectedRoutes.some((route) =>
      pathname.startsWith(route),
    );

  // Reverse protection
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(
      new URL("/dashboard", req.url),
    );
  }

  // Dashboard protection
  if (
    isProtectedRoute &&
    !isLoggedIn
  ) {
    return NextResponse.redirect(
      new URL("/login", req.url),
    );
  }

  const response = NextResponse.next();

  response.headers.set(
    "X-Frame-Options",
    "DENY",
  );

  response.headers.set(
    "X-Content-Type-Options",
    "nosniff",
  );

  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin",
  );

  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );

  return response;
});

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/chat/:path*",
    "/files/:path*",
    "/analytics/:path*",
    "/pricing/:path*",
    "/settings/:path*",
  ],
};