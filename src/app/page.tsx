import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import clark from "@/assets/clark.png"


export default function Home() {
  return (
    <main className="flex flex-col gap-2 items-center max-w-[960px] mt-20">
      <Image src={clark} width="200" alt="Chef Clark"/>
      <div>
        <h1 className="text-2xl font-bold">Cooking with Clerk</h1>
      </div>
      <div className="mb-10">
        <h2 className="title bg-gradient !bg-clip-text text-transparent !bg-cover !bg-center transition-all leading-none uppercase text-center font-black text-4xl">Generate and manage recipes, powered by AI!</h2>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>
              Use what you have
            </CardTitle>
            <CardDescription>
              Provide a list of ingredients you have and a theme you'd like to use for dinner.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              Let AI suggest what to cook
            </CardTitle>
            <CardDescription>
              Using OpenAI, we'll suggest three recipes for you to cook based on your ingredients and theme.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              Save & share your favs! *
            </CardTitle>
            <CardDescription>
              Save your favorite recipes and build a collection of recipes, or share them with others!
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      <SignedOut>
        <Button asChild>
          <Link href="/sign-up">
            Join the waitlist!
          </Link>
        </Button>
      </SignedOut>
      <SignedIn>
        <Button asChild>
            <Link href="/app">
              Let's get cooking!
            </Link>
        </Button>
      </SignedIn>
      <div className="italic">
        * Coming soon
      </div>
      {/* <Card className="p-2 flex gap-2 flex-col">
        <h1 className='text-xl font-bold'>Cooking with Clerk is an AI-powered recipe generator.</h1>
        <ul className='list-disc pl-4'>
          <li>Provide ingredients</li>
          <li>Let AI suggest what to cook</li>
          <li>Save & share your favorites!</li>
        </ul>
        <div className="italic">
          More coming soon!
        </div>
      </Card> */}
    </main>
  );
}
