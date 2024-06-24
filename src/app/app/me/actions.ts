'use server'

import * as db from '@/db/db'
import { auth } from "@clerk/nextjs/server";

export async function deleteRecipe(recipeId: number) {
  const { userId } = await auth()
  if(!userId) {
    throw new Error('User not found')
  }
  await db.deleteRecipeRecord(recipeId, userId)
}

// Returns the new favorite status of the recipe
export async function toggleFavorite(recipeId: number) {
  const { userId } = await auth()
  if(!userId) {
    throw new Error('User not found');
  }
  return await db.toggleRecipeFavoriteStatus(recipeId, userId)
}

export async function setVisibility(recipeId: number, isPublic: boolean) {
  const { userId } = await auth()
  if(!userId) {
    throw new Error('User not found');
  }
  await db.setRecipeVisibility(recipeId, isPublic, userId)
}