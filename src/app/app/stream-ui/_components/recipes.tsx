import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PartialRecipes } from "@/models/recipes";

export const Recipes = ({ recipes }: { recipes: PartialRecipes }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {recipes?.recipes?.map((recipe, i) => (
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
  );
};
