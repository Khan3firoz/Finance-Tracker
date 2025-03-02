import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req) {
    const token = cookies().get("token")?.value; // Do NOT await

    console.log({ token }, "=====>");

    const isAuthPage = req.nextUrl.pathname.startsWith("/login");
    const isProtectedRoute = !["/login", "/register"].includes(req.nextUrl.pathname);

    // If user is NOT logged in and tries to access a protected route, redirect to login
    // if (!token && (isProtectedRoute || req.nextUrl.pathname === "/")) {
    //     console.log("Redirecting to login");
    //     return NextResponse.redirect(new URL("/login", req.url));
    // }

    // If user IS logged in and tries to access /login, redirect to /dashboard
    // if (token!==undefined && isAuthPage) {
    //     console.log("Redirecting to dashboard");
    //     return NextResponse.redirect(new URL("/dashboard", req.url));
    // }

    return NextResponse.next();
}

// Apply middleware to all routes except static files
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
