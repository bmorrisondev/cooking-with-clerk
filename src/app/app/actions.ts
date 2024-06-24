"use server";
import * as db from "@/db/db";
import { recipes } from "@/db/schema";
import { Recipe, recipesRequestSchema } from "@/models/recipes";
import { openai } from "@ai-sdk/openai";
import { auth, getAuth } from "@clerk/nextjs/server";
import { generateObject } from "ai";

export async function generateRecipes(input: string) {
  "use server";
  const result = await generateObject({
    model: openai("gpt-3.5-turbo"),
    schema: recipesRequestSchema,
    prompt: `Generate three recipes with the following ingredients or themes: ${input}`,
  });
  return { recipes: result.object };
}

export async function saveRecipe(recipe: Recipe) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not found");
  }
  await db.saveRecipe(recipe, userId);
}