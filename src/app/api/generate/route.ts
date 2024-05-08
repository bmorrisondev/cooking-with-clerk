import { NextRequest, NextResponse } from "next/server";
import { StreamData, StreamingTextResponse } from "ai";
import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { recipeSchema } from "@/models/recipes";
import { z } from 'zod';

export const dynamic = 'force-dynamic';

export const runtime = "edge"

const schema = z.array(recipeSchema)

export async function POST(req: NextRequest, res: NextResponse) {
  const model = openai('gpt-3.5-turbo');

  const { messages } = await req.json();
  console.log("messages", messages)

  const response = await streamObject({
    model,
    schema,
    prompt: `Three recipes with the following ingredients or themes: ${messages[messages.length - 1].content}`,
    mode: 'json'
  });


  const data = new StreamData();
  let fullObj: any = {}
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for await (const obj of response.partialObjectStream) {
        fullObj = obj
      }
      controller.enqueue(encoder.encode(JSON.stringify(fullObj)))
      controller.close();
      data.close();
    }
  })
  return new StreamingTextResponse(stream, {}, data);
}