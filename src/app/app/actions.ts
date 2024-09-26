"use server";
import * as db from "@/db/db";
import { recipes } from "@/db/schema";
import { Recipe, recipesRequestSchema } from "@/models/recipes";
import { permit } from "@/security/permit";
import { openai } from "@ai-sdk/openai";
import { auth, clerkClient, getAuth } from "@clerk/nextjs/server";
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

  const user = await clerkClient.users.getUser(userId);
  await permit.api.syncUser({
    key: userId,
    email: user.emailAddresses[0].emailAddress,
    first_name: user.firstName ? user.firstName : "",
    last_name: user.lastName ? user.lastName : "",
  })

  const permitted = await permit.check(userId, "create", "Recipes");
  if(permitted) {
    await db.saveRecipe(recipe, userId);
  } else {
    return { error: "You do not have permission to save recipes" };
  }
}