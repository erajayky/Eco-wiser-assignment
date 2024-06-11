"use client";
import { useEffect, useState } from "react";
import { getAllRecipies } from "./action";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { FlipWords } from "@/components/ui/flip-words";

export default function Home() {
  const [recipies, setRecipies] = useState(null);
  const words = ["Tasty", "Healthy", "Delicious", "Yummy"];

  useEffect(() => {
    const getRecipies = async () => {
      const recipies = await getAllRecipies();
      setRecipies(recipies);
      console.log(recipies);
    };
    getRecipies();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-2 font-mono text-white">Discover Delicious Recipes</h1>
      <p className="text-2xl mb-4 font-mono text-white">
        Share Your Culinary Creations with the World
      </p>

      <div className="h-[10rem] flex justify-center items-center px-4">
        <div className="text-4xl mx-auto font-normal text-white dark:text-white">
          Cook
          <FlipWords words={words} /> <br />
          dishes with <span className="italic font-serif text-4xl">Recipe Heaven</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={recipies} />
      </div>
      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={recipies} />
      </div>
      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={recipies} />
      </div>
      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={recipies} />
      </div>
      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={recipies} />
      </div>
    </div>
  );
}
