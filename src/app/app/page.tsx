"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Recipe } from "@/models/recipes";
import { generateRecipes } from "./actions";
import RecipeCard from "./RecipeCard";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const { recipes: result } = await generateRecipes(input);
    setIsLoading(false);
    setRecipes(result.recipes);
  }

  return (
    <main>
      <form onSubmit={onSubmit} className="flex items-center gap-2 mb-4" >
        <Input
          type="text"
          placeholder="Specify some themes or ingredients"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit">Generate ideas!</Button>
      </form>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className="grid md:grid-cols-3 gap-4">
          {recipes?.length > 0 && recipes.map((recipe, i) =>
            <RecipeCard key={i} recipe={recipe} isLoggedIn />)
          }
        </div>
      )}
    </main>
  );
}
