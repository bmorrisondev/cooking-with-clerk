import RecipeCard from '@/app/app/RecipeCard'
import { getDb } from '@/db/db'
import { recipes } from '@/db/schema'
import { Recipe } from '@/models/recipes'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import React from 'react'
import * as db from '@/db/db'

type Props = {
  params: { id: string }
}

async function PublicRecipePage({ params }: Props) {
  const { userId } = auth()
  const recipe = await db.getPublicRecipe(Number(params.id))

  if(!recipe) {
    return (
      <div className='flex items-center justify-center text-xl italic text-gray-600 w-full'>
        This recipe either does not exist or is private.
      </div>
    )
  }

  return (
    <div>
      <RecipeCard recipe={recipe} isLoggedIn={userId ? true : false} />
    </div>
  )
}

export default PublicRecipePage