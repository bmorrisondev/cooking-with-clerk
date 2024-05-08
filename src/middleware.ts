import { ClerkMiddlewareAuth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/app(.*)',
  '/admin(.*)'
]);

type UserMetadata = {
  betauser: string
}

function isBetaUser(auth: ClerkMiddlewareAuth): boolean {
  const { sessionClaims } = auth()
  if(sessionClaims?.metadata) {
    const { betauser } = sessionClaims.metadata as UserMetadata
    if(betauser === 'true') {
      return true
    }
  }
  return false
}

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect()
    if(!isBetaUser(auth)) {
      return NextResponse.redirect(new URL('/waitlist', req.url))
    }
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};