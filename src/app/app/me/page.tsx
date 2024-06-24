import { getDb, getRecipesByOwnerId } from '@/db/db';
import { favorites, recipes } from '@/db/schema';
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import React from 'react'
import { eq } from 'drizzle-orm';
import SmallRecipeCard from './SmallRecipeCard';
import { Recipe } from '@/models/recipes';

async function Me() {
  const user = await currentUser();
  if(!user) {
    throw new Error('User not found')
  }
  const r = await getRecipesByOwnerId(user.id)

  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <Image
          src={user?.imageUrl as string}
          alt="Profile image"
          height={50} width={50}
          className='rounded-full' />
        <h1>{ user?.fullName }</h1>
      </div>
      <div>
        <h2>Saved recipes</h2>
        <div className='grid grid-cols-3 gap-2'>
          {r.map((recipe, i) => (
            <SmallRecipeCard recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Me