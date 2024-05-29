"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { generateRecipes } from "./actions";

export default function Home() {
  const [recipes, setRecipes] = useState<React.ReactNode>();
  const [input, setInput] = useState<string>("");

  return (
    <main>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const { recipes: stream } = await generateRecipes(input);
          setRecipes(stream);
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
      {recipes}
    </main>
  );
}
