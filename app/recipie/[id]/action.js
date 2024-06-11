"use server"

import { auth } from "@clerk/nextjs/server";
import connectdb from "@/app/api/mongodb/connectdb";
import Recipe from "@/models/recipe";
import User from  "@/models/user";
import { redirect } from "next/navigation";

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

export const deleteRecipie = async (id) => {
    await connectdb();
    const {userId} = auth();
    const user = await User.findOne({clerkId: userId});
    user.recipes.pull(id);
    await user.save();

    await Recipe.findByIdAndDelete(id);
    redirect('/profile');
}