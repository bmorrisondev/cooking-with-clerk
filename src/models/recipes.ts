import { RecipeRecord } from "@/db/models";
import { DeepPartial } from "ai";
import { z } from "zod";

export const ingredientSchema = z.object({
  name: z.string(),
  amount: z.string(),
});

export type Ingredient = z.infer<typeof ingredientSchema>;

export const recipeRequestSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string(),
  ingredients: z.array(ingredientSchema),
  instructions: z.array(z.string()),
});
export const recipesRequestSchema = z.object({
  recipes: z.array(recipeRequestSchema),
});
export type RecipeRequest = z.infer<typeof recipeRequestSchema>;
export type PartialRecipes = DeepPartial<z.infer<typeof recipesRequestSchema>>;

export class Recipe {
  id?: number;
  name?: string;
  description?: string;
  ingredients?: Ingredient[];
  instructions?: string[];
  is_favorite?: boolean
  is_public?: boolean

  static FromAiRequest(request: RecipeRequest): Recipe {
    return {
      name: request.name,
      description: request.description,
      ingredients: request.ingredients,
      instructions: request.instructions,
    };
  }

  static FromDbRecord(record: RecipeRecord): Recipe {
    return {
      id: record.id,
      name: record.name,
      description: record.description,
      ingredients: record.ingredients as Ingredient[],
      instructions: record.instructions as string[],
      is_public: record.is_public ? true : false,
    };
  }
}