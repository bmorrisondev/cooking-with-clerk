'use client'
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Recipe } from '@/models/recipes';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { saveRecipe } from './actions';
import { toast } from 'sonner';

type Props = {
  recipe: Recipe
  isLoggedIn: boolean
}

enum State {
  NONE,
  SAVING,
  IS_SAVED,
  ERROR
}

function RecipeCard({ recipe, isLoggedIn } : Props) {
  const [itemState, setItemState] = useState<State>(State.NONE)

  async function onSave() {
    if(!isLoggedIn) {
      // TODO: Figure out how to redirect back to the page in question -- this might have to do with my custom middleware
      window.location.href = `/sign-in?redirect=${window.location.pathname}`
    } else {
      setItemState(State.SAVING)
      try {
        const res = await saveRecipe(recipe)
        if(res && res.error) {
          toast(res.error)
          setItemState(State.ERROR)
        } else {
          setItemState(State.IS_SAVED)
        }
      } catch (err) {
        console.error(err)
        setItemState(State.ERROR)
      }
    }
  }

  return (
    <Card className="flex flex-col flex-1">
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
        <Button onClick={onSave} disabled={itemState !== State.NONE}>
          {itemState === State.NONE && "Save"}
          {itemState === State.SAVING && "Saving..."}
          {itemState === State.IS_SAVED && <>Saved! <Check /></>}
          {itemState === State.ERROR && "Error..."}
        </Button>
      </CardContent>
    </Card>
  )
}

export default RecipeCard