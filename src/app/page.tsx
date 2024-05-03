'use client'
import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { generateRecipes } from "./actions";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function Home() {
  return (
    <main>
      <Card className="p-2 flex gap-2 flex-col">
        <h1 className='text-xl font-bold'>Cooking with Clerk is an AI-powered recipe generator.</h1>
        <ul className='list-disc pl-4'>
          <li>Provide ingredients</li>
          <li>Let AI suggest what to cook</li>
          <li>Save & share your favorites!</li>
        </ul>
        <div className="italic">
          More coming soon!
        </div>
      </Card>
    </main>
  );
}
