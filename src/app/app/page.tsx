'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useChat } from "ai/react";
import { Ingredient, Recipe } from "@/models/recipes";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  const { input, isLoading, handleInputChange, handleSubmit } = useChat({
    api: "/api/generate",
    onResponse: async (res) => {
      let json = await res.json()
      if(json.recipes) {
        setRecipes(json.recipes)
      } else {
        setRecipes(json)
      }
    }
  });

  return (
    <main>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
        <Input type="text" placeholder="Specify some themes or ingredients"
          value={input} onChange={handleInputChange}/>
        <Button type="submit">Generate ideas!</Button>
      </form>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className="grid md:grid-cols-3 gap-4">
          {recipes.length > 0 && recipes.map((recipe: Recipe, i) => (
            <Card className="flex flex-col flex-1">
              <CardHeader>
                <CardTitle>{recipe.name}</CardTitle>
                <CardDescription>{recipe.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <div className="flex flex-col flex-1 mb-2">
                  <div>Ingredients:</div>
                  <div className="border shadow-sm rounded mb-2">
                    <ul className="text-sm list-disc ml-4 p-2">
                      {recipe.ingredients.map((ingredient: Ingredient, i: number) => (
                        <li key={i}>{ingredient.name} ({ingredient.amount})</li>
                      ))}
                    </ul>
                  </div>
                  <ol className="list-decimal ml-4">
                    {recipe.instructions.map((step: string, i: number) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
                {/* <Button onClick={() => alert("You clicked the button!")}>Save</Button> */}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
