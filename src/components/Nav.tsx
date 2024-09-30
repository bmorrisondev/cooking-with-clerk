"use client"
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import clark from "@/assets/clark.png"
import { useUser } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'

function Nav() {
  const pathname = usePathname()
  const { user } = useUser()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isBetaUser, setIsBetaUser] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if(user) {
      const { publicMetadata } = user
      setIsAdmin(publicMetadata.isAdmin ? true : false)
      setIsBetaUser(publicMetadata.isBetaUser ? true : false)
    }
  }, [user])

  return (
    <div className='flex justify-between items-center p-2'>
      {/* Nav left */}
      <div>
        {pathname !== "/" && (
          <Link href="/" className="flex items-center gap-3 font-bold text-2xl">
            <Image src={clark} alt="Clark the cook" height={50} width={50} />
            Cooking with Clerk
          </Link>
        )}
      </div>
      <div className="flex gap-3">
        <SignedIn>
          { isAdmin && <Link href="/admin">Admin</Link>}
          { (isBetaUser || isAdmin) && <Link href="/app">App</Link>}
          { (isBetaUser || isAdmin) && <Link href="/app/me">Me</Link>}
          <UserButton userProfileProps={{
            additionalOAuthScopes: {
              google: [
                "email",
                "profile"
              ],
              github: [
                "asdf"
              ]
            }
          }} />
        </SignedIn>
        <SignedOut>
          <Button size="sm" className='rounded-full' onClick={() => router.push('/sign-in')}>
            Sign in
          </Button>
          <Button size="sm" className="rounded-full" onClick={() => router.push('/sign-up')}>
            Sign up
          </Button>
        </SignedOut>
      </div>
    </div>
  )
}

export default Nav