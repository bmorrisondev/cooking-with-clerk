import { pgTable, serial } from 'drizzle-orm/pg-core';

export const recipes = pgTable('recipes', {
  id: serial('id').primaryKey(),
});