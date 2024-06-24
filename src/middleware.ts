import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/app(.*)',
  '/api(.*)',
]);

type UserMetadata = {
  isBetaUser?: boolean
}

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect()

    // 👉 Parse the session claims and check to see if `isBetaUser` is true
    const { sessionClaims } = auth()
    const { isBetaUser } = sessionClaims?.metadata as UserMetadata

    // 👉 If not, redirect the user to /waitlist
    if(!isBetaUser) {
      return NextResponse.redirect(new URL('/waitlist', req.url))
    }
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};