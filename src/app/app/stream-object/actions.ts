"use server";
import { PartialRecipes, recipesSchema } from "@/models/recipes";
import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { createStreamableValue } from "ai/rsc";

export async function generateRecipes(input: string) {
  "use server";
  const recipesStream = createStreamableValue<PartialRecipes>();

  (async () => {
    const result = await streamObject({
      model: openai("gpt-3.5-turbo"),
      schema: recipesSchema,
      prompt: `Generate recipes with the following ingredients or themes: ${input}`,
    });
    for await (const partialRecipe of result.partialObjectStream) {
      recipesStream.update(partialRecipe);
    }
    recipesStream.done();
  })();
  return { recipes: recipesStream.value };
}
