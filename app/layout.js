import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Recipe Heaven",
  description: "A simple website for sharing your culinary creations",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="bg-neutral-950 antialiased min-h-screen">
            <header className="flex justify-between py-2 px-8 md:px-16 md:py-5">
              <Link href="/">
                <div>
                  <h1 className="text-3xl font-serif text-yellow-600 italic">
                    Recipe Heaven
                  </h1>
                </div>
              </Link>
              <div>
                <SignedOut>
                  <SignInButton>
                    <button className="border-white border-solid border-2 bg-blue-700 hover:border-b-blue-400 w-fit px-4 py-1 rounded-3xl">SignIn</button>
                    </SignInButton>
                    </SignedOut>
                    <SignedIn>
                    <div className="flex align-middle flex-row items-center gap-2">
                    <UserButton />
                    <Link href={'/profile'}><button className="border-white border-solid border-2 bg-blue-700 hover:border-b-blue-400 w-fit px-4 py-1 rounded-3xl">View Profile</button></Link>
                    </div>
                </SignedIn>
              </div>
            </header>
            <main>{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
