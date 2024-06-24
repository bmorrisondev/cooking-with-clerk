import { relations } from 'drizzle-orm';
import { boolean, integer, json, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const recipes = pgTable('recipes', {
  id: serial('id').primaryKey(),
  owner_id: text('owner_id').notNull(), // user or family id
  name: text('name').notNull(),
  description: text('description').notNull(),
  ingredients: json('incredients').notNull(),
  instructions: json('instructions').notNull(),
  is_public: boolean('is_public').notNull().default(false),
});

export const recipesRelations = relations(recipes, ({ one }) => ({
  user: one(users, {
    fields: [recipes.owner_id],
    references: [users.id],
  }),
}));

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  img_url: text('img_url').notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  recipes: many(recipes),
  favorites: many(favorites),
}));

export const favorites = pgTable('favorites', {
  id: serial('id').primaryKey(),
  user_id: text('user_id').notNull(),
  recipe_id: integer('recipe_id').notNull(),
});

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.user_id],
    references: [users.id],
  }),
  recipe: one(recipes, {
    fields: [favorites.recipe_id],
    references: [recipes.id],
  }),
}));