import { ClerkMiddlewareAuth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/app(.*)',
  '/api(.*)',
  '/admin(.*)',
]);

type UserMetadata = {
  isBetaUser?: boolean
  isAdmin?: boolean
}

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect()

    const { sessionClaims } = auth()
    const { isAdmin, isBetaUser } = sessionClaims?.metadata as UserMetadata
        if(isAdmin) {
      // 👉 If the user is an admin, let them proceed to anything
      return
    }
    if(!isAdmin && req.nextUrl.pathname.startsWith('/admin')) {
      // 👉 If the user is not an admin and they try to access the admin panel, return an error
      return NextResponse.error()
    }
    if(!isBetaUser) {
      return NextResponse.redirect(new URL('/waitlist', req.url))
    }
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};