"use server";

import { auth } from "@clerk/nextjs/server";

import connectdb from "../api/mongodb/connectdb";
import Recipe from "@/models/recipe";
import User from "@/models/user";
import { redirect } from "next/dist/server/api-utils";

export const addRecipe = async (name, instruction, description, ingredients, steps) => {
  await connectdb();
  const { userId } = auth();
  const newRecipe = new Recipe({
    name,
    instruction,
    description,
    ingredients,
    steps,
    userId,
  });
  const recipe = await newRecipe.save();

  const user = await User.findOne({ clerkId: userId });
  user.recipes.push(recipe._id);
  await user.save();
  redirect(`/profile`);
};
