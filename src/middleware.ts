import { ClerkMiddlewareAuth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Permit } from "permitio";

const isProtectedRoute = createRouteMatcher([
  '/app(.*)',
  '/admin(.*)',
  '/api(.*)'
]);

type UserMetadata = {
  isBetaUser?: boolean
  isAdmin?: boolean
}

const permit = new Permit({
  // you'll have to set the PDP url to the PDP you've deployed in the previous step
  // pdp: 'http://localhost:7766',
  token: 'permit_key_2XezdY2BfKZj6vl87ZGXoomuXN6quDkCyouhwq3ZYgohLwQiTKqehbAxTvHJwx1SRcSatKZYK8TNf0X92oFw1f',
})

export default clerkMiddleware((auth, req) => {
  const { userId, sessionClaims } = auth()



  if (isProtectedRoute(req)) {
    auth().protect()

    const { isAdmin, isBetaUser } = sessionClaims?.metadata as UserMetadata
    if(isAdmin) {
      return
    }
    if(!isAdmin && req.nextUrl.pathname.startsWith('/admin')) {
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