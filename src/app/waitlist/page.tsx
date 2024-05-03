import { Card } from '@/components/ui/card'
import React from 'react'

function Waitlist() {
  return (
    <Card className="p-2 flex gap-2 flex-col">
      <h1 className='text-xl font-bold'>You're on the waitlist! </h1>
      <div>You'll be notified when you've been accepted to test out Cooking with Clerk.</div>
    </Card>
  )
}

export default Waitlist