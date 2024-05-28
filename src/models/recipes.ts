import { DeepPartial } from "ai";
import { z } from "zod";

export const ingredientSchema = z.object({
  name: z.string(),
  amount: z.string(),
});

export type Ingredient = z.infer<typeof ingredientSchema>;

export const recipeSchema = z.object({
  name: z.string(),
  description: z.string(),
  ingredients: z.array(ingredientSchema),
  instructions: z.array(z.string()),
});
export const recipesSchema = z.object({
  recipes: z.array(recipeSchema).length(3),
});

export type Recipe = z.infer<typeof recipeSchema>;
export type PartialRecipes = DeepPartial<z.infer<typeof recipesSchema>>;
