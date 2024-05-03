'use server'

import { ChatOpenAI } from "@langchain/openai";

export const runtime = 'edge'

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// TODO: type this
export async function generateRecipes(prompt: string): Promise<any[]> {
  prompt = `Generate three recipes for a ${prompt} dish. The output should be in JSON array and each object should contain a recipe name field named 'name', description field named 'description', array of ingredients named 'ingredients', and array of step by step instructions named 'instructions'.`
  let res = await chatModel.invoke(prompt);
  // @ts-ignore
  return JSON.parse(res.content);
}