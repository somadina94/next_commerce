import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.url)); // Redirect if not authenticated
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.NEXTAUTH_SECRET)
    );

    // Get user role from the token
    const userRole = payload.role as string;

    // Protect admin routes
    if (request.nextUrl.pathname.startsWith("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/403", request.url)); // Redirect non-admins
    }

    // Protect user routes (optional logic for regular users)
    if (
      request.nextUrl.pathname.startsWith("/user") &&
      !["user", "admin"].includes(userRole || "")
    ) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next(); // Allow access
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"], // Protect admin and user routes
};
