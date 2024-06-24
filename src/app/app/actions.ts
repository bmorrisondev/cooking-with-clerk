"use server";
import { recipesSchema } from "@/models/recipes";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";

export async function generateRecipes(input: string) {
  "use server";
  const result = await generateObject({
    model: openai("gpt-3.5-turbo"),
    schema: recipesSchema,
    prompt: `Generate recipes with the following ingredients or themes: ${input}`,
  });
  return { recipes: result.object };
}
