import { SignIn } from '@clerk/nextjs'
import React from 'react'

function SignInPage() {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <SignIn />
    </div>
  )
}

export default SignInPage