"use server";
import { PartialRecipes, recipesSchema } from "@/models/recipes";
import { openai } from "@ai-sdk/openai";
import { generateObject, streamObject } from "ai";
import { streamUI } from "ai/rsc";
import { Recipes } from "./_components/recipes";
import LoadingSpinner from "@/components/LoadingSpinner";
import { z } from "zod";

export async function generateRecipes(input: string) {
  "use server";

  const result = await streamUI({
    model: openai("gpt-3.5-turbo"),
    tools: {
      generateRecipes: {
        description:
          "Generate recipes based on the ingredients or theme the user gives you.",
        parameters: z.object({ ingredients: z.array(z.string()) }),
        generate: async function* ({ ingredients }) {
          yield <LoadingSpinner />;
          let rec: PartialRecipes = {};

          const recipesGeneration = await streamObject({
            schema: recipesSchema,
            prompt: `Generate recipes with the following ingredients or themes: ${ingredients.join(", ")}`,
            model: openai("gpt-3.5-turbo"),
          });
          for await (const partialRecipes of recipesGeneration.partialObjectStream) {
            rec = partialRecipes;
            yield <Recipes recipes={partialRecipes} />;
          }

          return <Recipes recipes={rec} />;
        },
      },
    },
    prompt: `Generate recipes with the following ingredients or themes: ${input}`,
  });
  return { recipes: result.value };
}
