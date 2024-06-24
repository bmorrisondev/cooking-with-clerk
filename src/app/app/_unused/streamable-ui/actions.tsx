"use server";
import { recipesSchema } from "@/models/recipes";
import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { createStreamableUI } from "ai/rsc";
import { Recipes } from "./_components/recipes";
import LoadingSpinner from "@/components/LoadingSpinner";

export async function generateRecipes(input: string) {
  "use server";
  const recipesStream = createStreamableUI(<LoadingSpinner />);

  (async () => {
    const result = await streamObject({
      model: openai("gpt-3.5-turbo"),
      schema: recipesSchema,
      prompt: `Generate three recipes with the following ingredients or themes: ${input}`,
    });
    for await (const partialRecipes of result.partialObjectStream) {
      recipesStream.update(<Recipes recipes={partialRecipes} />);
    }
    recipesStream.done();
  })();
  return { recipes: recipesStream.value };
}
