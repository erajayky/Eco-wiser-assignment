"use server";

import connectdb from "./api/mongodb/connectdb";
import Recipe from "@/models/recipe";

export const getAllRecipies = async () => {
    await connectdb();
    const recipies = await Recipe.find({});
    return recipies;
}