'use server'

import { ChatOpenAI } from "@langchain/openai";
import { BytesOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0.5,
  streaming: true,
});

const TEMPLATE = `
Generate three recipes for a dish. The output should be in JSON array and each object should contain a recipe name field named 'name', description field named 'description', array of ingredients named 'ingredients', and array of step by step instructions named 'instructions'.

User: {input}
AI:`;

// TODO: type this
export async function generateRecipes(input: string) {
  // prompt = `Generate three recipes for a ${prompt} dish. The output should be in JSON array and each object should contain a recipe name field named 'name', description field named 'description', array of ingredients named 'ingredients', and array of step by step instructions named 'instructions'.`
  // let res = await chatModel.invoke(prompt);

  // @ts-ignore
  // return JSON.parse(res.content);

  const prompt = PromptTemplate.fromTemplate<{ input: string; }>(TEMPLATE);

  const outputParser = new BytesOutputParser();
  const chain = prompt.pipe(model).pipe(outputParser);

  const stream = await chain.stream({
    input
  });
  return new StreamingTextResponse(stream);
}