"use client"
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import Link from 'next/link'
import React from 'react'

function Nav() {
  return (
    <div className='flex justify-between items-center p-2'>
      {/* Nav left */}
      <div>
        <Link href="/">CwC</Link>
      </div>
      <div className="flex gap-3">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">Sign in</Link>
          <Link href="/sign-up">Sign up</Link>
        </SignedOut>
      </div>
    </div>
  )
}

export default Nav