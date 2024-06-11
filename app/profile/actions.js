"use server"

import { auth } from "@clerk/nextjs/server";

import connectdb from "../api/mongodb/connectdb";
import User from "@/models/user";
import Recipe from "@/models/recipe";

export const getRecipies = async () => {
    await connectdb();
    const {userId} = auth();
    const user = await User.findOne({clerkId: userId}).populate('recipes');

    if(!user){
        console.log("user not found")
        const newUser = new User({
            clerkId: userId
        });
        await newUser.save();
        return [];
    }
    
    return user.recipes || [];
}