import { SignUp } from '@clerk/nextjs'
import React from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

function SignUpPage() {
  return (
    <div className='flex flex-col items-center gap-4'>
      {/* <Alert className='max-w-[500px]'>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription className='flex flex-col gap-2'>
          <p>While Cooking with Clerk is being developed, users will be placed on a waitlist and be notified when they are allowed to test out the app!</p>
          <p>This is to temporarily limit the use of OpenAIs APIs and prevent overages.</p>
        </AlertDescription>
      </Alert> */}
      <SignUp />
    </div>
  )
}

export default SignUpPage