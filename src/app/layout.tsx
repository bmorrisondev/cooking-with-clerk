  import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Alegreya } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Nav from "@/components/Nav";
import PHProvider from "./PHProvider";
import PostHogPageView from "./PostHogPageView";
import { Toaster } from "@/components/ui/sonner";

const alegreya = Alegreya({ subsets: ["latin"] });
const inter = Inter({ subsets: ['latin']})

export const metadata: Metadata = {
  title: "Cooking with Clerk",
  description: "An open source, AI-powered recipe manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider signInFallbackRedirectUrl="/app" signUpFallbackRedirectUrl="/app">
      <html lang="en">
        <PHProvider>
          <body className={inter.className}>
            <PostHogPageView />
            <Nav />
            <div className="flex justify-center md:mx-0 m-2">
              <div className="flex flex-col w-full max-w-[960px] px-2">
                {children}
              </div>
            </div>
          </body>
          <Toaster />
        </PHProvider>
      </html>
    </ClerkProvider>
  );
}
