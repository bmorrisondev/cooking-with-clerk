'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormEvent, useState } from "react";
import { generateRecipes } from "../actions";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useChat } from "ai/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [prompt, setPrompt] = useState<string>("");
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  const [recipes, setRecipes] = useState<any[]>([])

  const { messages, input, isLoading, error, handleInputChange, handleSubmit, setInput, data } = useChat({
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

  async function generateIdeas(e: FormEvent<HTMLFormElement>) {
    // const userMessage = {
    //   role: "user",
    //   content: input,
    // };

    handleSubmit(e);
  }

  // async function generateIdeas() {
  //   setIsLoading(true)
  //   // let r = await generateRecipes(prompt);

  //   let res = await fetch("/api/generate", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ input: prompt }),
  //   })

  //   console.log(r)
  //   // setRecipes(r)
  //   setIsLoading(false)
  // }

  return (
    <main>
      <div className="flex items-center gap-2 mb-4">
        <form onSubmit={handleSubmit}>
          <Input type="text" placeholder="Specify some themes or ingredients"
            value={input} onChange={handleInputChange}/>
          <Button type="submit">Generate ideas!</Button>
        </form>
      </div>
      {isLoading && <LoadingSpinner />}
      <div className="grid md:grid-cols-3 gap-4">
        {recipes.length > 0 && recipes.map((recipe, i) => (
          <Card className="flex flex-col flex-1">
            <CardHeader>
              <CardTitle>{recipe.name}</CardTitle>
              <CardDescription>{recipe.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <div className="flex flex-col flex-1 mb-2">
                <div>Ingredients:</div>
                <div className="bg-slate-100 border border-slate-200 shadow-sm rounded mb-2">
                  <ul className="text-sm list-disc ml-4 p-2">
                    {recipe.ingredients.map((ingredient: any, i: number) => (
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
              <Button onClick={() => alert("You clicked the button!")}>Save</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
