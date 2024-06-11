"use server";

import { redirect } from "next/navigation";

import connectdb from "@/app/api/mongodb/connectdb";
import Recipe from "@/models/recipe";


export const updateRecipe = async (name, instruction, description, ingredients, steps, id) => {
  console.log(name, instruction, description, ingredients, steps, id)
  await connectdb();
  const recipe = await Recipe.findById(id);
    recipe.name = name;
    recipe.description = description;
    recipe.instructions = instruction;
    recipe.ingredients = ingredients;
    recipe.steps = steps;
    await recipe.save();
  redirect(`/recipie/${id}`);
};

export const getRecipedetail = async (id) => {
    await connectdb();
    const recipie = await Recipe.findById(id);

    return  {
        "name" : recipie.name,
        "description" : recipie.description,
        "ingredients" : recipie.ingredients,
        "instructions" : recipie.instructions,
        "steps": recipie.steps,
        "clerkId": recipie.userId,
    };
};