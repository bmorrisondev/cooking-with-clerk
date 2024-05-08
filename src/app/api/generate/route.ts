import { ChatOpenAI } from "@langchain/openai";
import { BytesOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { OpenAIStream, streamText, StreamData, StreamingTextResponse } from "ai";
import { generateObject, streamObject } from 'ai';
import { z } from 'zod';
import { openai } from '@ai-sdk/openai';
import { Stream } from "stream";

export const dynamic = 'force-dynamic';

export const config = {
  runtime: "edge"
}

const recipeSchema = z.array(z.object({
  name: z.string(),
  description: z.string(),
  ingredients: z.array(
    z.object({
      name: z.string(),
      amount: z.string(),
    }),
  ),
  instructions: z.array(z.string()),
}));

export async function POST(req: NextRequest, res: NextResponse) {
  // @ts-ignore
  // const { messages } = req.body
  // console.log(JSON.stringify(req, null, 2))
  // const model = new ChatOpenAI({
  //   apiKey: process.env.OPENAI_API_KEY,
  //   temperature: 0.5,
  //   streaming: true,
  // });

  const model = openai('gpt-3.5-turbo', {
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { messages } = await req.json();
  console.log("messages", messages)

  const response = await streamObject({
    model,
    schema: recipeSchema,
    prompt: `Three recipes with the following ingredients or themes: ${messages[messages.length - 1].content}`,
    mode: 'json'
  });
  // const result = await streamText({
  //   model: openai('gpt-4-turbo'),
  //   messages
  // });


  const data = new StreamData();
  let fullObj: any = {}
  const stream = new ReadableStream({
    async start(controller) {
      for await (const obj of response.partialObjectStream) {
        fullObj = obj
        // controller.enqueue(JSON.stringify(obj))
        // data.append({ test: 'value' });
      }
      controller.enqueue(JSON.stringify(fullObj))
      controller.close();
      data.close();
    }
  })

  // for await (const obj of response.partialObjectStream) {
  //   data.append(obj);
  // }

  // const stream = result.toAIStream({
  //   onFinal() {
  //     data.close();
  //   }
  // });

  return new StreamingTextResponse(stream, {}, data);



  // const reader = result.partialObjectStream.getReader();

  // Append additional data
  // data.append({ test: 'value' });

  // Convert the response into a friendly text-stream
  // const stream = result.fullStream({
  //   onFinal(_) {
  //     data.close();
  //   },
  // });
  // return new StreamingTextResponse(result.partialObjectStream.getReader(), {}, data);
  // return new StreamingTextResponse(stream, {}, data);
  // const TEMPLATE = `
  // Generate three recipes for a dish. The output should be in JSON array and each object should contain a recipe name field named 'name', description field named 'description', array of ingredients named 'ingredients', and array of step by step instructions named 'instructions'.

  // User: {input}
  // AI:`;
  // prompt = `Generate three recipes for a ${prompt} dish. The output should be in JSON array and each object should contain a recipe name field named 'name', description field named 'description', array of ingredients named 'ingredients', and array of step by step instructions named 'instructions'.`
  // let res = await chatModel.invoke(prompt);

  // @ts-ignore
  // return JSON.parse(res.content);
}