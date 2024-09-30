'use server'
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";
import { Recipe } from "@/models/recipes";
import { favorites, recipes } from "./schema";
import { and, eq } from "drizzle-orm";

let _db: NodePgDatabase<typeof schema>;

export async function getDb(): Promise<NodePgDatabase<typeof schema>>{
  if(!_db) {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    _db = drizzle(pool);
  }
  return _db;
}

export async function saveRecipe(recipe: Recipe, ownerId: string) {
  const db = await getDb()
  await db.insert(recipes).values({
    // @ts-ignore TODO: why...
    owner_id: ownerId,
    name: recipe.name,
    description: recipe.description,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
  }).execute();
}

export async function getRecipesByOwnerId(ownerId: string): Promise<Recipe[]> {
  const db = await getDb()
  const r = await db.select().from(recipes)
    .where(eq(recipes.owner_id, ownerId)).execute();
  const favs = await db.select().from(favorites).where(
    eq(favorites.user_id, ownerId)
  ).execute()

  const rval: Recipe[] = [];
  for(const record of r) {
    let recipe = Recipe.FromDbRecord(record);
    recipe.is_favorite = favs.find(f => f.recipe_id === recipe.id) ? true : false;
    rval.push(recipe);
  }
  return rval
}

export async function toggleRecipeFavoriteStatus(recipeId: number, ownerId: string): Promise<boolean> {
  const db = await getDb()
  const fav = await db.select().from(favorites).where(and(
    eq(favorites.recipe_id, recipeId),
    eq(favorites.user_id, ownerId)
  ))
  if(fav && fav.length > 0) {
    await db.delete(favorites).where(and(
      eq(favorites.recipe_id, recipeId),
      eq(favorites.user_id, ownerId)
    )).execute()
    return false
  } else {
    await db.insert(favorites).values({
      user_id: ownerId,
      recipe_id: recipeId
    }).execute()
    return true
  }
}

export async function setRecipeVisibility(recipeId: number, isPublic: boolean, ownerId: string) {
  const db = await getDb()
  await db.update(recipes).set({
    is_public: isPublic
  }).where(and(
    eq(recipes.id, recipeId),
    eq(recipes.owner_id, ownerId)
  )).execute()
}

export async function deleteRecipeRecord(recipeId: number, ownerId: string) {
  const db = await getDb()
  await db.delete(recipes).where(and(
    eq(recipes.id, recipeId),
    eq(recipes.owner_id, ownerId)
  )).execute()
}

export async function getPublicRecipe(recipeId: number): Promise<Recipe | null> {
  const db = await getDb()
  const r = await db.select().from(recipes).where(and(
    eq(recipes.id, recipeId),
    eq(recipes.is_public, true)
  )).execute()
  console.log(r)
  return r.length > 0 ? Recipe.FromDbRecord(r[0]) : null
}