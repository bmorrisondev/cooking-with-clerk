import { InferSelectModel } from "drizzle-orm";
import { recipes } from "./schema";

export type RecipeRecord = InferSelectModel<typeof recipes>;