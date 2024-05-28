"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Recipe } from "@/models/recipes";
import { generateRecipes } from "./actions";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState<string>("");

  return (
    <main>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(true);
          const { recipes: result } = await generateRecipes(input);
          setIsLoading(false);
          setRecipes(result.recipes);
        }}
        className="flex items-center gap-2 mb-4"
      >
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
          {recipes?.length > 0 &&
            recipes.map((recipe, i) => (
              <Card key={i} className="flex flex-col flex-1">
                <CardHeader>
                  <CardTitle>{recipe?.name}</CardTitle>
                  <CardDescription>{recipe?.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-1">
                  <div className="flex flex-col flex-1 mb-2">
                    <div>Ingredients:</div>
                    <div className="border shadow-sm rounded mb-2">
                      <ul className="text-sm list-disc ml-4 p-2">
                        {recipe?.ingredients?.map((ingredient, i: number) => (
                          <li key={i}>
                            {ingredient?.name} ({ingredient?.amount})
                          </li>
                        ))}
                      </ul>
                    </div>
                    <ol className="list-decimal ml-4">
                      {recipe?.instructions?.map((step, i: number) => (
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
